import {
  ACCEPTED_IMAGE_FORMATS,
  ACCEPTED_VIDEO_FORMATS,
  MAX_PHOTO_DIMENSION,
  MAX_BG_IMAGE_DIMENSION,
} from '@/types/media';

/**
 * Valide qu'un fichier est une image acceptée.
 */
export function isValidImageFile(file: File): boolean {
  return ACCEPTED_IMAGE_FORMATS.includes(file.type);
}

/**
 * Valide qu'un fichier est une vidéo acceptée.
 */
export function isValidVideoFile(file: File): boolean {
  return ACCEPTED_VIDEO_FORMATS.includes(file.type);
}

/**
 * Lit un fichier et retourne un data URL (base64).
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Erreur de lecture du fichier'));
      }
    };
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
    reader.readAsDataURL(file);
  });
}

/**
 * Redimensionne et compresse une image vers un data URL.
 * Retourne une image carrée recadrée au centre.
 */
export function compressImage(
  dataUrl: string,
  maxDim: number = MAX_PHOTO_DIMENSION,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = Math.min(img.width, img.height, maxDim);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Impossible de créer le contexte canvas'));
        return;
      }
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
      resolve(canvas.toDataURL('image/webp', 0.85));
    };
    img.onerror = () => reject(new Error('Erreur de chargement de l\'image'));
    img.src = dataUrl;
  });
}

/**
 * Redimensionne une image de fond (max 1920px de large).
 */
export function compressBackgroundImage(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const ratio = Math.min(1, MAX_BG_IMAGE_DIMENSION / img.width);
      const w = Math.round(img.width * ratio);
      const h = Math.round(img.height * ratio);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Impossible de créer le contexte canvas'));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/webp', 0.8));
    };
    img.onerror = () => reject(new Error('Erreur de chargement de l\'image'));
    img.src = dataUrl;
  });
}

/**
 * Traite un fichier image pour upload de photo joueur.
 * Valide, lit, compresse et retourne le data URL.
 */
export async function processPlayerPhoto(file: File): Promise<string> {
  if (!isValidImageFile(file)) {
    throw new Error('Format non supporté. Utilisez PNG, JPEG ou WebP.');
  }
  const raw = await fileToDataUrl(file);
  return compressImage(raw);
}

/**
 * Traite un fichier image pour fond d'écran.
 */
export async function processBackgroundImage(file: File): Promise<string> {
  if (!isValidImageFile(file)) {
    throw new Error('Format non supporté. Utilisez PNG, JPEG ou WebP.');
  }
  const raw = await fileToDataUrl(file);
  return compressBackgroundImage(raw);
}

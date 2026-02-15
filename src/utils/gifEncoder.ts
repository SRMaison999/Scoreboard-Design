import { toPng } from 'html-to-image';
import GIF from 'gif.js';
import type { GifQuality } from '@/types/animation';

/** Qualité GIF → paramètre gif.js (plus bas = meilleure qualité). */
function qualityValue(quality: GifQuality): number {
  switch (quality) {
    case 'high': return 1;
    case 'medium': return 10;
    case 'low': return 20;
  }
}

interface GifExportOptions {
  readonly element: HTMLElement;
  readonly duration: number;
  readonly fps: number;
  readonly quality: GifQuality;
  readonly onProgress?: (progress: number) => void;
}

/**
 * Capture un élément HTML en GIF animé.
 * Prend des captures frame par frame pendant la durée indiquée,
 * puis encode le tout via gif.js.
 */
export async function exportGif(options: GifExportOptions): Promise<Blob> {
  const { element, duration, fps, quality, onProgress } = options;
  const w = element.scrollWidth;
  const h = element.scrollHeight;
  const frameDelay = Math.round(1000 / fps);
  const totalFrames = Math.round(duration * fps);

  const gif = new GIF({
    workers: 2,
    quality: qualityValue(quality),
    width: w,
    height: h,
    workerScript: '/gif.worker.js',
  });

  /* Capture les frames */
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < totalFrames; i++) {
    const dataUrl = await toPng(element, { width: w, height: h, pixelRatio: 1 });
    const img = await loadImage(dataUrl);
    ctx?.clearRect(0, 0, w, h);
    ctx?.drawImage(img, 0, 0, w, h);
    gif.addFrame(ctx!, { copy: true, delay: frameDelay });

    if (onProgress) {
      onProgress((i + 1) / (totalFrames + 1));
    }

    /* Attendre le prochain frame */
    await delay(frameDelay);
  }

  /* Encode */
  return new Promise((resolve, reject) => {
    gif.on('finished', (blob: Blob) => {
      resolve(blob);
    });

    gif.on('progress', (p: number) => {
      if (onProgress) {
        const capturePhase = totalFrames / (totalFrames + 1);
        onProgress(capturePhase + p * (1 - capturePhase));
      }
    });

    try {
      gif.render();
    } catch (err) {
      reject(err);
    }
  });
}

/** Télécharge le blob GIF. */
export function downloadGif(blob: Blob, team1: string, team2: string): void {
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const name = `scoreboard_${team1}vs${team2}_${ts}.gif`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

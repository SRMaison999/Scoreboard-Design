import { FONT_OPTIONS } from '@/constants/fonts';
import type { FontId } from '@/types/fonts';

/** Resout un FontId en font-family CSS. */
export function ff(id: FontId): string {
  const found = FONT_OPTIONS.find((f) => f.id === id);
  const fallback = FONT_OPTIONS[0];
  if (!found && !fallback) return 'sans-serif';
  return (found ?? fallback!).family;
}

/**
 * Applique un facteur d'échelle en pourcentage à une taille de police de base.
 * Un scalePercent de 100 retourne la base inchangée.
 */
export function scaleFontSize(base: number, scalePercent: number): number {
  return Math.round(base * scalePercent / 100);
}

/**
 * Mesure la hauteur visuelle des lettres capitales via Canvas 2D.
 * Retourne la hauteur en pixels du texte rendu, basee sur les metriques
 * actualBoundingBoxAscent et actualBoundingBoxDescent.
 * Fallback a fontSize * 0.72 si la mesure n'est pas disponible (SSR, tests).
 */
export function measureCapHeight(fontFamily: string, fontSize: number, fontWeight: number, text: string): number {
  if (typeof document === 'undefined') return Math.round(fontSize * 0.72);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return Math.round(fontSize * 0.72);
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);
  const ascent = metrics.actualBoundingBoxAscent ?? 0;
  const descent = metrics.actualBoundingBoxDescent ?? 0;
  const measured = ascent + descent;
  return measured > 0 ? Math.round(measured) : Math.round(fontSize * 0.72);
}

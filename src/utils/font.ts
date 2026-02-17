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

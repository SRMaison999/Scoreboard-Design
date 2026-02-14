import { FONT_OPTIONS } from '@/constants/fonts';
import type { FontId } from '@/types/fonts';

/** Resout un FontId en font-family CSS. */
export function ff(id: FontId): string {
  const found = FONT_OPTIONS.find((f) => f.id === id);
  const fallback = FONT_OPTIONS[0];
  if (!found && !fallback) return 'sans-serif';
  return (found ?? fallback!).family;
}

import { FONT_OPTIONS } from '@/constants/fonts';
import type { FontId } from '@/types/fonts';

/** Resout un FontId en font-family CSS. */
export function ff(id: FontId): string {
  const found = FONT_OPTIONS.find((f) => f.id === id);
  return (found ?? FONT_OPTIONS[0]).family;
}

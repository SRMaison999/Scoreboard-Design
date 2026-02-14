/**
 * Convertit un code hex en rgba avec transparence.
 * opacityPct : 0 = opaque, 100 = totalement transparent.
 */
export function hexToRgba(hex: string, opacityPct: number): string {
  if (!hex) return hex;
  const h = hex.replace('#', '');
  if (h.length < 6) return hex;
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  if (opacityPct === 0) return hex;
  return `rgba(${r},${g},${b},${1 - opacityPct / 100})`;
}

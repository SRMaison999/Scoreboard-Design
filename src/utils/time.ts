/**
 * Parse une chaîne de temps en dixièmes de seconde.
 * Formats acceptés : "M:SS.t", "M:SS", "S.t"
 */
export function parseTime(t: string): number {
  if (t.includes(':')) {
    const [minPart = '', secPart = ''] = t.split(':');
    const minutes = parseInt(minPart, 10) || 0;
    if (secPart.includes('.')) {
      const [sPart = '', tPart = ''] = secPart.split('.');
      const secs = parseInt(sPart, 10) || 0;
      const tenths = parseInt(tPart, 10) || 0;
      return minutes * 600 + secs * 10 + tenths;
    }
    const secs = parseInt(secPart, 10) || 0;
    return minutes * 600 + secs * 10;
  }
  if (t.includes('.')) {
    const [sPart = '', tPart = ''] = t.split('.');
    const secs = parseInt(sPart, 10) || 0;
    const tenths = parseInt(tPart, 10) || 0;
    return secs * 10 + tenths;
  }
  return 0;
}

/**
 * Formate des dixièmes de seconde en chaîne de précision complète.
 * >= 10 secondes : "M:SS.t" (ex: "4:59.9")
 * < 10 secondes : "S.t" (ex: "9.5")
 */
export function formatTime(tenths: number): string {
  const clamped = Math.max(0, tenths);
  if (clamped < 100) {
    const s = Math.floor(clamped / 10);
    const t = clamped % 10;
    return `${s}.${t}`;
  }
  const m = Math.floor(clamped / 600);
  const remaining = clamped % 600;
  const s = Math.floor(remaining / 10);
  const t = remaining % 10;
  return `${m}:${String(s).padStart(2, '0')}.${t}`;
}

/**
 * Formate une chaîne de temps pour affichage.
 * Masque les dixièmes au-dessus de 10 secondes : "4:59.9" → "4:59"
 * Garde les dixièmes en dessous : "9.5" → "9.5"
 */
export function displayTime(timeStr: string): string {
  if (timeStr.includes(':')) {
    const dotIdx = timeStr.indexOf('.');
    return dotIdx >= 0 ? timeStr.substring(0, dotIdx) : timeStr;
  }
  return timeStr;
}

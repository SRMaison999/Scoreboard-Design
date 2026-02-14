/** Convertit "MM:SS" en secondes. */
export function parseTime(t: string): number {
  const parts = t.split(':').map(Number);
  if (parts.length === 2) {
    return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
  }
  return 0;
}

/** Convertit un nombre de secondes en "M:SS". */
export function formatTime(secs: number): string {
  const clamped = Math.max(0, secs);
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

import type { EntryAnimation, EasingType } from '@/types/animation';

/** Nom du @keyframes CSS correspondant à une animation d'entrée. */
export function entryKeyframeName(animation: EntryAnimation): string {
  switch (animation) {
    case 'fade': return 'sb-fade-in';
    case 'slide-top': return 'sb-slide-top-in';
    case 'slide-bottom': return 'sb-slide-bottom-in';
    case 'slide-left': return 'sb-slide-left-in';
    case 'slide-right': return 'sb-slide-right-in';
    default: return '';
  }
}

/** Nom du @keyframes CSS correspondant à une animation de sortie. */
export function exitKeyframeName(animation: EntryAnimation): string {
  switch (animation) {
    case 'fade': return 'sb-fade-out';
    case 'slide-top': return 'sb-slide-top-out';
    case 'slide-bottom': return 'sb-slide-bottom-out';
    case 'slide-left': return 'sb-slide-left-out';
    case 'slide-right': return 'sb-slide-right-out';
    default: return '';
  }
}

/** Construit la propriété CSS `animation` complète. */
export function buildAnimationCss(
  keyframe: string,
  duration: number,
  easing: EasingType,
  fillMode: 'forwards' | 'both' = 'both',
): string {
  if (!keyframe) return 'none';
  return `${keyframe} ${duration}ms ${easing} ${fillMode}`;
}

/** Parse un temps sous forme MM:SS ou SS.d et renvoie le nombre de secondes. */
export function parseTimeToSeconds(time: string): number {
  const trimmed = time.trim();
  if (trimmed.includes(':')) {
    const [minutes, rest] = trimmed.split(':');
    const mins = parseInt(minutes ?? '0', 10) || 0;
    const secs = parseFloat(rest ?? '0') || 0;
    return mins * 60 + secs;
  }
  return parseFloat(trimmed) || 0;
}

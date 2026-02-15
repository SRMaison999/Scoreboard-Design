import type { FrameData, FrameDelta } from '@/types/frameData';

/**
 * Compare deux FrameData et retourne un delta contenant uniquement les champs modifi\u00e9s.
 * Retourne null si rien n'a chang\u00e9 (hors frameNumber/timestamp/wallClock).
 */
export function computeDelta(
  prev: FrameData,
  next: FrameData,
): FrameDelta | null {
  const changes: Partial<FrameData> = {};
  let hasChanges = false;

  if (prev.time !== next.time) {
    changes.time = next.time;
    changes.timeSeconds = next.timeSeconds;
    hasChanges = true;
  }

  if (prev.period !== next.period) {
    changes.period = next.period;
    hasChanges = true;
  }

  if (prev.clockRunning !== next.clockRunning) {
    changes.clockRunning = next.clockRunning;
    hasChanges = true;
  }

  if (prev.score.left !== next.score.left || prev.score.right !== next.score.right) {
    changes.score = { ...next.score };
    hasChanges = true;
  }

  if (JSON.stringify(prev.penaltiesLeft) !== JSON.stringify(next.penaltiesLeft)) {
    changes.penaltiesLeft = next.penaltiesLeft;
    hasChanges = true;
  }

  if (JSON.stringify(prev.penaltiesRight) !== JSON.stringify(next.penaltiesRight)) {
    changes.penaltiesRight = next.penaltiesRight;
    hasChanges = true;
  }

  if (!hasChanges) return null;

  return {
    frameNumber: next.frameNumber,
    timestamp: next.timestamp,
    changes,
  };
}

/** Applique un delta sur une FrameData de r\u00e9f\u00e9rence pour reconstruire la frame compl\u00e8te. */
export function applyDelta(base: FrameData, delta: FrameDelta): FrameData {
  return {
    ...base,
    ...delta.changes,
    frameNumber: delta.frameNumber,
    timestamp: delta.timestamp,
    wallClock: base.wallClock,
    score: delta.changes.score ?? base.score,
    penaltiesLeft: delta.changes.penaltiesLeft ?? base.penaltiesLeft,
    penaltiesRight: delta.changes.penaltiesRight ?? base.penaltiesRight,
  };
}

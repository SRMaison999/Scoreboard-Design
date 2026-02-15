import { describe, it, expect } from 'vitest';
import { computeDelta, applyDelta } from '@/api/frameDelta';
import type { FrameData } from '@/types/frameData';

function makeFrame(overrides: Partial<FrameData> = {}): FrameData {
  return {
    timestamp: 0,
    wallClock: '2026-02-15T12:00:00Z',
    frameNumber: 0,
    score: { left: 1, right: 1 },
    time: '20:00',
    timeSeconds: 1200,
    period: '1st PERIOD',
    clockRunning: false,
    penaltiesLeft: [],
    penaltiesRight: [],
    ...overrides,
  };
}

describe('frameDelta', () => {
  describe('computeDelta', () => {
    it('retourne null si rien n a chang\u00e9', () => {
      const frame = makeFrame();
      const delta = computeDelta(frame, { ...frame, frameNumber: 1, timestamp: 1000 });
      expect(delta).toBeNull();
    });

    it('d\u00e9tecte un changement de temps', () => {
      const prev = makeFrame();
      const next = makeFrame({ time: '19:59', timeSeconds: 1199, frameNumber: 1, timestamp: 1000 });
      const delta = computeDelta(prev, next);
      expect(delta).not.toBeNull();
      expect(delta!.changes.time).toBe('19:59');
      expect(delta!.changes.timeSeconds).toBe(1199);
    });

    it('d\u00e9tecte un changement de score', () => {
      const prev = makeFrame();
      const next = makeFrame({ score: { left: 2, right: 1 }, frameNumber: 1, timestamp: 1000 });
      const delta = computeDelta(prev, next);
      expect(delta).not.toBeNull();
      expect(delta!.changes.score!.left).toBe(2);
    });

    it('d\u00e9tecte un changement de p\u00e9riode', () => {
      const prev = makeFrame();
      const next = makeFrame({ period: '2nd PERIOD', frameNumber: 1, timestamp: 1000 });
      const delta = computeDelta(prev, next);
      expect(delta).not.toBeNull();
      expect(delta!.changes.period).toBe('2nd PERIOD');
    });

    it('d\u00e9tecte un changement de p\u00e9nalit\u00e9s', () => {
      const prev = makeFrame();
      const next = makeFrame({
        penaltiesLeft: [{ playerNumber: '7', remainingTime: '1:30', remainingSeconds: 90 }],
        frameNumber: 1,
        timestamp: 1000,
      });
      const delta = computeDelta(prev, next);
      expect(delta).not.toBeNull();
      expect(delta!.changes.penaltiesLeft).toHaveLength(1);
    });
  });

  describe('applyDelta', () => {
    it('reconstruit la frame compl\u00e8te', () => {
      const base = makeFrame();
      const delta = {
        frameNumber: 1,
        timestamp: 1000,
        changes: { time: '19:59' as const, timeSeconds: 1199 },
      };
      const result = applyDelta(base, delta);
      expect(result.time).toBe('19:59');
      expect(result.score.left).toBe(1);
      expect(result.frameNumber).toBe(1);
    });

    it('pr\u00e9serve les champs non modifi\u00e9s', () => {
      const base = makeFrame({ period: '2nd PERIOD' });
      const delta = {
        frameNumber: 5,
        timestamp: 5000,
        changes: { clockRunning: true },
      };
      const result = applyDelta(base, delta);
      expect(result.period).toBe('2nd PERIOD');
      expect(result.clockRunning).toBe(true);
    });
  });
});

import type { ScoreboardState } from '@/types/scoreboard';
import type { FullSnapshot, FrameData, FrameDelta } from '@/types/frameData';
import { toFullSnapshot, toFrameData } from '@/api/frameConverters';
import { computeDelta } from '@/api/frameDelta';

export type FrameListener = (data: string) => void;

/**
 * Convertit le state en frames s\u00e9rialis\u00e9es pour la diffusion broadcast.
 * G\u00e8re le delta encoding entre frames cons\u00e9cutives.
 */
export class BroadcastStreamer {
  private frameNumber = 0;
  private lastFrame: FrameData | null = null;
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  /**
   * G\u00e9n\u00e8re un snapshot complet (premi\u00e8re frame ou sur demande).
   */
  getFullSnapshot(state: ScoreboardState): FullSnapshot {
    this.frameNumber += 1;
    const timestamp = Date.now() - this.startTime;
    const snapshot = toFullSnapshot(state, this.frameNumber, timestamp);
    this.lastFrame = snapshot.frame;
    return snapshot;
  }

  /**
   * G\u00e9n\u00e8re une frame. Retourne un delta si possible, sinon un snapshot complet.
   */
  getFrame(state: ScoreboardState): { type: 'full' | 'delta'; data: FullSnapshot | FrameDelta } {
    this.frameNumber += 1;
    const timestamp = Date.now() - this.startTime;
    const currentFrame = toFrameData(state, this.frameNumber, timestamp);

    if (!this.lastFrame) {
      const snapshot = toFullSnapshot(state, this.frameNumber, timestamp);
      this.lastFrame = currentFrame;
      return { type: 'full', data: snapshot };
    }

    const delta = computeDelta(this.lastFrame, currentFrame);
    this.lastFrame = currentFrame;

    if (delta) {
      return { type: 'delta', data: delta };
    }

    /* Aucun changement : envoyer quand m\u00eame un heartbeat */
    return {
      type: 'delta',
      data: {
        frameNumber: this.frameNumber,
        timestamp,
        changes: {},
      },
    };
  }

  /**
   * G\u00e9n\u00e8re une frame compl\u00e8te en JSON pour export fichier.
   */
  getFrameJson(state: ScoreboardState): string {
    this.frameNumber += 1;
    const timestamp = Date.now() - this.startTime;
    const snapshot = toFullSnapshot(state, this.frameNumber, timestamp);
    this.lastFrame = snapshot.frame;
    return JSON.stringify(snapshot);
  }

  getFrameNumber(): number {
    return this.frameNumber;
  }

  reset(): void {
    this.frameNumber = 0;
    this.lastFrame = null;
    this.startTime = Date.now();
  }
}

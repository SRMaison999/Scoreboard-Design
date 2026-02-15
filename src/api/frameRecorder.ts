import type { ScoreboardState } from '@/types/scoreboard';
import type { FrameData, FrameRecording } from '@/types/frameData';
import { toTemplateData, toMatchData, toFrameData } from './frameConverters';
import { computeDelta } from './frameDelta';

export interface RecorderOptions {
  readonly interval: number;
  readonly includeOnlyChanges: boolean;
}

const DEFAULT_OPTIONS: RecorderOptions = {
  interval: 1000,
  includeOnlyChanges: false,
};

export class FrameRecorder {
  private frames: FrameData[] = [];
  private timerId: ReturnType<typeof setInterval> | null = null;
  private frameNumber = 0;
  private startTimestamp = 0;
  private startTime = '';
  private options: RecorderOptions = DEFAULT_OPTIONS;
  private lastFrame: FrameData | null = null;
  private getState: (() => ScoreboardState) | null = null;

  /** D\u00e9marre l'enregistrement en capturant des frames \u00e0 intervalle r\u00e9gulier. */
  start(getState: () => ScoreboardState, options?: Partial<RecorderOptions>): void {
    if (this.timerId !== null) return;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.getState = getState;
    this.frames = [];
    this.frameNumber = 0;
    this.startTimestamp = Date.now();
    this.startTime = new Date().toISOString();
    this.lastFrame = null;

    this.captureFrame();
    this.timerId = setInterval(() => this.captureFrame(), this.options.interval);
  }

  /** Arr\u00eate l'enregistrement. */
  stop(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /** Capture manuellement une frame (appel\u00e9 automatiquement par l'intervalle). */
  captureFrame(): void {
    if (!this.getState) return;
    const state = this.getState();
    const elapsed = Date.now() - this.startTimestamp;
    const frame = toFrameData(state, this.frameNumber, elapsed);

    if (this.options.includeOnlyChanges && this.lastFrame) {
      const delta = computeDelta(this.lastFrame, frame);
      if (!delta) return;
    }

    this.frames.push(frame);
    this.lastFrame = frame;
    this.frameNumber++;
  }

  /** Retourne true si l'enregistrement est en cours. */
  get recording(): boolean {
    return this.timerId !== null;
  }

  /** Retourne le nombre de frames captur\u00e9es. */
  get frameCount(): number {
    return this.frames.length;
  }

  /** Retourne l'enregistrement complet. */
  getRecording(): FrameRecording | null {
    if (!this.getState || this.frames.length === 0) return null;
    const state = this.getState();
    return {
      config: {
        template: toTemplateData(state),
        match: toMatchData(state),
      },
      frames: [...this.frames],
      startTime: this.startTime,
      endTime: new Date().toISOString(),
      totalFrames: this.frames.length,
    };
  }

  /** R\u00e9initialise l'enregistrement. */
  reset(): void {
    this.stop();
    this.frames = [];
    this.frameNumber = 0;
    this.lastFrame = null;
  }
}

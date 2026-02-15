import { create } from 'zustand';
import { FrameRecorder } from '@/api/frameRecorder';
import type { FrameRecording } from '@/types/frameData';
import type { ScoreboardState } from '@/types/scoreboard';

interface FrameStore {
  recording: boolean;
  frameCount: number;
  recorder: FrameRecorder;
  startRecording: (getState: () => ScoreboardState, interval?: number) => void;
  stopRecording: () => void;
  getRecording: () => FrameRecording | null;
  resetRecording: () => void;
}

const recorder = new FrameRecorder();

export const useFrameStore = create<FrameStore>((set) => ({
  recording: false,
  frameCount: 0,
  recorder,

  startRecording: (getState, interval = 1000) => {
    recorder.start(getState, { interval, includeOnlyChanges: false });
    set({ recording: true });

    const updateCount = () => {
      if (recorder.recording) {
        set({ frameCount: recorder.frameCount });
        requestAnimationFrame(updateCount);
      }
    };
    requestAnimationFrame(updateCount);
  },

  stopRecording: () => {
    recorder.stop();
    set({ recording: false, frameCount: recorder.frameCount });
  },

  getRecording: () => {
    return recorder.getRecording();
  },

  resetRecording: () => {
    recorder.reset();
    set({ recording: false, frameCount: 0 });
  },
}));

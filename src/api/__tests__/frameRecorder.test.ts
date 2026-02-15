import { describe, it, expect, vi, afterEach } from 'vitest';
import { FrameRecorder } from '@/api/frameRecorder';
import { DEFAULT_STATE } from '@/data/defaultState';

describe('FrameRecorder', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('d\u00e9marre et arr\u00eate l enregistrement', () => {
    vi.useFakeTimers();
    const recorder = new FrameRecorder();
    const getState = () => DEFAULT_STATE;

    expect(recorder.recording).toBe(false);
    recorder.start(getState, { interval: 100, includeOnlyChanges: false });
    expect(recorder.recording).toBe(true);

    vi.advanceTimersByTime(250);
    recorder.stop();
    expect(recorder.recording).toBe(false);
    expect(recorder.frameCount).toBeGreaterThan(0);
  });

  it('capture des frames \u00e0 intervalle r\u00e9gulier', () => {
    vi.useFakeTimers();
    const recorder = new FrameRecorder();
    const getState = () => DEFAULT_STATE;

    recorder.start(getState, { interval: 100, includeOnlyChanges: false });
    vi.advanceTimersByTime(550);
    recorder.stop();

    /* 1 frame initiale + 5 intervalles de 100ms = 6 frames */
    expect(recorder.frameCount).toBe(6);
  });

  it('retourne un enregistrement valide', () => {
    vi.useFakeTimers();
    const recorder = new FrameRecorder();
    const getState = () => DEFAULT_STATE;

    recorder.start(getState, { interval: 100, includeOnlyChanges: false });
    vi.advanceTimersByTime(200);
    recorder.stop();

    const recording = recorder.getRecording();
    expect(recording).not.toBeNull();
    expect(recording!.config.template.canvas.width).toBe(1920);
    expect(recording!.config.match.teamLeft.noc).toBe('SVK');
    expect(recording!.frames.length).toBe(recording!.totalFrames);
    expect(recording!.startTime).toMatch(/^\d{4}-/);
  });

  it('r\u00e9initialise correctement', () => {
    vi.useFakeTimers();
    const recorder = new FrameRecorder();
    const getState = () => DEFAULT_STATE;

    recorder.start(getState, { interval: 100, includeOnlyChanges: false });
    vi.advanceTimersByTime(200);
    recorder.stop();
    expect(recorder.frameCount).toBeGreaterThan(0);

    recorder.reset();
    expect(recorder.frameCount).toBe(0);
    expect(recorder.recording).toBe(false);
    expect(recorder.getRecording()).toBeNull();
  });

  it('ne d\u00e9marre pas deux fois', () => {
    vi.useFakeTimers();
    const recorder = new FrameRecorder();
    const getState = () => DEFAULT_STATE;

    recorder.start(getState, { interval: 100, includeOnlyChanges: false });
    recorder.start(getState, { interval: 100, includeOnlyChanges: false });
    vi.advanceTimersByTime(250);
    recorder.stop();

    expect(recorder.frameCount).toBeLessThanOrEqual(4);
  });

  it('l enregistrement est s\u00e9rialisable en JSON (round-trip)', () => {
    vi.useFakeTimers();
    const recorder = new FrameRecorder();
    const getState = () => DEFAULT_STATE;

    recorder.start(getState, { interval: 100, includeOnlyChanges: false });
    vi.advanceTimersByTime(200);
    recorder.stop();

    const recording = recorder.getRecording();
    const json = JSON.stringify(recording);
    const parsed = JSON.parse(json) as NonNullable<typeof recording>;
    expect(parsed.totalFrames).toBe(recording!.totalFrames);
    expect(parsed.frames[0]!.time).toBe('20:00');
  });
});

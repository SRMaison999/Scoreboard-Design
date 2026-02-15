import { describe, it, expect } from 'vitest';
import { BroadcastStreamer } from '@/api/broadcast/broadcastStreamer';
import { DEFAULT_STATE } from '@/data/defaultState';
import type { ScoreboardState } from '@/types/scoreboard';

const state = DEFAULT_STATE as ScoreboardState;

describe('BroadcastStreamer', () => {
  it('g\u00e9n\u00e8re un snapshot complet', () => {
    const streamer = new BroadcastStreamer();
    const snapshot = streamer.getFullSnapshot(state);
    expect(snapshot.template).toBeDefined();
    expect(snapshot.match).toBeDefined();
    expect(snapshot.frame).toBeDefined();
    expect(snapshot.frame.frameNumber).toBe(1);
  });

  it('incr\u00e9mente le num\u00e9ro de frame', () => {
    const streamer = new BroadcastStreamer();
    streamer.getFullSnapshot(state);
    const second = streamer.getFrame(state);
    expect(second.data).toBeDefined();
    expect(streamer.getFrameNumber()).toBe(2);
  });

  it('g\u00e9n\u00e8re un delta apr\u00e8s le premier snapshot', () => {
    const streamer = new BroadcastStreamer();
    streamer.getFullSnapshot(state);
    const result = streamer.getFrame(state);
    expect(result.type).toBe('delta');
  });

  it('g\u00e9n\u00e8re du JSON valide pour l\'export fichier', () => {
    const streamer = new BroadcastStreamer();
    const json = streamer.getFrameJson(state);
    const parsed = JSON.parse(json) as Record<string, unknown>;
    expect(parsed['template']).toBeDefined();
    expect(parsed['match']).toBeDefined();
    expect(parsed['frame']).toBeDefined();
  });

  it('r\u00e9initialise le compteur', () => {
    const streamer = new BroadcastStreamer();
    streamer.getFullSnapshot(state);
    streamer.getFullSnapshot(state);
    expect(streamer.getFrameNumber()).toBe(2);
    streamer.reset();
    expect(streamer.getFrameNumber()).toBe(0);
  });
});

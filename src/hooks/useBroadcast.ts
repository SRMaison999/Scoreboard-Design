import { useRef, useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useBroadcastStore } from '@/stores/broadcastStore';
import { BroadcastStreamer } from '@/api/broadcast/broadcastStreamer';

/**
 * Hook pour g\u00e9rer la diffusion broadcast (CasparCG, Viz, etc.).
 * Fournit un streamer de frames et le contr\u00f4le start/stop.
 */
export function useBroadcast() {
  const streamerRef = useRef<BroadcastStreamer | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const config = useBroadcastStore((s) => s.config);
  const status = useBroadcastStore((s) => s.status);
  const connectedClients = useBroadcastStore((s) => s.connectedClients);
  const framesSent = useBroadcastStore((s) => s.framesSent);
  const lastFrameTime = useBroadcastStore((s) => s.lastFrameTime);
  const setStatus = useBroadcastStore((s) => s.setStatus);
  const incrementFramesSent = useBroadcastStore((s) => s.incrementFramesSent);

  const start = useCallback(() => {
    if (status === 'running') return;

    const streamer = new BroadcastStreamer();
    streamerRef.current = streamer;

    setStatus('running');

    /* Streaming automatique des frames */
    const interval = config.fileExportEnabled
      ? config.fileExportInterval
      : 1000;

    intervalRef.current = setInterval(() => {
      const state = useScoreboardStore.getState();
      streamer.getFrame(state);
      incrementFramesSent();
    }, interval);
  }, [status, config, setStatus, incrementFramesSent]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    streamerRef.current = null;
    setStatus('stopped');
  }, [setStatus]);

  const getSnapshot = useCallback((): string => {
    const state = useScoreboardStore.getState();
    if (!streamerRef.current) {
      streamerRef.current = new BroadcastStreamer();
    }
    return streamerRef.current.getFrameJson(state);
  }, []);

  return {
    config,
    status,
    connectedClients,
    framesSent,
    lastFrameTime,
    start,
    stop,
    getSnapshot,
  };
}

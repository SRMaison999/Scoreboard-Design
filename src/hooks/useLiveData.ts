import { useRef, useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useLiveDataStore } from '@/stores/liveDataStore';
import { LiveDataClient } from '@/api/liveData/liveDataClient';
import { mapLiveDataToState } from '@/api/liveData/liveDataMapper';
import type { LiveMatchData, LiveDataConnectionStatus } from '@/types/liveData';

/**
 * Hook pour g\u00e9rer la connexion aux scores en direct.
 */
export function useLiveData() {
  const clientRef = useRef<LiveDataClient | null>(null);

  const config = useLiveDataStore((s) => s.config);
  const status = useLiveDataStore((s) => s.status);
  const lastUpdate = useLiveDataStore((s) => s.lastUpdate);
  const setStatus = useLiveDataStore((s) => s.setStatus);
  const setLastUpdate = useLiveDataStore((s) => s.setLastUpdate);

  const update = useScoreboardStore((s) => s.update);

  const handleData = useCallback(
    (data: LiveMatchData) => {
      if (!useLiveDataStore.getState().config.autoUpdate) return;

      const mapped = mapLiveDataToState(data);
      const entries = Object.entries(mapped) as [string, unknown][];
      for (const [key, value] of entries) {
        update(key as keyof typeof mapped, value as never);
      }
      setLastUpdate(new Date().toLocaleTimeString());
    },
    [update, setLastUpdate],
  );

  const handleStatus = useCallback(
    (s: LiveDataConnectionStatus) => {
      setStatus(s);
    },
    [setStatus],
  );

  const connect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect();
    }
    const client = new LiveDataClient(config, handleData, handleStatus);
    clientRef.current = client;
    client.connect();
  }, [config, handleData, handleStatus]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect();
      clientRef.current = null;
    }
  }, []);

  return { config, status, lastUpdate, connect, disconnect };
}

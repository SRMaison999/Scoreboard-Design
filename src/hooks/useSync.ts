import { useRef, useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useSyncStore } from '@/stores/syncStore';
import { SyncClient } from '@/api/sync/syncClient';
import type { SyncMessage, SyncConnectionStatus } from '@/types/sync';
import type { ScoreboardState } from '@/types/scoreboard';

function generateClientId(): string {
  return `client-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Hook pour g\u00e9rer la synchronisation multi-poste.
 */
export function useSync() {
  const clientRef = useRef<SyncClient | null>(null);

  const config = useSyncStore((s) => s.config);
  const status = useSyncStore((s) => s.status);
  const peers = useSyncStore((s) => s.peers);
  const setStatus = useSyncStore((s) => s.setStatus);
  const setClientId = useSyncStore((s) => s.setClientId);
  const addPeer = useSyncStore((s) => s.addPeer);
  const removePeer = useSyncStore((s) => s.removePeer);

  const update = useScoreboardStore((s) => s.update);
  const loadState = useScoreboardStore((s) => s.loadState);

  const handleMessage = useCallback(
    (message: SyncMessage) => {
      switch (message.type) {
        case 'STATE_UPDATE': {
          const role = useSyncStore.getState().config.role;
          if (role === 'viewer' || role === 'operator') {
            const partial = message.payload as Record<string, unknown>;
            const entries = Object.entries(partial) as [string, unknown][];
            for (const [key, value] of entries) {
              update(key as keyof ScoreboardState, value as never);
            }
          }
          break;
        }
        case 'FULL_SYNC': {
          const state = message.payload as ScoreboardState;
          loadState(state);
          break;
        }
        case 'PEER_JOIN': {
          const peer = message.payload as {
            clientId: string;
            role: string;
            name: string;
          };
          addPeer({
            clientId: peer.clientId,
            role: peer.role as 'admin' | 'operator' | 'viewer',
            name: peer.name,
            lastSeen: message.timestamp,
          });
          break;
        }
        case 'PEER_LEAVE': {
          removePeer(message.clientId);
          break;
        }
        default:
          break;
      }
    },
    [update, loadState, addPeer, removePeer],
  );

  const handleStatus = useCallback(
    (s: SyncConnectionStatus) => {
      setStatus(s);
    },
    [setStatus],
  );

  const connect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect();
    }
    const id = generateClientId();
    setClientId(id);
    const client = new SyncClient(config, id, handleMessage, handleStatus);
    clientRef.current = client;
    client.connect();
  }, [config, handleMessage, handleStatus, setClientId]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect();
      clientRef.current = null;
    }
  }, []);

  const sendUpdate = useCallback(
    (payload: unknown) => {
      if (clientRef.current) {
        clientRef.current.sendStateUpdate(payload);
      }
    },
    [],
  );

  return { config, status, peers, connect, disconnect, sendUpdate };
}

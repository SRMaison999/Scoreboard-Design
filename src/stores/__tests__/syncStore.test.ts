import { describe, it, expect, beforeEach } from 'vitest';
import { useSyncStore } from '@/stores/syncStore';

describe('syncStore', () => {
  beforeEach(() => {
    useSyncStore.getState().resetSync();
  });

  it('d\u00e9marre d\u00e9connect\u00e9', () => {
    expect(useSyncStore.getState().status).toBe('disconnected');
    expect(useSyncStore.getState().peers).toHaveLength(0);
  });

  it('met \u00e0 jour la configuration', () => {
    useSyncStore.getState().updateConfig('serverUrl', 'ws://localhost:9090');
    expect(useSyncStore.getState().config.serverUrl).toBe('ws://localhost:9090');
  });

  it('met \u00e0 jour le r\u00f4le', () => {
    useSyncStore.getState().setRole('viewer');
    expect(useSyncStore.getState().config.role).toBe('viewer');
  });

  it('ajoute et supprime un pair', () => {
    useSyncStore.getState().addPeer({
      clientId: 'peer-1',
      role: 'operator',
      name: 'Poste 2',
      lastSeen: Date.now(),
    });
    expect(useSyncStore.getState().peers).toHaveLength(1);
    useSyncStore.getState().removePeer('peer-1');
    expect(useSyncStore.getState().peers).toHaveLength(0);
  });

  it('met \u00e0 jour un pair existant', () => {
    useSyncStore.getState().addPeer({
      clientId: 'peer-1',
      role: 'operator',
      name: 'Poste 2',
      lastSeen: 1000,
    });
    useSyncStore.getState().addPeer({
      clientId: 'peer-1',
      role: 'admin',
      name: 'Poste 2 (admin)',
      lastSeen: 2000,
    });
    expect(useSyncStore.getState().peers).toHaveLength(1);
    expect(useSyncStore.getState().peers[0]?.role).toBe('admin');
  });

  it('r\u00e9initialise compl\u00e8tement', () => {
    useSyncStore.getState().updateConfig('serverUrl', 'ws://test');
    useSyncStore.getState().setStatus('connected');
    useSyncStore.getState().addPeer({
      clientId: 'p1',
      role: 'viewer',
      name: 'test',
      lastSeen: 0,
    });
    useSyncStore.getState().resetSync();
    expect(useSyncStore.getState().config.serverUrl).toBe('');
    expect(useSyncStore.getState().status).toBe('disconnected');
    expect(useSyncStore.getState().peers).toHaveLength(0);
  });
});

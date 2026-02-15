import { describe, it, expect, vi } from 'vitest';
import { SyncClient } from '@/api/sync/syncClient';
import type { SyncConfig } from '@/types/sync';

describe('SyncClient', () => {
  const onData = vi.fn();
  const onStatus = vi.fn();

  it('d\u00e9marre en statut disconnected', () => {
    const config: SyncConfig = {
      serverUrl: 'ws://localhost:9090',
      clientName: 'Test',
      role: 'operator',
    };
    const client = new SyncClient(config, 'client-1', onData, onStatus);
    expect(client.getStatus()).toBe('disconnected');
  });

  it('signale une erreur si le serverUrl est vide', () => {
    const config: SyncConfig = {
      serverUrl: '',
      clientName: '',
      role: 'operator',
    };
    const client = new SyncClient(config, 'client-1', onData, onStatus);
    client.connect();
    expect(onStatus).toHaveBeenCalledWith('error');
  });

  it('se d\u00e9connecte proprement', () => {
    const config: SyncConfig = {
      serverUrl: 'ws://localhost:9090',
      clientName: 'Test',
      role: 'operator',
    };
    const client = new SyncClient(config, 'client-1', onData, onStatus);
    client.disconnect();
    expect(onStatus).toHaveBeenCalledWith('disconnected');
  });
});

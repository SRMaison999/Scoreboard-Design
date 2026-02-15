import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LiveDataClient } from '@/api/liveData/liveDataClient';
import type { LiveDataConfig } from '@/types/liveData';

describe('LiveDataClient', () => {
  const onData = vi.fn();
  const onStatus = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    onData.mockReset();
    onStatus.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('d\u00e9marre en statut disconnected', () => {
    const config: LiveDataConfig = {
      endpoint: 'http://localhost:8080',
      matchId: 'M001',
      autoUpdate: true,
      pollingInterval: 5000,
    };
    const client = new LiveDataClient(config, onData, onStatus);
    expect(client.getStatus()).toBe('disconnected');
  });

  it('signale une erreur si l\'endpoint est vide', () => {
    const config: LiveDataConfig = {
      endpoint: '',
      matchId: '',
      autoUpdate: true,
      pollingInterval: 5000,
    };
    const client = new LiveDataClient(config, onData, onStatus);
    client.connect();
    expect(onStatus).toHaveBeenCalledWith('error');
  });

  it('se d\u00e9connecte proprement', () => {
    const config: LiveDataConfig = {
      endpoint: 'http://localhost:8080',
      matchId: '',
      autoUpdate: true,
      pollingInterval: 5000,
    };
    const client = new LiveDataClient(config, onData, onStatus);
    client.disconnect();
    expect(onStatus).toHaveBeenCalledWith('disconnected');
  });

  it('met \u00e0 jour sa configuration', () => {
    const config: LiveDataConfig = {
      endpoint: 'http://localhost:8080',
      matchId: '',
      autoUpdate: true,
      pollingInterval: 5000,
    };
    const client = new LiveDataClient(config, onData, onStatus);
    const newConfig: LiveDataConfig = { ...config, matchId: 'M002' };
    client.updateConfig(newConfig);
    expect(client.getStatus()).toBe('disconnected');
  });
});

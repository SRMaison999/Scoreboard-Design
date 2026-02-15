import { describe, it, expect, beforeEach } from 'vitest';
import { useLiveDataStore } from '@/stores/liveDataStore';

describe('liveDataStore', () => {
  beforeEach(() => {
    useLiveDataStore.getState().resetConfig();
  });

  it('d\u00e9marre avec la configuration par d\u00e9faut', () => {
    const { config, status } = useLiveDataStore.getState();
    expect(config.endpoint).toBe('');
    expect(config.autoUpdate).toBe(false);
    expect(status).toBe('disconnected');
  });

  it('met \u00e0 jour un champ de configuration', () => {
    useLiveDataStore.getState().updateConfig('endpoint', 'http://localhost:8080');
    expect(useLiveDataStore.getState().config.endpoint).toBe('http://localhost:8080');
  });

  it('met \u00e0 jour le statut', () => {
    useLiveDataStore.getState().setStatus('connected');
    expect(useLiveDataStore.getState().status).toBe('connected');
  });

  it('met \u00e0 jour le timestamp de derni\u00e8re mise \u00e0 jour', () => {
    useLiveDataStore.getState().setLastUpdate('12:34:56');
    expect(useLiveDataStore.getState().lastUpdate).toBe('12:34:56');
  });

  it('r\u00e9initialise la configuration', () => {
    useLiveDataStore.getState().updateConfig('endpoint', 'http://test');
    useLiveDataStore.getState().setStatus('connected');
    useLiveDataStore.getState().resetConfig();
    expect(useLiveDataStore.getState().config.endpoint).toBe('');
    expect(useLiveDataStore.getState().status).toBe('disconnected');
  });
});

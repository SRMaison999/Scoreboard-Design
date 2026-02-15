import { describe, it, expect, beforeEach } from 'vitest';
import { useBroadcastStore } from '@/stores/broadcastStore';

describe('broadcastStore', () => {
  beforeEach(() => {
    useBroadcastStore.getState().resetBroadcast();
  });

  it('d\u00e9marre arr\u00eat\u00e9', () => {
    expect(useBroadcastStore.getState().status).toBe('stopped');
    expect(useBroadcastStore.getState().framesSent).toBe(0);
  });

  it('met \u00e0 jour la configuration', () => {
    useBroadcastStore.getState().updateConfig('wsPort', 9090);
    expect(useBroadcastStore.getState().config.wsPort).toBe(9090);
  });

  it('met \u00e0 jour le statut', () => {
    useBroadcastStore.getState().setStatus('running');
    expect(useBroadcastStore.getState().status).toBe('running');
  });

  it('incr\u00e9mente les frames envoy\u00e9es', () => {
    useBroadcastStore.getState().incrementFramesSent();
    useBroadcastStore.getState().incrementFramesSent();
    expect(useBroadcastStore.getState().framesSent).toBe(2);
    expect(useBroadcastStore.getState().lastFrameTime).not.toBe('');
  });

  it('met \u00e0 jour les clients connect\u00e9s', () => {
    useBroadcastStore.getState().setConnectedClients(3);
    expect(useBroadcastStore.getState().connectedClients).toBe(3);
  });

  it('r\u00e9initialise compl\u00e8tement', () => {
    useBroadcastStore.getState().setStatus('running');
    useBroadcastStore.getState().incrementFramesSent();
    useBroadcastStore.getState().resetBroadcast();
    expect(useBroadcastStore.getState().status).toBe('stopped');
    expect(useBroadcastStore.getState().framesSent).toBe(0);
  });
});

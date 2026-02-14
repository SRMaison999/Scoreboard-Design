import { useEffect, useState, useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { ScoreboardState } from '@/types/scoreboard';

const CHANNEL_NAME = 'scoreboard-sync';

interface SyncMessage {
  type: 'STATE_UPDATE';
  state: ScoreboardState;
}

/**
 * Cote editeur : envoie le state a la fenetre de sortie via BroadcastChannel.
 */
export function useOutputSyncSender(): void {
  const state = useScoreboardStore();

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    const {
      update: _u,
      updateColor: _uc,
      updateOpacity: _uo,
      applyPreset: _ap,
      updateStat: _us,
      addStat: _as,
      removeStat: _rs,
      updatePlayerStat: _ups,
      addPlayerStat: _aps,
      removePlayerStat: _rps,
      updatePenalty: _up,
      addPenalty: _apn,
      removePenalty: _rp,
      startClock: _sc,
      stopClock: _stc,
      resetClock: _rc,
      tickTimer: _tt,
      incrementScore: _is,
      decrementScore: _ds,
      nextPhase: _np,
      updatePhase: _uph,
      addPhase: _aph,
      removePhase: _rph,
      loadState: _ls,
      resetState: _rst,
      ...plainState
    } = state;

    const message: SyncMessage = {
      type: 'STATE_UPDATE',
      state: plainState as ScoreboardState,
    };
    channel.postMessage(message);

    return () => channel.close();
  }, [state]);
}

/**
 * Cote fenetre de sortie : recoit le state de l'editeur.
 */
export function useOutputSyncReceiver(): ScoreboardState | null {
  const [displayState, setDisplayState] = useState<ScoreboardState | null>(null);

  const handleMessage = useCallback((event: MessageEvent<SyncMessage>) => {
    if (event.data.type === 'STATE_UPDATE') {
      setDisplayState(event.data.state);
    }
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = handleMessage;

    return () => channel.close();
  }, [handleMessage]);

  return displayState;
}

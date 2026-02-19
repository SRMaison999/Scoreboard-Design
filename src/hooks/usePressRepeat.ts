/**
 * Hook pour répéter une action tant qu'un bouton est maintenu enfoncé.
 * Commence après un délai initial, puis accélère progressivement.
 *
 * Utilise un ref pour stocker l'action afin d'éviter le problème de
 * closure stale : le setTimeout appelle toujours la version la plus
 * récente de l'action, même si le composant a re-rendu entre-temps.
 */

import { useRef, useCallback } from 'react';

const INITIAL_DELAY = 400;
const MIN_INTERVAL = 50;
const ACCELERATION = 0.85;

export function usePressRepeat(action: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef(INITIAL_DELAY);
  const actionRef = useRef(action);
  actionRef.current = action;

  const scheduleNext = useCallback(() => {
    timerRef.current = setTimeout(() => {
      actionRef.current();
      intervalRef.current = Math.max(MIN_INTERVAL, intervalRef.current * ACCELERATION);
      scheduleNext();
    }, intervalRef.current);
  }, []);

  const start = useCallback(() => {
    actionRef.current();
    intervalRef.current = INITIAL_DELAY;
    scheduleNext();
  }, [scheduleNext]);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    intervalRef.current = INITIAL_DELAY;
  }, []);

  return { start, stop };
}

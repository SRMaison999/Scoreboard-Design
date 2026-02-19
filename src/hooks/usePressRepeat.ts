/**
 * Hook pour répéter une action tant qu'un bouton est maintenu enfoncé.
 * Commence après un délai initial, puis accélère progressivement.
 */

import { useRef, useCallback } from 'react';

const INITIAL_DELAY = 400;
const MIN_INTERVAL = 50;
const ACCELERATION = 0.85;

export function usePressRepeat(action: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef(INITIAL_DELAY);

  const scheduleNext = useCallback(() => {
    timerRef.current = setTimeout(() => {
      action();
      intervalRef.current = Math.max(MIN_INTERVAL, intervalRef.current * ACCELERATION);
      scheduleNext();
    }, intervalRef.current);
  }, [action]);

  const start = useCallback(() => {
    action();
    intervalRef.current = INITIAL_DELAY;
    scheduleNext();
  }, [action, scheduleNext]);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    intervalRef.current = INITIAL_DELAY;
  }, []);

  return { start, stop };
}

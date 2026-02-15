import { useEffect, useRef } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';

/**
 * Hook qui gere le timer de match.
 * Decremente l'horloge et les penalites chaque dixieme de seconde quand le timer tourne.
 */
export function useTimer(): void {
  const demoRunning = useScoreboardStore((s) => s.demoRunning);
  const tickTimer = useScoreboardStore((s) => s.tickTimer);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!demoRunning) return;

    intervalRef.current = setInterval(() => {
      tickTimer();
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [demoRunning, tickTimer]);
}

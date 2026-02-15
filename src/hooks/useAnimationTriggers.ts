import { useEffect, useRef, useState, useCallback } from 'react';
import type { AnimationConfig } from '@/types/animation';

/** Drapeaux d'animation actifs à un instant donné. */
export interface AnimationFlags {
  /** Animation d'entrée en cours */
  readonly entering: boolean;
  /** Animation de sortie en cours */
  readonly exiting: boolean;
  /** Pop de score côté gauche */
  readonly scorePopLeft: boolean;
  /** Pop de score côté droit */
  readonly scorePopRight: boolean;
  /** Flash de pénalité côté gauche */
  readonly penaltyFlashLeft: boolean;
  /** Flash de pénalité côté droit */
  readonly penaltyFlashRight: boolean;
  /** Pulsation horloge */
  readonly clockPulse: boolean;
}

const NO_FLAGS: AnimationFlags = {
  entering: false,
  exiting: false,
  scorePopLeft: false,
  scorePopRight: false,
  penaltyFlashLeft: false,
  penaltyFlashRight: false,
  clockPulse: false,
};

interface TriggerInputs {
  readonly visible: boolean;
  readonly score1: string;
  readonly score2: string;
  readonly penaltiesLeftCount: number;
  readonly penaltiesRightCount: number;
  readonly timeSeconds: number;
  readonly config: AnimationConfig;
}

/**
 * Détecte les changements de state et active les drapeaux d'animation.
 * Chaque drapeau se désactive automatiquement après la durée configurée.
 */
export function useAnimationTriggers(inputs: TriggerInputs): AnimationFlags {
  const { visible, score1, score2, penaltiesLeftCount, penaltiesRightCount, timeSeconds, config } = inputs;

  const [flags, setFlags] = useState<AnimationFlags>(NO_FLAGS);

  const prevVisible = useRef(visible);
  const prevScore1 = useRef(score1);
  const prevScore2 = useRef(score2);
  const prevPenLeft = useRef(penaltiesLeftCount);
  const prevPenRight = useRef(penaltiesRightCount);
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const setTempFlag = useCallback((key: keyof AnimationFlags, duration: number) => {
    setFlags((f) => ({ ...f, [key]: true }));
    const t = setTimeout(() => {
      setFlags((f) => ({ ...f, [key]: false }));
      timersRef.current.delete(t);
    }, duration);
    timersRef.current.add(t);
  }, []);

  /* Entry / Exit */
  useEffect(() => {
    if (prevVisible.current !== visible) {
      prevVisible.current = visible;
      if (visible && config.entryAnimation !== 'none') {
        setTempFlag('entering', config.entryDuration);
      }
      if (!visible && config.exitAnimation !== 'none') {
        setTempFlag('exiting', config.exitDuration);
      }
    }
  }, [visible, config, setTempFlag]);

  /* Score pop */
  useEffect(() => {
    if (!config.scorePopEnabled) return;
    if (prevScore1.current !== score1 && prevScore1.current !== undefined) {
      setTempFlag('scorePopLeft', config.scorePopDuration);
    }
    prevScore1.current = score1;
  }, [score1, config, setTempFlag]);

  useEffect(() => {
    if (!config.scorePopEnabled) return;
    if (prevScore2.current !== score2 && prevScore2.current !== undefined) {
      setTempFlag('scorePopRight', config.scorePopDuration);
    }
    prevScore2.current = score2;
  }, [score2, config, setTempFlag]);

  /* Penalty flash */
  useEffect(() => {
    if (!config.penaltyFlashEnabled) return;
    if (penaltiesLeftCount > prevPenLeft.current) {
      setTempFlag('penaltyFlashLeft', config.penaltyFlashDuration);
    }
    prevPenLeft.current = penaltiesLeftCount;
  }, [penaltiesLeftCount, config, setTempFlag]);

  useEffect(() => {
    if (!config.penaltyFlashEnabled) return;
    if (penaltiesRightCount > prevPenRight.current) {
      setTempFlag('penaltyFlashRight', config.penaltyFlashDuration);
    }
    prevPenRight.current = penaltiesRightCount;
  }, [penaltiesRightCount, config, setTempFlag]);

  /* Clock pulse — actif quand le temps est sous le seuil */
  useEffect(() => {
    if (!config.clockPulseEnabled) {
      if (flags.clockPulse) setFlags((f) => ({ ...f, clockPulse: false }));
      return;
    }
    const shouldPulse = timeSeconds > 0 && timeSeconds <= config.clockPulseThreshold;
    if (shouldPulse !== flags.clockPulse) {
      setFlags((f) => ({ ...f, clockPulse: shouldPulse }));
    }
  }, [timeSeconds, config, flags.clockPulse]);

  /* Cleanup timers */
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, []);

  return flags;
}

import { useMemo } from 'react';
import { ScoreboardCanvas } from './ScoreboardCanvas';
import type { InlineEditHandler } from './ScoreboardCanvas';
import { useAnimationTriggers } from '@/hooks/useAnimationTriggers';
import {
  entryKeyframeName,
  exitKeyframeName,
  buildAnimationCss,
  parseTimeToSeconds,
} from '@/utils/animation';
import type { ScoreboardState } from '@/types/scoreboard';

interface AnimatedScoreboardProps {
  readonly state: ScoreboardState;
  readonly width?: number;
  readonly height?: number;
  readonly playerPhotos?: Record<string, string>;
  readonly logos?: Record<string, string>;
  readonly canvasScale?: number;
  readonly onInlineEdit?: InlineEditHandler;
}

/**
 * Enveloppe ScoreboardCanvas avec les animations configur\u00e9es :
 * entry/exit, score pop, penalty flash, clock pulse.
 */
export function AnimatedScoreboard({
  state,
  width,
  height,
  playerPhotos,
  logos,
  canvasScale,
  onInlineEdit,
}: AnimatedScoreboardProps) {
  const { animationConfig: config } = state;
  const timeSeconds = parseTimeToSeconds(state.time);

  const flags = useAnimationTriggers({
    visible: state.scoreboardVisible,
    score1: state.score1,
    score2: state.score2,
    penaltiesLeftCount: state.penaltiesLeft.length,
    penaltiesRightCount: state.penaltiesRight.length,
    timeSeconds,
    config,
  });

  const wrapperStyle = useMemo(() => {
    const style: React.CSSProperties = {};

    if (flags.entering) {
      const kf = entryKeyframeName(config.entryAnimation);
      style.animation = buildAnimationCss(kf, config.entryDuration, config.entryEasing);
    } else if (flags.exiting) {
      const kf = exitKeyframeName(config.exitAnimation);
      style.animation = buildAnimationCss(kf, config.exitDuration, config.exitEasing);
    }

    if (!state.scoreboardVisible && !flags.exiting) {
      style.opacity = 0;
      style.pointerEvents = 'none';
    }

    return style;
  }, [flags.entering, flags.exiting, config, state.scoreboardVisible]);

  return (
    <div style={wrapperStyle} data-testid="animated-scoreboard">
      <ScoreboardCanvas
        state={state}
        width={width}
        height={height}
        playerPhotos={playerPhotos}
        logos={logos}
        scorePopLeft={flags.scorePopLeft}
        scorePopRight={flags.scorePopRight}
        penaltyFlashLeft={flags.penaltyFlashLeft}
        penaltyFlashRight={flags.penaltyFlashRight}
        clockPulse={flags.clockPulse}
        canvasScale={canvasScale}
        onInlineEdit={onInlineEdit}
      />
    </div>
  );
}

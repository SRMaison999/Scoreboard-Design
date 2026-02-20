import { useRef } from 'react';
import { useScaling } from '@/hooks/useScaling';
import { usePlayerPhotos } from '@/hooks/usePlayerPhotos';
import { useLogos } from '@/hooks/useLogos';
import { AnimatedScoreboard } from './AnimatedScoreboard';
import type { InlineEditHandler } from './ScoreboardCanvas';
import type { ScoreboardState } from '@/types/scoreboard';

interface ScoreboardPreviewProps {
  readonly state: ScoreboardState;
  readonly onInlineEdit?: InlineEditHandler;
}

export function ScoreboardPreview({ state, onInlineEdit }: ScoreboardPreviewProps) {
  const playerPhotos = usePlayerPhotos();
  const logos = useLogos();
  const wrapRef = useRef<HTMLDivElement>(null);
  const w = state.templateWidth;
  const h = state.templateHeight;
  const scale = useScaling(wrapRef, w, h);

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        data-testid="scoreboard-capture"
        style={{
          width: w,
          height: h,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        <AnimatedScoreboard state={state} playerPhotos={playerPhotos} logos={logos} canvasScale={scale} onInlineEdit={onInlineEdit} />
      </div>
    </div>
  );
}

import { useRef } from 'react';
import { useScaling } from '@/hooks/useScaling';
import { usePlayerPhotos } from '@/hooks/usePlayerPhotos';
import { ScoreboardCanvas } from './ScoreboardCanvas';
import type { ScoreboardState } from '@/types/scoreboard';

interface ScoreboardPreviewProps {
  readonly state: ScoreboardState;
}

export function ScoreboardPreview({ state }: ScoreboardPreviewProps) {
  const playerPhotos = usePlayerPhotos();
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
        <ScoreboardCanvas state={state} playerPhotos={playerPhotos} />
      </div>
    </div>
  );
}

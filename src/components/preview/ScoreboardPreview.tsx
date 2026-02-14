import { useRef } from 'react';
import { useScaling } from '@/hooks/useScaling';
import { ScoreboardCanvas } from './ScoreboardCanvas';
import type { ScoreboardState } from '@/types/scoreboard';

interface ScoreboardPreviewProps {
  readonly state: ScoreboardState;
}

const W = 1920;
const H = 1080;

export function ScoreboardPreview({ state }: ScoreboardPreviewProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scale = useScaling(wrapRef, W, H);

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
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        <ScoreboardCanvas state={state} width={W} height={H} />
      </div>
    </div>
  );
}

import { useRef } from 'react';
import { useScaling } from '@/hooks/useScaling';
import { usePlayerPhotos } from '@/hooks/usePlayerPhotos';
import { useLogos } from '@/hooks/useLogos';
import { useCanvasZoom } from '@/hooks/useCanvasZoom';
import { useCanvasViewStore } from '@/stores/canvasViewStore';
import { AnimatedScoreboard } from './AnimatedScoreboard';
import { ZoomBar } from './ZoomBar';
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

  const isLayoutLibre = state.bodyType === 14;
  const zoom = useCanvasViewStore((s) => s.zoom);
  const panX = useCanvasViewStore((s) => s.panX);
  const panY = useCanvasViewStore((s) => s.panY);

  const { isSpaceHeld, isPanning } = useCanvasZoom({
    containerRef: wrapRef,
    enabled: isLayoutLibre,
    baseScale: scale,
  });

  const effectiveScale = isLayoutLibre ? scale * zoom : scale;
  const translateX = isLayoutLibre ? panX : 0;
  const translateY = isLayoutLibre ? panY : 0;

  const cursorStyle = isLayoutLibre
    ? isPanning
      ? 'grabbing'
      : isSpaceHeld
        ? 'grab'
        : undefined
    : undefined;

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
        position: 'relative',
        cursor: cursorStyle,
      }}
    >
      <div
        data-testid="scoreboard-capture"
        style={{
          width: w,
          height: h,
          transform: `translate(${translateX}px, ${translateY}px) scale(${effectiveScale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        <AnimatedScoreboard state={state} playerPhotos={playerPhotos} logos={logos} canvasScale={effectiveScale} onInlineEdit={onInlineEdit} />
      </div>

      {isLayoutLibre && <ZoomBar />}
    </div>
  );
}

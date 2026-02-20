/**
 * Overlay des guides dynamiques (smart guides) sur le canvas.
 * Affiche les lignes d'alignement en temps reel pendant le drag.
 * Rendu sur le canvas (inline styles autorises).
 */

import type { GuideLine } from '@/hooks/useSmartGuides';

interface SmartGuideOverlayProps {
  readonly guides: readonly GuideLine[];
}

export function SmartGuideOverlay({ guides }: SmartGuideOverlayProps) {
  if (guides.length === 0) return null;

  return (
    <div
      data-testid="smart-guide-overlay"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 9998 }}
    >
      {guides.map((guide, i) => {
        if (guide.orientation === 'vertical') {
          return (
            <div
              key={`v-${guide.position}-${i}`}
              style={{
                position: 'absolute',
                left: guide.position,
                top: guide.start,
                width: 1,
                height: guide.end - guide.start,
                backgroundColor: 'rgba(236, 72, 153, 0.8)',
              }}
            />
          );
        }
        return (
          <div
            key={`h-${guide.position}-${i}`}
            style={{
              position: 'absolute',
              left: guide.start,
              top: guide.position,
              width: guide.end - guide.start,
              height: 1,
              backgroundColor: 'rgba(236, 72, 153, 0.8)',
            }}
          />
        );
      })}
    </div>
  );
}

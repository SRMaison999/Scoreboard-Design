import { useMultiScoreboardStore } from '@/stores/multiScoreboardStore';
import { LowerThird } from './LowerThird';
import { ScoreBug } from './ScoreBug';
import { Ticker } from './Ticker';

export function OverlayRenderer() {
  const overlays = useMultiScoreboardStore((s) => s.overlays);

  return (
    <>
      {overlays.map((overlay) => {
        if (!overlay.visible) return null;
        switch (overlay.type) {
          case 'lowerThird':
            return (
              <LowerThird
                key={overlay.id}
                opacity={overlay.opacity}
              />
            );
          case 'bug':
            return (
              <ScoreBug
                key={overlay.id}
                position={overlay.position}
                opacity={overlay.opacity}
              />
            );
          case 'ticker':
            return (
              <Ticker
                key={overlay.id}
                opacity={overlay.opacity}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

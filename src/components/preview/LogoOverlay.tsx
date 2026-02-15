import type { CSSProperties } from 'react';
import type { LogoPosition } from '@/types/logo';

interface LogoOverlayProps {
  readonly dataUrl: string;
  readonly position: LogoPosition;
  readonly size: number;
}

const POSITION_STYLES: Record<LogoPosition, CSSProperties> = {
  'top-left': { top: 12, left: 12 },
  'top-right': { top: 12, right: 12 },
  'top-center': { top: 12, left: '50%', transform: 'translateX(-50%)' },
  'bottom-left': { bottom: 12, left: 12 },
  'bottom-right': { bottom: 12, right: 12 },
  'bottom-center': { bottom: 12, left: '50%', transform: 'translateX(-50%)' },
};

/**
 * Logo en superposition sur le canvas (compétition ou sponsor).
 */
export function LogoOverlay({ dataUrl, position, size }: LogoOverlayProps) {
  if (!dataUrl) return null;

  const posStyle = POSITION_STYLES[position];

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 10,
        pointerEvents: 'none',
        ...posStyle,
      }}
    >
      <img
        src={dataUrl}
        alt=""
        style={{
          maxWidth: size,
          maxHeight: size,
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}

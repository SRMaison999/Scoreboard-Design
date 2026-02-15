export type OverlayType = 'lowerThird' | 'bug' | 'ticker';

export type OverlayPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface OverlayInstance {
  id: string;
  type: OverlayType;
  visible: boolean;
  position: OverlayPosition;
  opacity: number;
}

export interface TickerItem {
  text: string;
}

export interface MultiScoreboardConfig {
  overlays: OverlayInstance[];
  tickerItems: TickerItem[];
  tickerSpeed: number;
}

export const DEFAULT_MULTI_SCOREBOARD_CONFIG: MultiScoreboardConfig = {
  overlays: [],
  tickerItems: [],
  tickerSpeed: 50,
};

let overlayIdCounter = 0;

export function createOverlay(type: OverlayType): OverlayInstance {
  overlayIdCounter += 1;
  return {
    id: `overlay-${String(overlayIdCounter)}`,
    type,
    visible: true,
    position: type === 'bug' ? 'top-right' : 'bottom-center',
    opacity: 1,
  };
}

import { describe, it, expect, beforeEach } from 'vitest';
import { useMultiScoreboardStore } from '@/stores/multiScoreboardStore';

describe('multiScoreboardStore', () => {
  beforeEach(() => {
    useMultiScoreboardStore.getState().resetOverlays();
  });

  it('d\u00e9marre sans overlay', () => {
    expect(useMultiScoreboardStore.getState().overlays).toHaveLength(0);
  });

  it('ajoute un overlay lowerThird', () => {
    useMultiScoreboardStore.getState().addOverlay('lowerThird');
    const overlays = useMultiScoreboardStore.getState().overlays;
    expect(overlays).toHaveLength(1);
    expect(overlays[0]?.type).toBe('lowerThird');
    expect(overlays[0]?.visible).toBe(true);
  });

  it('ajoute un overlay bug en haut \u00e0 droite par d\u00e9faut', () => {
    useMultiScoreboardStore.getState().addOverlay('bug');
    const overlay = useMultiScoreboardStore.getState().overlays[0];
    expect(overlay?.position).toBe('top-right');
  });

  it('supprime un overlay', () => {
    useMultiScoreboardStore.getState().addOverlay('lowerThird');
    const id = useMultiScoreboardStore.getState().overlays[0]?.id ?? '';
    useMultiScoreboardStore.getState().removeOverlay(id);
    expect(useMultiScoreboardStore.getState().overlays).toHaveLength(0);
  });

  it('met \u00e0 jour la visibilit\u00e9', () => {
    useMultiScoreboardStore.getState().addOverlay('bug');
    const id = useMultiScoreboardStore.getState().overlays[0]?.id ?? '';
    useMultiScoreboardStore.getState().updateOverlayVisibility(id, false);
    expect(useMultiScoreboardStore.getState().overlays[0]?.visible).toBe(false);
  });

  it('met \u00e0 jour l\'opacit\u00e9', () => {
    useMultiScoreboardStore.getState().addOverlay('bug');
    const id = useMultiScoreboardStore.getState().overlays[0]?.id ?? '';
    useMultiScoreboardStore.getState().updateOverlayOpacity(id, 0.5);
    expect(useMultiScoreboardStore.getState().overlays[0]?.opacity).toBe(0.5);
  });

  it('ajoute et supprime un \u00e9l\u00e9ment de ticker', () => {
    useMultiScoreboardStore.getState().addTickerItem('CAN 3 - USA 2');
    expect(useMultiScoreboardStore.getState().tickerItems).toHaveLength(1);
    useMultiScoreboardStore.getState().removeTickerItem(0);
    expect(useMultiScoreboardStore.getState().tickerItems).toHaveLength(0);
  });

  it('met \u00e0 jour la vitesse du ticker', () => {
    useMultiScoreboardStore.getState().setTickerSpeed(100);
    expect(useMultiScoreboardStore.getState().tickerSpeed).toBe(100);
  });
});

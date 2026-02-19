import { describe, it, expect, vi } from 'vitest';
import { updateFieldElementConfig } from '../fieldConfig';
import type { FieldElementConfig } from '@/types/customField';

describe('updateFieldElementConfig', () => {
  it('appelle updateElement avec la config fusionnee', () => {
    const updateElement = vi.fn();
    const element: FieldElementConfig = {
      type: 'header-block',
      config: { showClock: false },
    };

    updateFieldElementConfig(updateElement, 'f1', element, { showClock: true });

    expect(updateElement).toHaveBeenCalledWith('f1', {
      type: 'header-block',
      config: { showClock: true },
    });
  });

  it('fusionne partiellement la config existante', () => {
    const updateElement = vi.fn();
    const element: FieldElementConfig = {
      type: 'clock-display',
      config: { showPeriod: true, showBox: false, fontSizeOverride: 0 },
    };

    updateFieldElementConfig(updateElement, 'f2', element, { showBox: true });

    expect(updateElement).toHaveBeenCalledWith('f2', {
      type: 'clock-display',
      config: { showPeriod: true, showBox: true, fontSizeOverride: 0 },
    });
  });
});

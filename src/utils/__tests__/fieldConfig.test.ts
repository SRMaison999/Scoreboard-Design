import { describe, it, expect, vi } from 'vitest';
import { updateFieldElementConfig, createDefaultFieldConfig, SIDE_ELEMENT_TYPES, prepareFieldForAdd } from '../fieldConfig';
import { LIBRARY_ELEMENTS } from '@/constants/customFields';
import type { FieldElementConfig, CustomField } from '@/types/customField';

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

describe('createDefaultFieldConfig', () => {
  it('cree une config text-block par defaut', () => {
    const el = LIBRARY_ELEMENTS.find((e) => e.type === 'text-block');
    expect(el).toBeDefined();
    const config = createDefaultFieldConfig(el!);
    expect(config.type).toBe('text-block');
    expect(config.config).toHaveProperty('content');
  });

  it('cree une config score-display avec side left par defaut', () => {
    const el = LIBRARY_ELEMENTS.find((e) => e.type === 'score-display');
    expect(el).toBeDefined();
    const config = createDefaultFieldConfig(el!);
    expect(config.type).toBe('score-display');
    expect((config.config as { side: string }).side).toBe('left');
  });

  it('cree une config pour les body types composes', () => {
    const el = LIBRARY_ELEMENTS.find((e) => e.type === 'body-type-1');
    expect(el).toBeDefined();
    const config = createDefaultFieldConfig(el!);
    expect(config.type).toBe('body-type-1');
    expect((config.config as { bodyTypeId: number }).bodyTypeId).toBe(1);
  });
});

describe('SIDE_ELEMENT_TYPES', () => {
  it('contient les types dependant du cote', () => {
    expect(SIDE_ELEMENT_TYPES.has('score-display')).toBe(true);
    expect(SIDE_ELEMENT_TYPES.has('team-name')).toBe(true);
    expect(SIDE_ELEMENT_TYPES.has('flag-display')).toBe(true);
    expect(SIDE_ELEMENT_TYPES.has('penalty-column')).toBe(true);
  });

  it('ne contient pas les types independants du cote', () => {
    expect(SIDE_ELEMENT_TYPES.has('text-block')).toBe(false);
    expect(SIDE_ELEMENT_TYPES.has('clock-display')).toBe(false);
  });
});

describe('prepareFieldForAdd', () => {
  const makeField = (type: string, side: string): CustomField => ({
    id: 'test',
    label: 'Test',
    x: 0, y: 0, width: 100, height: 100,
    rotation: 0, zIndex: 1,
    locked: false, visible: true, lockAspectRatio: false,
    scaleContent: true, initialWidth: 100, initialHeight: 100,
    element: { type, config: { side } } as unknown as FieldElementConfig,
    style: {
      backgroundColor: '', backgroundOpacity: 0,
      borderColor: '', borderWidth: 0, borderRadius: 0, padding: 0,
      opacity: 100, shadow: null, backdropBlur: 0,
    },
  });

  it('retourne config et label pour un element simple', () => {
    const el = LIBRARY_ELEMENTS.find((e) => e.type === 'text-block')!;
    const result = prepareFieldForAdd(el, []);
    expect(result.config.type).toBe('text-block');
    expect(result.label).toBe('Bloc de texte');
  });

  it('detecte le cote droit si un champ gauche existe deja', () => {
    const el = LIBRARY_ELEMENTS.find((e) => e.type === 'score-display')!;
    const existing = [makeField('score-display', 'left')];
    const result = prepareFieldForAdd(el, existing);
    expect((result.config.config as { side: string }).side).toBe('right');
    expect(result.label).toContain('Droite');
  });

  it('detecte le cote gauche quand aucun champ n existe', () => {
    const el = LIBRARY_ELEMENTS.find((e) => e.type === 'score-display')!;
    const result = prepareFieldForAdd(el, []);
    expect((result.config.config as { side: string }).side).toBe('left');
    expect(result.label).toContain('Gauche');
  });
});

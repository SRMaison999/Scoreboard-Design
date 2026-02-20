import { describe, it, expect } from 'vitest';
import {
  HOCKEY_LAYOUT_PRESETS,
  type HockeyLayoutPreset,
} from '@/data/hockeyLayoutPresets';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

/** Dimensions du canvas de r\u00e9f\u00e9rence */
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

describe('HOCKEY_LAYOUT_PRESETS', () => {
  it('contient exactement 4 presets', () => {
    expect(HOCKEY_LAYOUT_PRESETS).toHaveLength(4);
  });

  it('chaque preset a un id, nom et description valides', () => {
    for (const preset of HOCKEY_LAYOUT_PRESETS) {
      expect(preset.id).toBeTruthy();
      expect(preset.name).toBeTruthy();
      expect(preset.description).toBeTruthy();
      expect(preset.fields.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('les ids de presets sont tous uniques', () => {
    const ids = HOCKEY_LAYOUT_PRESETS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('les ids de champs sont uniques au sein de chaque preset', () => {
    for (const preset of HOCKEY_LAYOUT_PRESETS) {
      const fieldIds = preset.fields.map((f) => f.id);
      expect(new Set(fieldIds).size).toBe(fieldIds.length);
    }
  });

  it('les ids de champs sont uniques entre tous les presets', () => {
    const allFieldIds = HOCKEY_LAYOUT_PRESETS.flatMap((p) =>
      p.fields.map((f) => f.id),
    );
    expect(new Set(allFieldIds).size).toBe(allFieldIds.length);
  });

  it('tous les champs sont positionn\u00e9s dans le canvas 1920x1080', () => {
    for (const preset of HOCKEY_LAYOUT_PRESETS) {
      for (const field of preset.fields) {
        expect(field.x).toBeGreaterThanOrEqual(0);
        expect(field.y).toBeGreaterThanOrEqual(0);
        expect(field.x + field.width).toBeLessThanOrEqual(CANVAS_WIDTH);
        expect(field.y + field.height).toBeLessThanOrEqual(CANVAS_HEIGHT);
      }
    }
  });

  it('tous les champs ont des dimensions positives', () => {
    for (const preset of HOCKEY_LAYOUT_PRESETS) {
      for (const field of preset.fields) {
        expect(field.width).toBeGreaterThan(0);
        expect(field.height).toBeGreaterThan(0);
      }
    }
  });

  it('tous les champs sont visibles par d\u00e9faut', () => {
    for (const preset of HOCKEY_LAYOUT_PRESETS) {
      for (const field of preset.fields) {
        expect(field.visible).toBe(true);
      }
    }
  });

  it('aucun champ n\u2019est verrouill\u00e9 par d\u00e9faut', () => {
    for (const preset of HOCKEY_LAYOUT_PRESETS) {
      for (const field of preset.fields) {
        expect(field.locked).toBe(false);
      }
    }
  });

  it('tous les champs ont initialWidth/initialHeight coh\u00e9rents', () => {
    for (const preset of HOCKEY_LAYOUT_PRESETS) {
      for (const field of preset.fields) {
        expect(field.initialWidth).toBe(field.width);
        expect(field.initialHeight).toBe(field.height);
      }
    }
  });
});

describe('Preset Score simple', () => {
  const preset = HOCKEY_LAYOUT_PRESETS.find(
    (p) => p.id === 'hockey-simple-score',
  ) as HockeyLayoutPreset;

  it('existe et porte le bon nom', () => {
    expect(preset).toBeDefined();
    expect(preset.name).toBe(CUSTOM_FIELD_LABELS.hockeyPresetSimpleScore);
  });

  it('contient 5 champs', () => {
    expect(preset.fields).toHaveLength(5);
  });

  it('contient des champs team-name, score-display et clock-display', () => {
    const types = preset.fields.map((f) => f.element.type);
    expect(types.filter((t) => t === 'team-name')).toHaveLength(2);
    expect(types.filter((t) => t === 'score-display')).toHaveLength(2);
    expect(types.filter((t) => t === 'clock-display')).toHaveLength(1);
  });
});

describe('Preset Score avec p\u00e9nalit\u00e9s', () => {
  const preset = HOCKEY_LAYOUT_PRESETS.find(
    (p) => p.id === 'hockey-with-penalties',
  ) as HockeyLayoutPreset;

  it('existe et porte le bon nom', () => {
    expect(preset).toBeDefined();
    expect(preset.name).toBe(CUSTOM_FIELD_LABELS.hockeyPresetWithPenalties);
  });

  it('contient 7 champs', () => {
    expect(preset.fields).toHaveLength(7);
  });

  it('contient 2 colonnes de p\u00e9nalit\u00e9s', () => {
    const penalties = preset.fields.filter(
      (f) => f.element.type === 'penalty-column',
    );
    expect(penalties).toHaveLength(2);
  });

  it('les colonnes de p\u00e9nalit\u00e9s couvrent gauche et droite', () => {
    const penalties = preset.fields.filter(
      (f) => f.element.type === 'penalty-column',
    );
    const sides = penalties.map((f) => {
      if (f.element.type === 'penalty-column') {
        return f.element.config.side;
      }
      return null;
    });
    expect(sides).toContain('left');
    expect(sides).toContain('right');
  });
});

describe('Preset Bandeau inf\u00e9rieur', () => {
  const preset = HOCKEY_LAYOUT_PRESETS.find(
    (p) => p.id === 'hockey-lower-third',
  ) as HockeyLayoutPreset;

  it('existe et porte le bon nom', () => {
    expect(preset).toBeDefined();
    expect(preset.name).toBe(CUSTOM_FIELD_LABELS.hockeyPresetLowerThird);
  });

  it('contient 5 champs', () => {
    expect(preset.fields).toHaveLength(5);
  });

  it('tous les champs sont dans le tiers inf\u00e9rieur (y >= 900)', () => {
    for (const field of preset.fields) {
      expect(field.y).toBeGreaterThanOrEqual(900);
    }
  });
});

describe('Preset Statistiques compl\u00e8tes', () => {
  const preset = HOCKEY_LAYOUT_PRESETS.find(
    (p) => p.id === 'hockey-full-stats',
  ) as HockeyLayoutPreset;

  it('existe et porte le bon nom', () => {
    expect(preset).toBeDefined();
    expect(preset.name).toBe(CUSTOM_FIELD_LABELS.hockeyPresetFullStats);
  });

  it('contient entre 10 et 12 champs', () => {
    expect(preset.fields.length).toBeGreaterThanOrEqual(10);
    expect(preset.fields.length).toBeLessThanOrEqual(12);
  });

  it('contient des lignes de statistiques', () => {
    const statLines = preset.fields.filter(
      (f) => f.element.type === 'stat-line',
    );
    expect(statLines.length).toBeGreaterThanOrEqual(3);
  });

  it('contient un champ p\u00e9riode', () => {
    const periods = preset.fields.filter(
      (f) => f.element.type === 'period-display',
    );
    expect(periods).toHaveLength(1);
  });

  it('contient un champ horloge', () => {
    const clocks = preset.fields.filter(
      (f) => f.element.type === 'clock-display',
    );
    expect(clocks).toHaveLength(1);
  });
});

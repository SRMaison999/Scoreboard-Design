import { describe, it, expect } from 'vitest';
import { PRESET_TEMPLATES } from '@/data/presetTemplates';

describe('PRESET_TEMPLATES', () => {
  it('contient au moins un template prédéfini', () => {
    expect(PRESET_TEMPLATES.length).toBeGreaterThanOrEqual(1);
  });

  it('chaque template a un id, nom et state valides', () => {
    for (const preset of PRESET_TEMPLATES) {
      expect(preset.id).toBeTruthy();
      expect(preset.name).toBeTruthy();
      expect(preset.state).toBeDefined();
      expect(preset.state.team1).toBeDefined();
    }
  });

  it('les ids sont tous uniques', () => {
    const ids = PRESET_TEMPLATES.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

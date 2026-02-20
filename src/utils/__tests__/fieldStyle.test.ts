import { describe, it, expect } from 'vitest';
import { fieldBgStyle } from '../fieldStyle';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';
import type { FieldStyle } from '@/types/customField';

function makeStyle(overrides: Partial<FieldStyle>): FieldStyle {
  return { ...DEFAULT_FIELD_STYLE, ...overrides };
}

describe('fieldBgStyle', () => {
  it('retourne un objet vide pour un style par defaut', () => {
    const result = fieldBgStyle(makeStyle({}));
    expect(result).toEqual({});
  });

  it('applique la couleur de fond avec opacite', () => {
    const result = fieldBgStyle(makeStyle({
      backgroundColor: '#ff0000',
      backgroundOpacity: 50,
    }));
    expect(result.backgroundColor).toBeDefined();
  });

  it('applique la bordure quand epaisseur > 0', () => {
    const result = fieldBgStyle(makeStyle({
      borderColor: '#0000ff',
      borderWidth: 2,
    }));
    expect(result.border).toContain('2px solid');
  });

  it('applique le borderRadius quand > 0', () => {
    const result = fieldBgStyle(makeStyle({
      borderRadius: 10,
    }));
    expect(result.borderRadius).toBe('10px');
  });

  it('applique le padding quand > 0', () => {
    const result = fieldBgStyle(makeStyle({
      padding: 8,
    }));
    expect(result.padding).toBe('8px');
  });
});

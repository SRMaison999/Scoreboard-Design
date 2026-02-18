import { describe, it, expect } from 'vitest';
import { fieldBgStyle } from '../fieldStyle';

describe('fieldBgStyle', () => {
  it('retourne un objet vide pour un style par defaut', () => {
    const result = fieldBgStyle({
      backgroundColor: '',
      backgroundOpacity: 0,
      borderColor: '',
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
    });
    expect(result).toEqual({});
  });

  it('applique la couleur de fond avec opacite', () => {
    const result = fieldBgStyle({
      backgroundColor: '#ff0000',
      backgroundOpacity: 50,
      borderColor: '',
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
    });
    expect(result.backgroundColor).toBeDefined();
  });

  it('applique la bordure quand epaisseur > 0', () => {
    const result = fieldBgStyle({
      backgroundColor: '',
      backgroundOpacity: 0,
      borderColor: '#0000ff',
      borderWidth: 2,
      borderRadius: 0,
      padding: 0,
    });
    expect(result.border).toContain('2px solid');
  });

  it('applique le borderRadius quand > 0', () => {
    const result = fieldBgStyle({
      backgroundColor: '',
      backgroundOpacity: 0,
      borderColor: '',
      borderWidth: 0,
      borderRadius: 10,
      padding: 0,
    });
    expect(result.borderRadius).toBe('10px');
  });

  it('applique le padding quand > 0', () => {
    const result = fieldBgStyle({
      backgroundColor: '',
      backgroundOpacity: 0,
      borderColor: '',
      borderWidth: 0,
      borderRadius: 0,
      padding: 8,
    });
    expect(result.padding).toBe('8px');
  });
});

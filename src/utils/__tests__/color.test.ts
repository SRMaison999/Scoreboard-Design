import { describe, it, expect } from 'vitest';
import { hexToRgba } from '@/utils/color';

describe('hexToRgba', () => {
  it('retourne le hex inchangé quand opacité est 0', () => {
    expect(hexToRgba('#ff0000', 0)).toBe('#ff0000');
  });

  it('retourne rgba avec transparence partielle', () => {
    expect(hexToRgba('#ff0000', 50)).toBe('rgba(255,0,0,0.5)');
  });

  it('retourne rgba totalement transparent à 100%', () => {
    expect(hexToRgba('#ffffff', 100)).toBe('rgba(255,255,255,0)');
  });

  it('gère les codes sans #', () => {
    expect(hexToRgba('0000ff', 25)).toBe('rgba(0,0,255,0.75)');
  });

  it('retourne la valeur telle quelle si chaîne vide', () => {
    expect(hexToRgba('', 50)).toBe('');
  });

  it('retourne la valeur telle quelle si hex trop court', () => {
    expect(hexToRgba('#fff', 50)).toBe('#fff');
  });
});

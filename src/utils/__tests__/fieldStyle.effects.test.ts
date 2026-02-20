/**
 * Tests pour les effets visuels etendus de fieldStyle.
 * Teste ombre portee, opacite globale et flou d'arriere-plan.
 */

import { describe, it, expect } from 'vitest';
import { fieldBgStyle } from '../fieldStyle';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';
import type { FieldStyle } from '@/types/customField';

function makeStyle(overrides: Partial<FieldStyle>): FieldStyle {
  return { ...DEFAULT_FIELD_STYLE, ...overrides };
}

describe('fieldBgStyle - effets visuels', () => {
  it('applique l\'opacite globale quand definie', () => {
    const style = makeStyle({ opacity: 50 });
    const css = fieldBgStyle(style);
    expect(css.opacity).toBe(0.5);
  });

  it('n\'ajoute pas opacity quand a 100', () => {
    const style = makeStyle({ opacity: 100 });
    const css = fieldBgStyle(style);
    expect(css.opacity).toBeUndefined();
  });

  it('applique une ombre portee', () => {
    const style = makeStyle({
      shadow: { offsetX: 4, offsetY: 4, blur: 10, color: '#000000', opacity: 50 },
    });
    const css = fieldBgStyle(style);
    expect(css.boxShadow).toBeDefined();
    expect(css.boxShadow).toContain('4px 4px 10px');
  });

  it('n\'ajoute pas de boxShadow quand shadow est null', () => {
    const style = makeStyle({ shadow: null });
    const css = fieldBgStyle(style);
    expect(css.boxShadow).toBeUndefined();
  });

  it('applique le flou d\'arriere-plan', () => {
    const style = makeStyle({ backdropBlur: 8 });
    const css = fieldBgStyle(style);
    expect(css.backdropFilter).toBe('blur(8px)');
  });

  it('n\'ajoute pas backdropFilter quand blur est 0', () => {
    const style = makeStyle({ backdropBlur: 0 });
    const css = fieldBgStyle(style);
    expect(css.backdropFilter).toBeUndefined();
  });
});

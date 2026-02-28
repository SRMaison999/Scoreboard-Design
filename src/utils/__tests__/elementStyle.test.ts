import { describe, it, expect } from 'vitest';
import { resolveElementStyle, resolveColor } from '@/utils/elementStyle';
import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';

const ctx: StyleContext = {
  colors: { ...DEFAULT_COLORS },
  opacities: { ...DEFAULT_OPACITIES },
  fontBody: 'barlow',
  bodyScale: 100,
};

const defaults: ElementDefaults = {
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: 2,
  textTransform: 'uppercase',
  colorKey: 'statVal',
};

describe('resolveElementStyle', () => {
  it('retourne les valeurs par d\u00e9faut sans override', () => {
    const result = resolveElementStyle(defaults, ctx);
    expect(result.fontSize).toBe(20);
    expect(result.fontWeight).toBe(600);
    expect(result.letterSpacing).toBe(2);
    expect(result.textTransform).toBe('uppercase');
  });

  it('applique le bodyScale \u00e0 la taille de police', () => {
    const result = resolveElementStyle(defaults, { ...ctx, bodyScale: 150 });
    expect(result.fontSize).toBe(30);
  });

  it('surcharge la taille de police', () => {
    const result = resolveElementStyle(defaults, ctx, { fontSize: 40 });
    expect(result.fontSize).toBe(40);
  });

  it('surcharge la taille de police avec bodyScale', () => {
    const result = resolveElementStyle(defaults, { ...ctx, bodyScale: 200 }, { fontSize: 40 });
    expect(result.fontSize).toBe(80);
  });

  it('surcharge la graisse de police', () => {
    const result = resolveElementStyle(defaults, ctx, { fontWeight: 900 });
    expect(result.fontWeight).toBe(900);
  });

  it('surcharge l\u2019espacement des lettres', () => {
    const result = resolveElementStyle(defaults, ctx, { letterSpacing: 10 });
    expect(result.letterSpacing).toBe(10);
  });

  it('surcharge la transformation du texte', () => {
    const result = resolveElementStyle(defaults, ctx, { textTransform: 'lowercase' });
    expect(result.textTransform).toBe('lowercase');
  });

  it('surcharge la couleur avec un hex', () => {
    const result = resolveElementStyle(defaults, ctx, { color: '#ff0000' });
    expect(result.color).toBe('#ff0000');
  });

  it('surcharge la couleur avec opacit\u00e9', () => {
    const result = resolveElementStyle(defaults, ctx, { color: '#ff0000', opacity: 50 });
    expect(result.color).toContain('rgba');
    expect(result.color).toContain('255');
  });

  it('surcharge la police', () => {
    const result = resolveElementStyle(defaults, ctx, { fontFamily: 'oswald' });
    expect(result.fontFamily).toContain('Oswald');
  });

  it('applique l\u2019opacit\u00e9 hardcod\u00e9e si aucune surcharge', () => {
    const withOpacity: ElementDefaults = { ...defaults, hardcodedOpacity: 0.7 };
    const result = resolveElementStyle(withOpacity, ctx);
    expect(result.opacity).toBe(0.7);
  });

  it('n\u2019applique pas l\u2019opacit\u00e9 hardcod\u00e9e si couleur surcharg\u00e9e', () => {
    const withOpacity: ElementDefaults = { ...defaults, hardcodedOpacity: 0.7 };
    const result = resolveElementStyle(withOpacity, ctx, { color: '#ff0000' });
    expect(result.opacity).toBeUndefined();
  });

  it('g\u00e8re un override vide', () => {
    const result = resolveElementStyle(defaults, ctx, {});
    expect(result.fontSize).toBe(20);
    expect(result.fontWeight).toBe(600);
  });
});

describe('resolveColor', () => {
  it('retourne la couleur globale sans override', () => {
    const result = resolveColor('statVal', ctx);
    expect(result).toBeTruthy();
  });

  it('retourne la couleur surcharg\u00e9e', () => {
    const result = resolveColor('statVal', ctx, { color: '#00ff00' });
    expect(result).toBe('#00ff00');
  });

  it('retourne la couleur surcharg\u00e9e avec opacit\u00e9', () => {
    const result = resolveColor('statVal', ctx, { color: '#00ff00', opacity: 30 });
    expect(result).toContain('rgba');
  });
});

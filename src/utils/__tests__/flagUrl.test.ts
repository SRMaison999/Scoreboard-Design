import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * On mock le registre SVG et le module svg pour isoler les tests
 * de la pr\u00e9sence r\u00e9elle des fichiers .svg.
 */
vi.mock('@/assets/flags', () => ({
  FLAG_SVG_REGISTRY: {
    CAN: '<svg id="CAN"><rect fill="red"/></svg>',
    USA: '<svg id="USA"><rect fill="blue"/></svg>',
  },
}));

vi.mock('@/utils/svg', () => ({
  svgToDataUri: (svg: string) => `data:image/svg+xml;charset=utf-8,MOCK_${svg.length}`,
}));

import { resolveFlagUrl, getRawFlagSvg } from '@/utils/flagUrl';

describe('resolveFlagUrl', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('retourne un data URI pour un NOC connu sans override', async () => {
    const { resolveFlagUrl: resolve } = await import('@/utils/flagUrl');
    const result = resolve('CAN', {});
    expect(result).toMatch(/^data:image\/svg\+xml;/);
  });

  it('retourne une cha\u00eene vide pour un NOC inconnu', () => {
    const result = resolveFlagUrl('XYZ', {});
    expect(result).toBe('');
  });

  it('priorise l\u2019override utilisateur sur le SVG embarqu\u00e9', () => {
    const overrides = { 'flag-CAN': 'data:image/png;base64,USER_CUSTOM' };
    const result = resolveFlagUrl('CAN', overrides);
    expect(result).toBe('data:image/png;base64,USER_CUSTOM');
  });

  it('retourne le SVG embarqu\u00e9 si l\u2019override ne correspond pas au code', () => {
    const overrides = { 'flag-USA': 'data:image/png;base64,USA_CUSTOM' };
    const result = resolveFlagUrl('CAN', overrides);
    expect(result).toMatch(/^data:image\/svg\+xml;/);
  });

  it('utilise le cache pour les appels r\u00e9p\u00e9t\u00e9s au m\u00eame NOC', () => {
    const result1 = resolveFlagUrl('USA', {});
    const result2 = resolveFlagUrl('USA', {});
    expect(result1).toBe(result2);
    expect(result1).toMatch(/^data:image\/svg\+xml;/);
  });
});

describe('getRawFlagSvg', () => {
  it('retourne le SVG brut pour un NOC connu', () => {
    const svg = getRawFlagSvg('CAN');
    expect(svg).toContain('<svg');
    expect(svg).toContain('CAN');
  });

  it('retourne une cha\u00eene vide pour un NOC inconnu', () => {
    expect(getRawFlagSvg('XYZ')).toBe('');
  });
});

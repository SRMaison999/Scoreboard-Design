import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * On mock le registre SVG et le module svg pour isoler les tests
 * de la présence réelle des fichiers .svg.
 */
vi.mock('@/assets/flags', () => ({
  FLAG_SVG_REGISTRY: {
    CAN: '<svg id="CAN"><rect fill="red"/></svg>',
    USA: '<svg id="USA"><rect fill="blue"/></svg>',
  },
}));

vi.mock('@/utils/svg', () => ({
  svgToDataUri: (svg: string) => `data:image/svg+xml;base64,MOCK_${svg.length}`,
}));

import { resolveFlagUrl } from '@/utils/flagUrl';

describe('resolveFlagUrl', () => {
  beforeEach(() => {
    // Réinitialiser le cache interne entre les tests
    vi.resetModules();
  });

  it('retourne un data URI pour un NOC connu sans override', async () => {
    const { resolveFlagUrl: resolve } = await import('@/utils/flagUrl');
    const result = resolve('CAN', {});
    expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  it('retourne une chaîne vide pour un NOC inconnu', () => {
    const result = resolveFlagUrl('XYZ', {});
    expect(result).toBe('');
  });

  it('priorise l\u2019override utilisateur sur le SVG embarqué', () => {
    const overrides = { 'flag-CAN': 'data:image/png;base64,USER_CUSTOM' };
    const result = resolveFlagUrl('CAN', overrides);
    expect(result).toBe('data:image/png;base64,USER_CUSTOM');
  });

  it('retourne le SVG embarqué si l\u2019override ne correspond pas au code', () => {
    const overrides = { 'flag-USA': 'data:image/png;base64,USA_CUSTOM' };
    const result = resolveFlagUrl('CAN', overrides);
    expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  it('utilise le cache pour les appels répétés au même NOC', () => {
    const result1 = resolveFlagUrl('USA', {});
    const result2 = resolveFlagUrl('USA', {});
    expect(result1).toBe(result2);
    expect(result1).toMatch(/^data:image\/svg\+xml;base64,/);
  });
});

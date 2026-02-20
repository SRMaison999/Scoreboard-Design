import { describe, it, expect } from 'vitest';
import { FLAG_SVG_REGISTRY } from '@/assets/flags';
import { svgToDataUri } from '@/utils/svg';
import { resolveFlagUrl, getRawFlagSvg } from '@/utils/flagUrl';

describe('Flag chain debug (sans mock)', () => {
  it('FLAG_SVG_REGISTRY contient des entr\u00e9es', () => {
    const keys = Object.keys(FLAG_SVG_REGISTRY);
    expect(keys.length).toBeGreaterThan(0);
  });

  it('SVK est une cha\u00eene non vide', () => {
    const svk = FLAG_SVG_REGISTRY['SVK'] ?? '';
    expect(svk).toBeTruthy();
    expect(typeof svk).toBe('string');
    expect(svk.length).toBeGreaterThan(10);
  });

  it('svgToDataUri convertit SVK en data URI', () => {
    const svk = FLAG_SVG_REGISTRY['SVK'] ?? '';
    const uri = svgToDataUri(svk);
    expect(uri).toMatch(/^data:image\/svg\+xml;charset=utf-8,/);
  });

  it('resolveFlagUrl retourne un data URI pour SVK', () => {
    const result = resolveFlagUrl('SVK', {});
    expect(result).toMatch(/^data:image\/svg\+xml;charset=utf-8,/);
  });

  it('getRawFlagSvg retourne le SVG brut pour FIN', () => {
    const raw = getRawFlagSvg('FIN');
    expect(raw).toContain('<svg');
    expect(raw.length).toBeGreaterThan(50);
  });
});

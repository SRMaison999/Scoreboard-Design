import { describe, it, expect } from 'vitest';
import { svgToDataUri } from '@/utils/svg';

describe('svgToDataUri', () => {
  it('convertit un SVG valide en data URI encod\u00e9e', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect fill="#f00" width="3" height="2"/></svg>';
    const result = svgToDataUri(svg);
    expect(result).toMatch(/^data:image\/svg\+xml;charset=utf-8,/);
  });

  it('retourne une chaine vide pour une entree vide', () => {
    expect(svgToDataUri('')).toBe('');
  });

  it('gere les caracteres speciaux et accents', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"><text>Fran\u00e7ais \u00e9l\u00e8ve</text></svg>';
    const result = svgToDataUri(svg);
    expect(result).toMatch(/^data:image\/svg\+xml;charset=utf-8,/);
    expect(result.length).toBeGreaterThan(30);
  });

  it('produit un URI d\u00e9codable en SVG original', () => {
    const svg = '<svg viewBox="0 0 1 1"><rect fill="blue" width="1" height="1"/></svg>';
    const result = svgToDataUri(svg);
    const encoded = result.replace('data:image/svg+xml;charset=utf-8,', '');
    const decoded = decodeURIComponent(encoded);
    expect(decoded).toBe(svg);
  });
});

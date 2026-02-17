import { describe, it, expect } from 'vitest';
import { svgToDataUri } from '@/utils/svg';

describe('svgToDataUri', () => {
  it('convertit un SVG valide en data URI base64', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect fill="#f00" width="3" height="2"/></svg>';
    const result = svgToDataUri(svg);
    expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  it('retourne une chaine vide pour une entree vide', () => {
    expect(svgToDataUri('')).toBe('');
  });

  it('gere les caracteres speciaux et accents', () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"><text>Fran\u00e7ais \u00e9l\u00e8ve</text></svg>';
    const result = svgToDataUri(svg);
    expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    expect(result.length).toBeGreaterThan(30);
  });

  it('produit un base64 decodable en SVG original', () => {
    const svg = '<svg viewBox="0 0 1 1"><rect fill="blue" width="1" height="1"/></svg>';
    const result = svgToDataUri(svg);
    const base64 = result.replace('data:image/svg+xml;base64,', '');
    const decoded = decodeURIComponent(escape(atob(base64)));
    expect(decoded).toBe(svg);
  });
});

import { describe, it, expect } from 'vitest';
import { ff, scaleFontSize } from '@/utils/font';

describe('ff', () => {
  it('retourne la font-family pour oswald', () => {
    expect(ff('oswald')).toBe("'Oswald', sans-serif");
  });

  it('retourne la font-family pour barlow', () => {
    expect(ff('barlow')).toBe("'Barlow Condensed', sans-serif");
  });

  it('retourne la font-family pour orbitron', () => {
    expect(ff('orbitron')).toBe("'Orbitron', sans-serif");
  });

  it('retourne la font-family pour montserrat', () => {
    expect(ff('montserrat')).toBe("'Montserrat', sans-serif");
  });

  it('retourne la font-family pour jetbrains-mono', () => {
    expect(ff('jetbrains-mono')).toBe("'JetBrains Mono', monospace");
  });

  it('retourne la font-family pour playfair', () => {
    expect(ff('playfair')).toBe("'Playfair Display', serif");
  });
});

describe('scaleFontSize', () => {
  it('retourne la base inchangée à 100%', () => {
    expect(scaleFontSize(30, 100)).toBe(30);
  });

  it('double la taille à 200%', () => {
    expect(scaleFontSize(30, 200)).toBe(60);
  });

  it('divise par deux à 50%', () => {
    expect(scaleFontSize(30, 50)).toBe(15);
  });

  it('arrondit correctement les résultats non entiers', () => {
    expect(scaleFontSize(33, 75)).toBe(25);
    expect(scaleFontSize(10, 33)).toBe(3);
  });

  it('retourne 0 pour une base de 0', () => {
    expect(scaleFontSize(0, 150)).toBe(0);
  });

  it('retourne 0 pour un scale de 0%', () => {
    expect(scaleFontSize(30, 0)).toBe(0);
  });
});

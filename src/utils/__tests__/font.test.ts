import { describe, it, expect } from 'vitest';
import { ff } from '@/utils/font';

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
});

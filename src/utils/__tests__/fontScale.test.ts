import { describe, it, expect } from 'vitest';
import { DEFAULT_FONT_SIZES } from '@/types/fontSizes';
import {
  bodyTitleFs,
  bodyValueFs,
  bodyLabelFs,
  computeStatGap,
  computeLabelColumnWidth,
  computeFlagDimensions,
} from '@/utils/fontScale';
import type { FontSizeConfig } from '@/types/fontSizes';

function makeFontSizes(overrides: Partial<FontSizeConfig> = {}): FontSizeConfig {
  return { ...DEFAULT_FONT_SIZES, ...overrides };
}

describe('bodyTitleFs', () => {
  it('retourne elementDefault quand title est a sa valeur par defaut', () => {
    const fs = makeFontSizes({ title: 30 });
    expect(bodyTitleFs(fs, 72)).toBe(72);
  });

  it('augmente proportionnellement quand title augmente', () => {
    const fs = makeFontSizes({ title: 45 });
    expect(bodyTitleFs(fs, 72)).toBe(108);
  });

  it('reduit proportionnellement quand title diminue', () => {
    const fs = makeFontSizes({ title: 16 });
    expect(bodyTitleFs(fs, 72)).toBe(38);
  });

  it('ne descend pas en dessous de 10', () => {
    const fs = makeFontSizes({ title: 16 });
    expect(bodyTitleFs(fs, 12)).toBeGreaterThanOrEqual(10);
  });
});

describe('bodyValueFs', () => {
  it('retourne elementDefault quand statValue est 0 (auto)', () => {
    const fs = makeFontSizes({ statValue: 0 });
    expect(bodyValueFs(fs, 40)).toBe(40);
  });

  it('retourne elementDefault quand statValue est a la reference (60)', () => {
    const fs = makeFontSizes({ statValue: 60 });
    expect(bodyValueFs(fs, 40)).toBe(40);
  });

  it('augmente proportionnellement quand statValue augmente', () => {
    const fs = makeFontSizes({ statValue: 120 });
    expect(bodyValueFs(fs, 40)).toBe(80);
  });

  it('reduit proportionnellement quand statValue diminue', () => {
    const fs = makeFontSizes({ statValue: 30 });
    expect(bodyValueFs(fs, 40)).toBe(20);
  });

  it('ne descend pas en dessous de 10', () => {
    const fs = makeFontSizes({ statValue: 2 });
    expect(bodyValueFs(fs, 10)).toBeGreaterThanOrEqual(10);
  });
});

describe('bodyLabelFs', () => {
  it('retourne elementDefault quand statLabel est 0 (auto)', () => {
    const fs = makeFontSizes({ statLabel: 0 });
    expect(bodyLabelFs(fs, 16)).toBe(16);
  });

  it('retourne elementDefault quand statLabel est a la reference (30)', () => {
    const fs = makeFontSizes({ statLabel: 30 });
    expect(bodyLabelFs(fs, 16)).toBe(16);
  });

  it('augmente proportionnellement quand statLabel augmente', () => {
    const fs = makeFontSizes({ statLabel: 60 });
    expect(bodyLabelFs(fs, 16)).toBe(32);
  });

  it('ne descend pas en dessous de 10', () => {
    const fs = makeFontSizes({ statLabel: 1 });
    expect(bodyLabelFs(fs, 10)).toBeGreaterThanOrEqual(10);
  });
});

describe('computeStatGap', () => {
  it('retourne environ 40 aux tailles par defaut (108, 32)', () => {
    const gap = computeStatGap(108, 32);
    expect(gap).toBe(40);
  });

  it('augmente le gap avec des polices plus grandes', () => {
    const gap = computeStatGap(120, 32);
    expect(gap).toBeGreaterThan(40);
  });

  it('respecte le gap minimum', () => {
    const gap = computeStatGap(30, 10, 20);
    expect(gap).toBeGreaterThanOrEqual(20);
  });

  it('augmente le gap quand les labels sont tres grands', () => {
    const gap = computeStatGap(48, 60);
    expect(gap).toBeGreaterThan(computeStatGap(48, 20));
  });
});

describe('computeLabelColumnWidth', () => {
  it('retourne la base sans penalites aux tailles par defaut', () => {
    expect(computeLabelColumnWidth(32, false)).toBe(300);
  });

  it('retourne la base avec penalites aux tailles par defaut', () => {
    expect(computeLabelColumnWidth(32, true)).toBe(240);
  });

  it('elargit la colonne avec des labels plus grands', () => {
    expect(computeLabelColumnWidth(60, false)).toBeGreaterThan(300);
  });

  it('elargit la colonne avec penalites et grands labels', () => {
    expect(computeLabelColumnWidth(50, true)).toBeGreaterThan(240);
  });
});

describe('computeFlagDimensions', () => {
  it('produit un drapeau proportionnel a la taille de police', () => {
    const { w, h } = computeFlagDimensions(80);
    expect(h).toBe(56);
    expect(w).toBe(84);
  });

  it('scale lineairement avec la taille de police', () => {
    const small = computeFlagDimensions(40);
    const big = computeFlagDimensions(120);
    expect(big.h).toBeGreaterThan(small.h);
    expect(big.w).toBeGreaterThan(small.w);
    expect(big.h).toBe(84);
    expect(small.h).toBe(28);
  });

  it('ne descend pas en dessous de h=10', () => {
    const { h } = computeFlagDimensions(5);
    expect(h).toBeGreaterThanOrEqual(10);
  });

  it('maintient le ratio 3:2 (largeur = hauteur * 1.5)', () => {
    const { w, h } = computeFlagDimensions(100);
    expect(w).toBe(Math.round(h * 1.5));
  });
});

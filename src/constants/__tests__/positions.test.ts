import { describe, it, expect } from 'vitest';
import {
  POSITION_LABELS,
  POSITION_OPTIONS,
  POSITION_OPTIONS_WITH_EMPTY,
  FRENCH_POSITION_ALIASES,
} from '@/constants/positions';

describe('POSITION_LABELS', () => {
  it('contient un label pour les 6 positions', () => {
    expect(Object.keys(POSITION_LABELS)).toHaveLength(6);
    expect(POSITION_LABELS.G).toBe('Gardien');
    expect(POSITION_LABELS.D).toBe('Défenseur');
    expect(POSITION_LABELS.C).toBe('Centre');
    expect(POSITION_LABELS.F).toBe('Attaquant');
    expect(POSITION_LABELS.LW).toBe('Ailier gauche');
    expect(POSITION_LABELS.RW).toBe('Ailier droit');
  });

  it('contient des accents corrects', () => {
    expect(POSITION_LABELS.D).toContain('é');
  });
});

describe('POSITION_OPTIONS', () => {
  it('contient 6 options avec value et label', () => {
    expect(POSITION_OPTIONS).toHaveLength(6);
    for (const opt of POSITION_OPTIONS) {
      expect(opt.value).toBeTruthy();
      expect(opt.label).toBeTruthy();
    }
  });

  it('utilise les labels complets en fran\u00e7ais', () => {
    const labels = POSITION_OPTIONS.map((o) => o.label);
    expect(labels).toContain('Gardien');
    expect(labels).toContain('Ailier gauche');
    expect(labels).toContain('Ailier droit');
  });
});

describe('POSITION_OPTIONS_WITH_EMPTY', () => {
  it('commence par une option vide', () => {
    const first = POSITION_OPTIONS_WITH_EMPTY[0];
    expect(first).toBeDefined();
    expect(first!.value).toBe('');
    expect(first!.label).toBe('-');
  });

  it('contient 7 options au total', () => {
    expect(POSITION_OPTIONS_WITH_EMPTY).toHaveLength(7);
  });
});

describe('FRENCH_POSITION_ALIASES', () => {
  it('mappe les mots fran\u00e7ais complets vers les codes internes', () => {
    expect(FRENCH_POSITION_ALIASES.GARDIEN).toBe('G');
    expect(FRENCH_POSITION_ALIASES['D\u00c9FENSEUR']).toBe('D');
    expect(FRENCH_POSITION_ALIASES.DEFENSEUR).toBe('D');
    expect(FRENCH_POSITION_ALIASES.CENTRE).toBe('C');
    expect(FRENCH_POSITION_ALIASES.ATTAQUANT).toBe('F');
    expect(FRENCH_POSITION_ALIASES['AILIER GAUCHE']).toBe('LW');
    expect(FRENCH_POSITION_ALIASES['AILIER DROIT']).toBe('RW');
  });

  it('mappe les anciennes abr\u00e9viations fran\u00e7aises', () => {
    expect(FRENCH_POSITION_ALIASES.AG).toBe('LW');
    expect(FRENCH_POSITION_ALIASES.AD).toBe('RW');
    expect(FRENCH_POSITION_ALIASES.A).toBe('F');
  });
});

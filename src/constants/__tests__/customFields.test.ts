import { describe, it, expect } from 'vitest';
import {
  LIBRARY_CATEGORY_LABELS,
  CUSTOM_FIELD_LABELS,
  LIBRARY_ELEMENTS,
} from '@/constants/customFields';
import type { LibraryCategory } from '@/types/customField';

describe('customFields constantes', () => {
  describe('LIBRARY_CATEGORY_LABELS', () => {
    it('contient un label pour chaque catégorie', () => {
      const categories: LibraryCategory[] = ['match', 'text', 'data', 'players', 'media', 'composed'];
      for (const cat of categories) {
        expect(LIBRARY_CATEGORY_LABELS[cat]).toBeTruthy();
        expect(typeof LIBRARY_CATEGORY_LABELS[cat]).toBe('string');
      }
    });
  });

  describe('CUSTOM_FIELD_LABELS', () => {
    it('contient les labels de section principaux', () => {
      expect(CUSTOM_FIELD_LABELS.sectionCustomFields).toBeTruthy();
      expect(CUSTOM_FIELD_LABELS.libraryTitle).toBeTruthy();
      expect(CUSTOM_FIELD_LABELS.layersTitle).toBeTruthy();
      expect(CUSTOM_FIELD_LABELS.fieldProperties).toBeTruthy();
    });

    it('contient les labels de configuration de champ', () => {
      expect(CUSTOM_FIELD_LABELS.fieldLabel).toBeTruthy();
      expect(CUSTOM_FIELD_LABELS.fieldX).toBeTruthy();
      expect(CUSTOM_FIELD_LABELS.fieldY).toBeTruthy();
      expect(CUSTOM_FIELD_LABELS.fieldWidth).toBeTruthy();
      expect(CUSTOM_FIELD_LABELS.fieldHeight).toBeTruthy();
    });

    it('ne contient aucun label vide', () => {
      for (const [key, value] of Object.entries(CUSTOM_FIELD_LABELS)) {
        expect(value, `Label "${key}" ne doit pas être vide`).toBeTruthy();
      }
    });
  });

  describe('LIBRARY_ELEMENTS', () => {
    it('contient au moins un élément', () => {
      expect(LIBRARY_ELEMENTS.length).toBeGreaterThan(0);
    });

    it('chaque élément a toutes les propriétés requises', () => {
      for (const el of LIBRARY_ELEMENTS) {
        expect(el.type).toBeTruthy();
        expect(el.label).toBeTruthy();
        expect(el.category).toBeTruthy();
        expect(el.defaultWidth).toBeGreaterThan(0);
        expect(el.defaultHeight).toBeGreaterThan(0);
        expect(el.minWidth).toBeGreaterThan(0);
        expect(el.minHeight).toBeGreaterThan(0);
        expect(el.icon).toBeTruthy();
      }
    });

    it('les dimensions minimales sont inférieures ou égales aux dimensions par défaut', () => {
      for (const el of LIBRARY_ELEMENTS) {
        expect(el.minWidth).toBeLessThanOrEqual(el.defaultWidth);
        expect(el.minHeight).toBeLessThanOrEqual(el.defaultHeight);
      }
    });

    it('contient les 6 catégories', () => {
      const categories = new Set(LIBRARY_ELEMENTS.map((el) => el.category));
      expect(categories.size).toBe(6);
      expect(categories.has('match')).toBe(true);
      expect(categories.has('text')).toBe(true);
      expect(categories.has('data')).toBe(true);
      expect(categories.has('players')).toBe(true);
      expect(categories.has('media')).toBe(true);
      expect(categories.has('composed')).toBe(true);
    });

    it('contient les body types 1 à 13 dans les composés', () => {
      const composed = LIBRARY_ELEMENTS.filter((el) => el.category === 'composed');
      for (let i = 1; i <= 13; i++) {
        const found = composed.find((el) => el.type === `body-type-${i}`);
        expect(found, `body-type-${i} devrait être présent`).toBeTruthy();
      }
    });

    it('contient le header et la colonne de pénalités dans les composés', () => {
      const composed = LIBRARY_ELEMENTS.filter((el) => el.category === 'composed');
      expect(composed.find((el) => el.type === 'header-block')).toBeTruthy();
      expect(composed.find((el) => el.type === 'penalty-column')).toBeTruthy();
    });

    it('les types sont uniques', () => {
      const types = LIBRARY_ELEMENTS.map((el) => el.type);
      const unique = new Set(types);
      expect(unique.size).toBe(types.length);
    });
  });
});

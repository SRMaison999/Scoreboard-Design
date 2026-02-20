import { describe, it, expect } from 'vitest';
import {
  FIELD_MIN_SIZE,
  FIELD_MAX_FIELDS,
  GRID_SIZE_OPTIONS,
  DEFAULT_FIELD_STYLE,
  DEFAULT_CUSTOM_FIELDS_DATA,
} from '@/types/customField';
import type {
  FieldElementType,
  FieldElementConfig,
  CustomField,
  CustomFieldsData,
  LibraryCategory,
} from '@/types/customField';

describe('customField types et constantes', () => {
  it('FIELD_MIN_SIZE est un nombre positif', () => {
    expect(FIELD_MIN_SIZE).toBeGreaterThan(0);
    expect(typeof FIELD_MIN_SIZE).toBe('number');
  });

  it('FIELD_MAX_FIELDS est un nombre raisonnable', () => {
    expect(FIELD_MAX_FIELDS).toBeGreaterThan(0);
    expect(FIELD_MAX_FIELDS).toBeLessThanOrEqual(100);
  });

  it('GRID_SIZE_OPTIONS contient des options valides', () => {
    expect(GRID_SIZE_OPTIONS.length).toBeGreaterThan(0);
    for (const size of GRID_SIZE_OPTIONS) {
      expect(size).toBeGreaterThan(0);
    }
  });

  it('DEFAULT_FIELD_STYLE a toutes les propriétés attendues', () => {
    expect(DEFAULT_FIELD_STYLE).toHaveProperty('backgroundColor');
    expect(DEFAULT_FIELD_STYLE).toHaveProperty('backgroundOpacity');
    expect(DEFAULT_FIELD_STYLE).toHaveProperty('borderColor');
    expect(DEFAULT_FIELD_STYLE).toHaveProperty('borderWidth');
    expect(DEFAULT_FIELD_STYLE).toHaveProperty('borderRadius');
    expect(DEFAULT_FIELD_STYLE).toHaveProperty('padding');
  });

  it('DEFAULT_FIELD_STYLE a des valeurs neutres par défaut', () => {
    expect(DEFAULT_FIELD_STYLE.backgroundColor).toBe('');
    expect(DEFAULT_FIELD_STYLE.backgroundOpacity).toBe(0);
    expect(DEFAULT_FIELD_STYLE.borderWidth).toBe(0);
    expect(DEFAULT_FIELD_STYLE.padding).toBe(0);
  });

  it('DEFAULT_CUSTOM_FIELDS_DATA a toutes les propriétés attendues', () => {
    const data: CustomFieldsData = DEFAULT_CUSTOM_FIELDS_DATA;
    expect(data.fields).toEqual([]);
    expect(data.fullPageMode).toBe(false);
    expect(data.snapToGrid).toBe(true);
    expect(data.gridSize).toBe(20);
    expect(data.showGuides).toBe(true);
    expect(data.selectedFieldIds).toEqual([]);
  });

  it('FieldElementConfig union accepte un text-block', () => {
    const config: FieldElementConfig = {
      type: 'text-block',
      config: { content: 'test', fontSize: 24, fontWeight: 600, fontFamily: '', textAlign: 'center', textTransform: 'none', letterSpacing: 0 },
    };
    expect(config.type).toBe('text-block');
  });

  it('FieldElementConfig union accepte un score-display', () => {
    const config: FieldElementConfig = {
      type: 'score-display',
      config: { side: 'left', showLabel: false, fontSizeOverride: 0 },
    };
    expect(config.type).toBe('score-display');
  });

  it('CustomField interface est structurellement correcte', () => {
    const field: CustomField = {
      id: 'test-id',
      label: 'Test',
      x: 0, y: 0, width: 100, height: 80,
      zIndex: 1,
      locked: false, visible: true, lockAspectRatio: false,
      scaleContent: true, initialWidth: 100, initialHeight: 80,
      element: { type: 'text-block', config: { content: 'a', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'left', textTransform: 'none', letterSpacing: 0 } },
      style: { ...DEFAULT_FIELD_STYLE },
    };
    expect(field.id).toBe('test-id');
    expect(field.visible).toBe(true);
    expect(field.locked).toBe(false);
  });

  it('LibraryCategory accepte toutes les catégories valides', () => {
    const cats: LibraryCategory[] = ['match', 'text', 'data', 'players', 'media', 'composed'];
    expect(cats.length).toBe(6);
  });

  it('FieldElementType accepte les types atomiques et composés', () => {
    const atomicType: FieldElementType = 'text-block';
    const composedType: FieldElementType = 'body-type-1';
    const headerType: FieldElementType = 'header-block';
    expect(atomicType).toBe('text-block');
    expect(composedType).toBe('body-type-1');
    expect(headerType).toBe('header-block');
  });
});

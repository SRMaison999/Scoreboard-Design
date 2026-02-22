import { describe, it, expect } from 'vitest';
import type { FieldPreset, PresetFileFormat, PresetScope } from '@/types/fieldPreset';
import type { CustomField } from '@/types/customField';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';

describe('FieldPreset types', () => {
  it('accepte un preset de type field', () => {
    const field: CustomField = {
      id: 'field-1',
      label: 'Mon champ',
      x: 0,
      y: 0,
      width: 200,
      height: 100,
      rotation: 0,
      zIndex: 1,
      locked: false,
      visible: true,
      lockAspectRatio: false,
      scaleContent: true,
      initialWidth: 200,
      initialHeight: 100,
      element: { type: 'text-block', config: { content: 'Test', fontSize: 24, fontWeight: 600, fontFamily: '', textAlign: 'center', textTransform: 'none', letterSpacing: 0, textColor: '#ffffff' } },
      style: DEFAULT_FIELD_STYLE,
    };
    const preset: FieldPreset = {
      id: 'preset-1',
      name: 'Mon preset',
      scope: 'field',
      created: '2026-01-01T00:00:00.000Z',
      modified: '2026-01-01T00:00:00.000Z',
      field,
    };
    expect(preset.scope).toBe('field');
    expect(preset.field).toBeDefined();
    expect(preset.layout).toBeUndefined();
  });

  it('accepte un preset de type layout', () => {
    const preset: FieldPreset = {
      id: 'preset-2',
      name: 'Mon layout',
      scope: 'layout',
      created: '2026-01-01T00:00:00.000Z',
      modified: '2026-01-01T00:00:00.000Z',
      layout: {
        fields: [],
        fullPageMode: false,
        snapToGrid: true,
        gridSize: 20,
        showGuides: true,
        selectedFieldIds: [],
        zoneSelectionActive: false,
      },
    };
    expect(preset.scope).toBe('layout');
    expect(preset.layout).toBeDefined();
    expect(preset.field).toBeUndefined();
  });

  it('accepte les deux valeurs de PresetScope', () => {
    const scopes: PresetScope[] = ['field', 'layout'];
    expect(scopes).toHaveLength(2);
  });

  it('PresetFileFormat contient version et scope', () => {
    const file: PresetFileFormat = {
      version: '1.0',
      name: 'Export',
      scope: 'layout',
      created: '2026-01-01T00:00:00.000Z',
      modified: '2026-01-01T00:00:00.000Z',
      layout: {
        fields: [],
        fullPageMode: false,
        snapToGrid: true,
        gridSize: 20,
        showGuides: true,
        selectedFieldIds: [],
        zoneSelectionActive: false,
      },
    };
    expect(file.version).toBe('1.0');
    expect(file.scope).toBe('layout');
  });
});

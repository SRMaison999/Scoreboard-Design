import { describe, it, expect, beforeEach } from 'vitest';
import { usePresetStore } from '@/stores/presetStore';
import { db } from '@/api/db';
import { DEFAULT_FIELD_STYLE, DEFAULT_CUSTOM_FIELDS_DATA } from '@/types/customField';
import type { CustomField, CustomFieldsData } from '@/types/customField';

const MOCK_FIELD: CustomField = {
  id: 'field-test-1',
  label: 'Champ test',
  x: 100,
  y: 50,
  width: 200,
  height: 100,
  zIndex: 1,
  locked: false,
  visible: true,
  element: {
    type: 'text-block',
    config: { content: 'Test', fontSize: 24, fontWeight: 600, textAlign: 'center', textTransform: 'none', letterSpacing: 0 },
  },
  style: DEFAULT_FIELD_STYLE,
};

const MOCK_LAYOUT: CustomFieldsData = {
  ...DEFAULT_CUSTOM_FIELDS_DATA,
  fields: [MOCK_FIELD],
};

describe('presetStore', () => {
  beforeEach(async () => {
    await db.fieldPresets.clear();
    usePresetStore.setState({ presets: [], loading: false });
  });

  it('sauvegarde un preset de champ et le retrouve', async () => {
    const store = usePresetStore.getState();
    await store.saveFieldPreset('Mon champ', MOCK_FIELD);
    const { presets } = usePresetStore.getState();
    expect(presets).toHaveLength(1);
    expect(presets[0]!.name).toBe('Mon champ');
    expect(presets[0]!.scope).toBe('field');
    expect(presets[0]!.field?.element.type).toBe('text-block');
  });

  it('sauvegarde un preset de layout et le retrouve', async () => {
    const store = usePresetStore.getState();
    await store.saveLayoutPreset('Mon layout', MOCK_LAYOUT);
    const { presets } = usePresetStore.getState();
    expect(presets).toHaveLength(1);
    expect(presets[0]!.name).toBe('Mon layout');
    expect(presets[0]!.scope).toBe('layout');
    expect(presets[0]!.layout?.fields).toHaveLength(1);
    expect(presets[0]!.layout?.selectedFieldId).toBeNull();
  });

  it('supprime un preset', async () => {
    const store = usePresetStore.getState();
    const saved = await store.saveFieldPreset('A supprimer', MOCK_FIELD);
    expect(usePresetStore.getState().presets).toHaveLength(1);
    await store.deletePreset(saved.id);
    expect(usePresetStore.getState().presets).toHaveLength(0);
  });

  it('renomme un preset', async () => {
    const store = usePresetStore.getState();
    const saved = await store.saveFieldPreset('Ancien nom', MOCK_FIELD);
    await store.renamePreset(saved.id, 'Nouveau nom');
    const { presets } = usePresetStore.getState();
    expect(presets[0]!.name).toBe('Nouveau nom');
  });

  it('importe un preset de champ depuis un fichier JSON', async () => {
    const store = usePresetStore.getState();
    const content = JSON.stringify({
      version: '1.0',
      name: 'Import\u00e9',
      scope: 'field',
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      field: MOCK_FIELD,
    });
    const file = new File([content], 'test.preset.json', { type: 'application/json' });
    await store.importPreset(file);
    const { presets } = usePresetStore.getState();
    expect(presets).toHaveLength(1);
    expect(presets[0]!.name).toBe('Import\u00e9');
    expect(presets[0]!.scope).toBe('field');
  });

  it('rejette un fichier avec un format invalide', async () => {
    const store = usePresetStore.getState();
    const file = new File(['not json'], 'bad.json', { type: 'application/json' });
    await expect(store.importPreset(file)).rejects.toThrow();
  });

  it('rejette un fichier sans scope valide', async () => {
    const store = usePresetStore.getState();
    const content = JSON.stringify({ name: 'Bad', scope: 'invalid' });
    const file = new File([content], 'bad.preset.json', { type: 'application/json' });
    await expect(store.importPreset(file)).rejects.toThrow();
  });

  it('charge la liste depuis IndexedDB', async () => {
    const store = usePresetStore.getState();
    await store.saveFieldPreset('Un', MOCK_FIELD);
    await store.saveLayoutPreset('Deux', MOCK_LAYOUT);
    usePresetStore.setState({ presets: [] });
    await usePresetStore.getState().fetchPresets();
    expect(usePresetStore.getState().presets).toHaveLength(2);
  });
});

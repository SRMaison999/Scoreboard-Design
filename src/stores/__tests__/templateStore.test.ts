import { describe, it, expect, beforeEach } from 'vitest';
import { useTemplateStore } from '@/stores/templateStore';
import { db } from '@/api/db';
import { DEFAULT_STATE } from '@/data/defaultState';

describe('templateStore', () => {
  beforeEach(async () => {
    await db.templates.clear();
    useTemplateStore.setState({ templates: [], loading: false });
  });

  it('sauvegarde un template et le retrouve dans la liste', async () => {
    const store = useTemplateStore.getState();
    await store.saveTemplate('Test Template', DEFAULT_STATE);
    const { templates } = useTemplateStore.getState();
    expect(templates).toHaveLength(1);
    expect(templates[0]!.name).toBe('Test Template');
    expect(templates[0]!.state.team1).toBe(DEFAULT_STATE.team1);
  });

  it('supprime un template', async () => {
    const store = useTemplateStore.getState();
    const saved = await store.saveTemplate('To Delete', DEFAULT_STATE);
    expect(useTemplateStore.getState().templates).toHaveLength(1);
    await store.deleteTemplate(saved.id);
    expect(useTemplateStore.getState().templates).toHaveLength(0);
  });

  it('duplique un template', async () => {
    const store = useTemplateStore.getState();
    const saved = await store.saveTemplate('Original', DEFAULT_STATE);
    await store.duplicateTemplate(saved.id);
    const { templates } = useTemplateStore.getState();
    expect(templates).toHaveLength(2);
    const copy = templates.find((t) => t.name.includes('(copie)'));
    expect(copy).toBeDefined();
  });

  it('renomme un template', async () => {
    const store = useTemplateStore.getState();
    const saved = await store.saveTemplate('Old Name', DEFAULT_STATE);
    await store.renameTemplate(saved.id, 'New Name');
    const { templates } = useTemplateStore.getState();
    expect(templates[0]!.name).toBe('New Name');
  });

  it('met à jour le state d un template', async () => {
    const store = useTemplateStore.getState();
    const saved = await store.saveTemplate('Update Me', DEFAULT_STATE);
    const modified = { ...DEFAULT_STATE, team1: 'CAN' };
    await store.updateTemplate(saved.id, modified);
    const { templates } = useTemplateStore.getState();
    expect(templates[0]!.state.team1).toBe('CAN');
  });

  it('importe un template depuis un fichier JSON', async () => {
    const store = useTemplateStore.getState();
    const fileContent = JSON.stringify({
      version: '1.0',
      name: 'Imported',
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      state: DEFAULT_STATE,
    });
    const file = new File([fileContent], 'test.scoreboard.json', { type: 'application/json' });
    await store.importTemplate(file);
    const { templates } = useTemplateStore.getState();
    expect(templates).toHaveLength(1);
    expect(templates[0]!.name).toBe('Imported');
  });

  it('rejette un fichier avec un format invalide', async () => {
    const store = useTemplateStore.getState();
    const file = new File(['not json'], 'bad.json', { type: 'application/json' });
    await expect(store.importTemplate(file)).rejects.toThrow();
  });

  it('charge la liste depuis IndexedDB', async () => {
    const store = useTemplateStore.getState();
    await store.saveTemplate('First', DEFAULT_STATE);
    await store.saveTemplate('Second', DEFAULT_STATE);
    useTemplateStore.setState({ templates: [] });
    await useTemplateStore.getState().fetchTemplates();
    expect(useTemplateStore.getState().templates).toHaveLength(2);
  });
});

import { create } from 'zustand';
import { db } from '@/api/db';
import type { ScoreboardTemplate, TemplateFileFormat } from '@/types/template';
import type { ScoreboardState } from '@/types/scoreboard';

const TEMPLATE_VERSION = '1.0';
const FILE_EXTENSION = '.scoreboard.json';

interface TemplateStore {
  templates: ScoreboardTemplate[];
  loading: boolean;

  fetchTemplates: () => Promise<void>;
  saveTemplate: (name: string, state: ScoreboardState) => Promise<ScoreboardTemplate>;
  updateTemplate: (id: string, state: ScoreboardState) => Promise<void>;
  renameTemplate: (id: string, name: string) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  duplicateTemplate: (id: string) => Promise<ScoreboardTemplate | undefined>;
  exportTemplate: (id: string) => Promise<void>;
  exportState: (name: string, state: ScoreboardState) => void;
  importTemplate: (file: File) => Promise<ScoreboardTemplate>;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function downloadJson(data: TemplateFileFormat, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith(FILE_EXTENSION) ? filename : `${filename}${FILE_EXTENSION}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function toFileFormat(name: string, state: ScoreboardState, created?: string): TemplateFileFormat {
  const now = nowIso();
  return {
    version: TEMPLATE_VERSION,
    name,
    created: created ?? now,
    modified: now,
    state: structuredClone(state),
  };
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: [],
  loading: false,

  fetchTemplates: async () => {
    set({ loading: true });
    const templates = await db.templates.orderBy('modified').reverse().toArray();
    set({ templates, loading: false });
  },

  saveTemplate: async (name, state) => {
    const now = nowIso();
    const template: ScoreboardTemplate = {
      id: generateId(),
      name,
      created: now,
      modified: now,
      state: structuredClone(state),
    };
    await db.templates.add(template);
    await get().fetchTemplates();
    return template;
  },

  updateTemplate: async (id, state) => {
    await db.templates.update(id, {
      state: structuredClone(state),
      modified: nowIso(),
    });
    await get().fetchTemplates();
  },

  renameTemplate: async (id, name) => {
    await db.templates.update(id, { name, modified: nowIso() });
    await get().fetchTemplates();
  },

  deleteTemplate: async (id) => {
    await db.templates.delete(id);
    await get().fetchTemplates();
  },

  duplicateTemplate: async (id) => {
    const original = await db.templates.get(id);
    if (!original) return undefined;
    const now = nowIso();
    const copy: ScoreboardTemplate = {
      id: generateId(),
      name: `${original.name} (copie)`,
      created: now,
      modified: now,
      state: structuredClone(original.state),
    };
    await db.templates.add(copy);
    await get().fetchTemplates();
    return copy;
  },

  exportTemplate: async (id) => {
    const template = await db.templates.get(id);
    if (!template) return;
    const data = toFileFormat(template.name, template.state, template.created);
    downloadJson(data, template.name);
  },

  exportState: (name, state) => {
    const data = toFileFormat(name, state);
    downloadJson(data, name);
  },

  importTemplate: async (file) => {
    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Format de fichier invalide');
    }
    const data = parsed as TemplateFileFormat;
    if (!data.state || !data.name) {
      throw new Error('Fichier incomplet : nom ou state manquant');
    }
    const now = nowIso();
    const template: ScoreboardTemplate = {
      id: generateId(),
      name: data.name,
      created: data.created ?? now,
      modified: now,
      state: structuredClone(data.state),
    };
    await db.templates.add(template);
    await get().fetchTemplates();
    return template;
  },
}));

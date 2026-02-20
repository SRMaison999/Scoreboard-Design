/**
 * Store Zustand pour la gestion des presets de champs personnalisés.
 * Sauvegarde/chargement de champs individuels ou de layouts complets.
 */

import { create } from 'zustand';
import { db } from '@/api/db';
import type { FieldPreset, PresetFileFormat, PresetScope } from '@/types/fieldPreset';
import type { CustomField, CustomFieldsData } from '@/types/customField';

const PRESET_VERSION = '1.0';
const FILE_EXTENSION = '.preset.json';

interface PresetStore {
  presets: FieldPreset[];
  loading: boolean;

  fetchPresets: () => Promise<void>;
  saveFieldPreset: (name: string, field: CustomField, children?: readonly CustomField[]) => Promise<FieldPreset>;
  saveLayoutPreset: (name: string, layout: CustomFieldsData) => Promise<FieldPreset>;
  renamePreset: (id: string, name: string) => Promise<void>;
  deletePreset: (id: string) => Promise<void>;
  exportPreset: (id: string) => Promise<void>;
  importPreset: (file: File) => Promise<FieldPreset>;
}

function generateId(): string {
  return `preset-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function nowIso(): string {
  return new Date().toISOString();
}

function downloadJson(data: PresetFileFormat, filename: string): void {
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

function toFileFormat(preset: FieldPreset): PresetFileFormat {
  return {
    version: PRESET_VERSION,
    name: preset.name,
    scope: preset.scope,
    created: preset.created,
    modified: preset.modified,
    field: preset.field ? structuredClone(preset.field) : undefined,
    children: preset.children ? structuredClone(preset.children) as CustomField[] : undefined,
    layout: preset.layout ? structuredClone(preset.layout) : undefined,
  };
}

function buildPreset(
  name: string,
  scope: PresetScope,
  field?: CustomField,
  layout?: CustomFieldsData,
  children?: readonly CustomField[],
): FieldPreset {
  const now = nowIso();
  return {
    id: generateId(),
    name,
    scope,
    created: now,
    modified: now,
    field: field ? structuredClone(field) : undefined,
    children: children && children.length > 0 ? structuredClone(children) as CustomField[] : undefined,
    layout: layout ? structuredClone(layout) : undefined,
  };
}

function isValidImport(data: unknown): data is PresetFileFormat {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  if (typeof obj.name !== 'string' || !obj.name) return false;
  if (obj.scope !== 'field' && obj.scope !== 'layout') return false;
  if (obj.scope === 'field' && !obj.field) return false;
  if (obj.scope === 'layout' && !obj.layout) return false;
  return true;
}

export const usePresetStore = create<PresetStore>((set, get) => ({
  presets: [],
  loading: false,

  fetchPresets: async () => {
    set({ loading: true });
    const presets = await db.fieldPresets.orderBy('modified').reverse().toArray();
    set({ presets, loading: false });
  },

  saveFieldPreset: async (name, field, children) => {
    const preset = buildPreset(name, 'field', field, undefined, children);
    await db.fieldPresets.add(preset);
    await get().fetchPresets();
    return preset;
  },

  saveLayoutPreset: async (name, layout) => {
    const cleanLayout: CustomFieldsData = {
      ...structuredClone(layout),
      selectedFieldIds: [],
    };
    const preset = buildPreset(name, 'layout', undefined, cleanLayout);
    await db.fieldPresets.add(preset);
    await get().fetchPresets();
    return preset;
  },

  renamePreset: async (id, name) => {
    await db.fieldPresets.update(id, { name, modified: nowIso() });
    await get().fetchPresets();
  },

  deletePreset: async (id) => {
    await db.fieldPresets.delete(id);
    await get().fetchPresets();
  },

  exportPreset: async (id) => {
    const preset = await db.fieldPresets.get(id);
    if (!preset) return;
    downloadJson(toFileFormat(preset), preset.name);
  },

  importPreset: async (file) => {
    const text = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
    const parsed: unknown = JSON.parse(text);
    if (!isValidImport(parsed)) {
      throw new Error('Format de preset invalide');
    }
    const now = nowIso();
    const parsedChildren = (parsed as unknown as Record<string, unknown>).children as readonly CustomField[] | undefined;
    const preset: FieldPreset = {
      id: generateId(),
      name: parsed.name,
      scope: parsed.scope,
      created: parsed.created ?? now,
      modified: now,
      field: parsed.field ? structuredClone(parsed.field) : undefined,
      children: parsedChildren && parsedChildren.length > 0
        ? structuredClone(parsedChildren) as CustomField[]
        : undefined,
      layout: parsed.layout ? structuredClone(parsed.layout) : undefined,
    };
    await db.fieldPresets.add(preset);
    await get().fetchPresets();
    return preset;
  },
}));

/**
 * Actions Zustand pour la gestion des champs personnalisés (type 14).
 * Extraites du store principal pour respecter la limite de 300 lignes.
 */

import { DEFAULT_FIELD_STYLE, FIELD_MAX_FIELDS } from '@/types/customField';
import type { ScoreboardState } from '@/types/scoreboard';
import type { FieldElementConfig, FieldStyle, CustomField } from '@/types/customField';

type Draft = ScoreboardState;

function findField(s: Draft, fieldId: string) {
  return s.customFieldsData.fields.find((f) => f.id === fieldId);
}

function generateId(): string {
  return `field-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function addCustomFieldDraft(
  s: Draft,
  element: FieldElementConfig,
  x: number,
  y: number,
  width: number,
  height: number,
  label?: string,
): void {
  if (s.customFieldsData.fields.length >= FIELD_MAX_FIELDS) return;

  const maxZ = s.customFieldsData.fields.reduce((max, f) => Math.max(max, f.zIndex), 0);
  const newField: CustomField = {
    id: generateId(),
    label: label ?? `Champ ${s.customFieldsData.fields.length + 1}`,
    x,
    y,
    width,
    height,
    zIndex: maxZ + 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: true,
    initialWidth: width,
    initialHeight: height,
    element,
    style: { ...DEFAULT_FIELD_STYLE },
  };

  s.customFieldsData.fields.push(newField);
  s.customFieldsData.selectedFieldIds = [newField.id];
}

export function removeCustomFieldDraft(s: Draft, fieldId: string): void {
  const idx = s.customFieldsData.fields.findIndex((f) => f.id === fieldId);
  if (idx === -1) return;
  s.customFieldsData.fields.splice(idx, 1);
  s.customFieldsData.selectedFieldIds = s.customFieldsData.selectedFieldIds.filter(
    (id) => id !== fieldId,
  );
}

export function updateCustomFieldPositionDraft(
  s: Draft,
  fieldId: string,
  x: number,
  y: number,
): void {
  const field = findField(s, fieldId);
  if (!field || field.locked) return;

  const cw = s.templateWidth;
  const ch = s.templateHeight;

  (field as { x: number }).x = Math.max(0, Math.min(x, cw - field.width));
  (field as { y: number }).y = Math.max(0, Math.min(y, ch - field.height));
}

export function updateCustomFieldSizeDraft(
  s: Draft,
  fieldId: string,
  width: number,
  height: number,
): void {
  const field = findField(s, fieldId);
  if (!field || field.locked) return;

  const cw = s.templateWidth;
  const ch = s.templateHeight;
  const clampedW = Math.max(40, Math.min(width, cw - field.x));
  const clampedH = Math.max(40, Math.min(height, ch - field.y));

  (field as { width: number }).width = clampedW;
  (field as { height: number }).height = clampedH;
}

export function updateCustomFieldElementDraft(
  s: Draft,
  fieldId: string,
  element: FieldElementConfig,
): void {
  const field = findField(s, fieldId);
  if (!field) return;
  (field as { element: FieldElementConfig }).element = element;
}

export function updateCustomFieldStyleDraft(
  s: Draft,
  fieldId: string,
  style: Partial<FieldStyle>,
): void {
  const field = findField(s, fieldId);
  if (!field) return;
  (field as { style: FieldStyle }).style = { ...field.style, ...style };
}

export function updateCustomFieldPropDraft(
  s: Draft,
  fieldId: string,
  key: keyof CustomField,
  value: unknown,
): void {
  const field = findField(s, fieldId);
  if (!field) return;
  (field as unknown as Record<string, unknown>)[key] = value;
}

export function duplicateCustomFieldDraft(s: Draft, fieldId: string): void {
  const field = findField(s, fieldId);
  if (!field) return;
  if (s.customFieldsData.fields.length >= FIELD_MAX_FIELDS) return;

  const maxZ = s.customFieldsData.fields.reduce((max, f) => Math.max(max, f.zIndex), 0);
  const copy: CustomField = {
    id: generateId(),
    label: `${field.label} (copie)`,
    x: Math.min(field.x + 30, s.templateWidth - field.width),
    y: Math.min(field.y + 30, s.templateHeight - field.height),
    width: field.width,
    height: field.height,
    zIndex: maxZ + 1,
    locked: field.locked,
    visible: field.visible,
    lockAspectRatio: field.lockAspectRatio,
    scaleContent: field.scaleContent,
    initialWidth: field.initialWidth,
    initialHeight: field.initialHeight,
    element: JSON.parse(JSON.stringify(field.element)) as FieldElementConfig,
    style: { ...field.style },
  };

  s.customFieldsData.fields.push(copy);
  s.customFieldsData.selectedFieldIds = [copy.id];
}

export function resetCustomFieldScaleDraft(s: Draft, fieldId: string): void {
  const field = findField(s, fieldId);
  if (!field) return;
  (field as { initialWidth: number }).initialWidth = field.width;
  (field as { initialHeight: number }).initialHeight = field.height;
}

export function reorderCustomFieldDraft(
  s: Draft,
  fieldId: string,
  newZIndex: number,
): void {
  const field = findField(s, fieldId);
  if (!field) return;
  (field as { zIndex: number }).zIndex = newZIndex;
}

export function moveSelectedFieldsDraft(
  s: Draft,
  dx: number,
  dy: number,
): void {
  const ids = s.customFieldsData.selectedFieldIds;
  const cw = s.templateWidth;
  const ch = s.templateHeight;

  for (const id of ids) {
    const field = findField(s, id);
    if (!field || field.locked) continue;
    (field as { x: number }).x = Math.max(0, Math.min(field.x + dx, cw - field.width));
    (field as { y: number }).y = Math.max(0, Math.min(field.y + dy, ch - field.height));
  }
}

export function removeSelectedFieldsDraft(s: Draft): void {
  const ids = new Set(s.customFieldsData.selectedFieldIds);
  s.customFieldsData.fields = s.customFieldsData.fields.filter((f) => !ids.has(f.id));
  s.customFieldsData.selectedFieldIds = [];
}

export function duplicateSelectedFieldsDraft(s: Draft): void {
  const ids = s.customFieldsData.selectedFieldIds;
  const fields = s.customFieldsData.fields;
  const maxZ = fields.reduce((max, f) => Math.max(max, f.zIndex), 0);
  const newIds: string[] = [];

  for (let i = 0; i < ids.length; i++) {
    const field = findField(s, ids[i]!);
    if (!field) continue;
    if (fields.length >= FIELD_MAX_FIELDS) break;

    const copy: CustomField = {
      id: generateId(),
      label: `${field.label} (copie)`,
      x: Math.min(field.x + 30, s.templateWidth - field.width),
      y: Math.min(field.y + 30, s.templateHeight - field.height),
      width: field.width,
      height: field.height,
      zIndex: maxZ + i + 1,
      locked: field.locked,
      visible: field.visible,
      lockAspectRatio: field.lockAspectRatio,
      scaleContent: field.scaleContent,
      initialWidth: field.initialWidth,
      initialHeight: field.initialHeight,
      element: JSON.parse(JSON.stringify(field.element)) as FieldElementConfig,
      style: { ...field.style },
    };

    fields.push(copy);
    newIds.push(copy.id);
  }

  s.customFieldsData.selectedFieldIds = newIds;
}

/**
 * Colle des champs depuis le presse-papiers avec un d\u00e9calage par collage successif.
 */
export function pasteFieldsDraft(
  s: Draft,
  sourceFields: readonly CustomField[],
  pasteOffset: number,
): void {
  const fields = s.customFieldsData.fields;
  const maxZ = fields.reduce((max, f) => Math.max(max, f.zIndex), 0);
  const newIds: string[] = [];
  const offset = pasteOffset * 20;

  for (let i = 0; i < sourceFields.length; i++) {
    const src = sourceFields[i];
    if (!src) continue;
    if (fields.length >= FIELD_MAX_FIELDS) break;

    const copy: CustomField = {
      id: generateId(),
      label: `${src.label} (copie)`,
      x: Math.min(src.x + offset, s.templateWidth - src.width),
      y: Math.min(src.y + offset, s.templateHeight - src.height),
      width: src.width,
      height: src.height,
      zIndex: maxZ + i + 1,
      locked: false,
      visible: src.visible,
      lockAspectRatio: src.lockAspectRatio,
      scaleContent: src.scaleContent,
      initialWidth: src.initialWidth,
      initialHeight: src.initialHeight,
      element: JSON.parse(JSON.stringify(src.element)) as FieldElementConfig,
      style: { ...src.style },
    };

    fields.push(copy);
    newIds.push(copy.id);
  }

  s.customFieldsData.selectedFieldIds = newIds;
}

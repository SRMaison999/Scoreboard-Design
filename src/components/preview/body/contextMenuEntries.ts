/**
 * Constructeurs d'entr\u00e9es pour le menu contextuel du canvas.
 * S\u00e9par\u00e9s du composant pour respecter la limite de 300 lignes.
 */

import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

/* --- Types --- */

export interface MenuItem {
  readonly label: string;
  readonly shortcut?: string;
  readonly action: () => void;
  readonly disabled?: boolean;
}

export interface MenuSeparator {
  readonly separator: true;
}

export type MenuEntry = MenuItem | MenuSeparator;

export function isSeparator(entry: MenuEntry): entry is MenuSeparator {
  return 'separator' in entry;
}

/* --- Entr\u00e9es pour le clic droit sur un champ --- */

export interface FieldMenuParams {
  readonly hasSelection: boolean;
  readonly hasCopied: boolean;
  readonly isLocked: boolean;
  readonly onCut: () => void;
  readonly onCopy: () => void;
  readonly onPaste: () => void;
  readonly onDuplicate: () => void;
  readonly onDelete: () => void;
  readonly onToggleLock: () => void;
  readonly onHide: () => void;
  readonly onBringToFront: () => void;
  readonly onSendToBack: () => void;
  readonly onBringForward: () => void;
  readonly onSendBackward: () => void;
}

export function buildFieldEntries(p: FieldMenuParams): MenuEntry[] {
  return [
    { label: CUSTOM_FIELD_LABELS.contextCut, shortcut: 'Ctrl+X', action: p.onCut, disabled: !p.hasSelection },
    { label: CUSTOM_FIELD_LABELS.contextCopy, shortcut: 'Ctrl+C', action: p.onCopy, disabled: !p.hasSelection },
    { label: CUSTOM_FIELD_LABELS.contextPaste, shortcut: 'Ctrl+V', action: p.onPaste, disabled: !p.hasCopied },
    { label: CUSTOM_FIELD_LABELS.contextDuplicate, shortcut: 'Ctrl+D', action: p.onDuplicate, disabled: !p.hasSelection },
    { label: CUSTOM_FIELD_LABELS.contextDelete, shortcut: 'Suppr', action: p.onDelete, disabled: !p.hasSelection },
    { separator: true },
    { label: p.isLocked ? CUSTOM_FIELD_LABELS.contextUnlock : CUSTOM_FIELD_LABELS.contextLock, action: p.onToggleLock },
    { label: CUSTOM_FIELD_LABELS.contextHide, action: p.onHide },
    { separator: true },
    { label: CUSTOM_FIELD_LABELS.contextBringToFront, action: p.onBringToFront },
    { label: CUSTOM_FIELD_LABELS.contextSendToBack, action: p.onSendToBack },
    { label: CUSTOM_FIELD_LABELS.contextBringForward, action: p.onBringForward },
    { label: CUSTOM_FIELD_LABELS.contextSendBackward, action: p.onSendBackward },
  ];
}

/* --- Entr\u00e9es pour le clic droit sur le fond du canvas --- */

export interface CanvasMenuParams {
  readonly hasCopied: boolean;
  readonly showGuides: boolean;
  readonly onPaste: () => void;
  readonly onSelectAll: () => void;
  readonly onToggleGrid: () => void;
}

export function buildCanvasEntries(p: CanvasMenuParams): MenuEntry[] {
  return [
    { label: CUSTOM_FIELD_LABELS.contextPaste, shortcut: 'Ctrl+V', action: p.onPaste, disabled: !p.hasCopied },
    { label: CUSTOM_FIELD_LABELS.contextSelectAll, shortcut: 'Ctrl+A', action: p.onSelectAll },
    { separator: true },
    { label: CUSTOM_FIELD_LABELS.contextToggleGrid, action: p.onToggleGrid },
  ];
}

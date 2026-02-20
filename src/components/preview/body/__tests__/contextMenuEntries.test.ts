import { describe, it, expect, vi } from 'vitest';
import {
  isSeparator,
  buildFieldEntries,
  buildCanvasEntries,
} from '../contextMenuEntries';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { MenuSeparator, MenuItem } from '../contextMenuEntries';

const noop = vi.fn();

function baseFieldParams() {
  return {
    hasSelection: true,
    hasCopied: true,
    isLocked: false,
    onCut: noop,
    onCopy: noop,
    onPaste: noop,
    onDuplicate: noop,
    onDelete: noop,
    onToggleLock: noop,
    onHide: noop,
    onBringToFront: noop,
    onSendToBack: noop,
    onBringForward: noop,
    onSendBackward: noop,
  };
}

describe('contextMenuEntries', () => {
  describe('isSeparator', () => {
    it('identifie un s\u00e9parateur', () => {
      const sep: MenuSeparator = { separator: true };
      expect(isSeparator(sep)).toBe(true);
    });

    it('identifie un item normal', () => {
      const item: MenuItem = { label: 'Test', action: noop };
      expect(isSeparator(item)).toBe(false);
    });
  });

  describe('buildFieldEntries', () => {
    it('retourne les entr\u00e9es pour un champ', () => {
      const entries = buildFieldEntries(baseFieldParams());
      const labels = entries.filter((e): e is MenuItem => !isSeparator(e)).map((e) => e.label);

      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextCut);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextCopy);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextPaste);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextDuplicate);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextDelete);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextLock);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextHide);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextBringToFront);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextSendToBack);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextBringForward);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextSendBackward);
    });

    it('contient des s\u00e9parateurs', () => {
      const entries = buildFieldEntries(baseFieldParams());
      const separators = entries.filter(isSeparator);
      expect(separators.length).toBeGreaterThanOrEqual(2);
    });

    it('d\u00e9sactive les actions quand aucune s\u00e9lection', () => {
      const entries = buildFieldEntries({ ...baseFieldParams(), hasSelection: false });
      const items = entries.filter((e): e is MenuItem => !isSeparator(e));
      const cutItem = items.find((e) => e.label === CUSTOM_FIELD_LABELS.contextCut);
      expect(cutItem?.disabled).toBe(true);
    });

    it('d\u00e9sactive Coller quand le presse-papiers est vide', () => {
      const entries = buildFieldEntries({ ...baseFieldParams(), hasCopied: false });
      const items = entries.filter((e): e is MenuItem => !isSeparator(e));
      const pasteItem = items.find((e) => e.label === CUSTOM_FIELD_LABELS.contextPaste);
      expect(pasteItem?.disabled).toBe(true);
    });

    it('affiche D\u00e9verrouiller pour un champ verrouill\u00e9', () => {
      const entries = buildFieldEntries({ ...baseFieldParams(), isLocked: true });
      const items = entries.filter((e): e is MenuItem => !isSeparator(e));
      const lockItem = items.find((e) => e.label === CUSTOM_FIELD_LABELS.contextUnlock);
      expect(lockItem).toBeDefined();
    });

    it('affiche Verrouiller pour un champ d\u00e9verrouill\u00e9', () => {
      const entries = buildFieldEntries({ ...baseFieldParams(), isLocked: false });
      const items = entries.filter((e): e is MenuItem => !isSeparator(e));
      const lockItem = items.find((e) => e.label === CUSTOM_FIELD_LABELS.contextLock);
      expect(lockItem).toBeDefined();
    });

    it('inclut les raccourcis clavier', () => {
      const entries = buildFieldEntries(baseFieldParams());
      const items = entries.filter((e): e is MenuItem => !isSeparator(e));
      const cutItem = items.find((e) => e.label === CUSTOM_FIELD_LABELS.contextCut);
      expect(cutItem?.shortcut).toBe('Ctrl+X');
    });
  });

  describe('buildCanvasEntries', () => {
    it('retourne les entr\u00e9es pour le canvas', () => {
      const entries = buildCanvasEntries({
        hasCopied: true,
        showGuides: true,
        onPaste: noop,
        onSelectAll: noop,
        onToggleGrid: noop,
      });
      const labels = entries.filter((e): e is MenuItem => !isSeparator(e)).map((e) => e.label);

      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextPaste);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextSelectAll);
      expect(labels).toContain(CUSTOM_FIELD_LABELS.contextToggleGrid);
    });

    it('d\u00e9sactive Coller quand le presse-papiers est vide', () => {
      const entries = buildCanvasEntries({
        hasCopied: false,
        showGuides: true,
        onPaste: noop,
        onSelectAll: noop,
        onToggleGrid: noop,
      });
      const items = entries.filter((e): e is MenuItem => !isSeparator(e));
      const pasteItem = items.find((e) => e.label === CUSTOM_FIELD_LABELS.contextPaste);
      expect(pasteItem?.disabled).toBe(true);
    });

    it('ne contient pas d\u2019entr\u00e9es sp\u00e9cifiques aux champs', () => {
      const entries = buildCanvasEntries({
        hasCopied: true,
        showGuides: true,
        onPaste: noop,
        onSelectAll: noop,
        onToggleGrid: noop,
      });
      const labels = entries.filter((e): e is MenuItem => !isSeparator(e)).map((e) => e.label);
      expect(labels).not.toContain(CUSTOM_FIELD_LABELS.contextCut);
      expect(labels).not.toContain(CUSTOM_FIELD_LABELS.contextCopy);
    });
  });
});

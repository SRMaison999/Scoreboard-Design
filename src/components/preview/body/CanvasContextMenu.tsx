/**
 * Menu contextuel pour le canvas du mode Layout libre.
 * Rendu en portail dans document.body pour ne pas \u00eatre affect\u00e9 par le scale du canvas.
 * Positionn\u00e9 aux coordonn\u00e9es viewport (clientX/clientY).
 */

import { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useClipboardStore } from '@/stores/clipboardStore';
import {
  isSeparator,
  buildFieldEntries,
  buildCanvasEntries,
} from './contextMenuEntries';
import type { MenuEntry } from './contextMenuEntries';
import type { CustomField } from '@/types/customField';

/* --- Types --- */

export interface ContextMenuPosition {
  readonly x: number;
  readonly y: number;
}

interface CanvasContextMenuProps {
  readonly position: ContextMenuPosition;
  readonly targetField: CustomField | null;
  readonly onClose: () => void;
}

/* --- Constantes de style --- */

const EMPTY_IDS: readonly string[] = [];
const MENU_WIDTH = 260;
const MENU_PADDING = 6;
const ITEM_HEIGHT = 36;
const SEPARATOR_HEIGHT = 9;
const VIEWPORT_MARGIN = 8;

/* --- Composant --- */

export function CanvasContextMenu({
  position,
  targetField,
  onClose,
}: CanvasContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const selectedIds = useScoreboardStore((s) => s.customFieldsData?.selectedFieldIds ?? EMPTY_IDS);
  const showGuides = useScoreboardStore((s) => s.customFieldsData.showGuides);
  const removeSelectedFields = useScoreboardStore((s) => s.removeSelectedFields);
  const duplicateSelectedFields = useScoreboardStore((s) => s.duplicateSelectedFields);
  const selectAllFields = useScoreboardStore((s) => s.selectAllFields);
  const reorderField = useScoreboardStore((s) => s.reorderCustomField);
  const updateProp = useScoreboardStore((s) => s.updateCustomFieldProp);
  const updateOption = useScoreboardStore((s) => s.updateCustomFieldsOption);
  const pasteFields = useScoreboardStore((s) => s.pasteFields);

  const copiedFields = useClipboardStore((s) => s.copiedFields);
  const copyFields = useClipboardStore((s) => s.copyFields);

  /* Fermer sur \u00c9chap */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [handleKeyDown]);

  /* Fermer au clic externe */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const id = window.setTimeout(() => {
      document.addEventListener('mousedown', handler);
    }, 0);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('mousedown', handler);
    };
  }, [onClose]);

  /* Actions du menu */
  const handleCopy = () => {
    const selected = fields.filter((f) => selectedIds.includes(f.id));
    copyFields(selected);
    onClose();
  };

  const handleCut = () => {
    const selected = fields.filter((f) => selectedIds.includes(f.id));
    copyFields(selected);
    removeSelectedFields();
    onClose();
  };

  const handlePaste = () => {
    if (copiedFields.length === 0) return;
    const clipboard = useClipboardStore.getState();
    clipboard.incrementPasteCount();
    pasteFields(clipboard.copiedFields, clipboard.pasteCount);
    onClose();
  };

  const handleDuplicate = () => { duplicateSelectedFields(); onClose(); };
  const handleDelete = () => { removeSelectedFields(); onClose(); };

  const handleToggleLock = () => {
    if (!targetField) return;
    updateProp(targetField.id, 'locked', !targetField.locked);
    onClose();
  };

  const handleHide = () => {
    if (!targetField) return;
    updateProp(targetField.id, 'visible', false);
    onClose();
  };

  const handleBringToFront = () => {
    if (!targetField) return;
    const maxZ = fields.reduce((max, f) => Math.max(max, f.zIndex), 0);
    reorderField(targetField.id, maxZ + 1);
    onClose();
  };

  const handleSendToBack = () => {
    if (!targetField) return;
    const minZ = fields.reduce((min, f) => Math.min(min, f.zIndex), Infinity);
    reorderField(targetField.id, Math.max(0, minZ - 1));
    onClose();
  };

  const handleBringForward = () => {
    if (!targetField) return;
    reorderField(targetField.id, targetField.zIndex + 1);
    onClose();
  };

  const handleSendBackward = () => {
    if (!targetField) return;
    reorderField(targetField.id, Math.max(0, targetField.zIndex - 1));
    onClose();
  };

  const handleSelectAll = () => { selectAllFields(); onClose(); };
  const handleToggleGrid = () => { updateOption('showGuides', !showGuides); onClose(); };

  const entries: MenuEntry[] = targetField
    ? buildFieldEntries({
        hasSelection: selectedIds.length > 0,
        hasCopied: copiedFields.length > 0,
        isLocked: targetField.locked,
        onCut: handleCut, onCopy: handleCopy, onPaste: handlePaste,
        onDuplicate: handleDuplicate, onDelete: handleDelete,
        onToggleLock: handleToggleLock, onHide: handleHide,
        onBringToFront: handleBringToFront, onSendToBack: handleSendToBack,
        onBringForward: handleBringForward, onSendBackward: handleSendBackward,
      })
    : buildCanvasEntries({
        hasCopied: copiedFields.length > 0, showGuides,
        onPaste: handlePaste, onSelectAll: handleSelectAll, onToggleGrid: handleToggleGrid,
      });

  /* Clamper la position pour rester dans le viewport */
  const menuHeight = entries.reduce((h, e) =>
    h + (isSeparator(e) ? SEPARATOR_HEIGHT : ITEM_HEIGHT), MENU_PADDING * 2);
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 1080;
  const clampedX = Math.min(position.x, vw - MENU_WIDTH - VIEWPORT_MARGIN);
  const clampedY = Math.min(position.y, vh - menuHeight - VIEWPORT_MARGIN);

  const menu = (
    <div
      ref={menuRef}
      data-testid="canvas-context-menu"
      style={{
        position: 'fixed',
        left: Math.max(VIEWPORT_MARGIN, clampedX),
        top: Math.max(VIEWPORT_MARGIN, clampedY),
        width: MENU_WIDTH,
        backgroundColor: 'rgba(30, 30, 36, 0.98)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 10,
        padding: MENU_PADDING,
        zIndex: 99999,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
      }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {entries.map((entry, i) =>
        isSeparator(entry) ? (
          <div
            key={`sep-${i}`}
            style={{ height: 1, margin: '4px 10px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          />
        ) : (
          <MenuItemRow key={entry.label} label={entry.label} shortcut={entry.shortcut} disabled={entry.disabled} onClick={entry.action} />
        ),
      )}
    </div>
  );

  return createPortal(menu, document.body);
}

/* --- Sous-composant item --- */

function MenuItemRow({ label, shortcut, disabled, onClick }: {
  readonly label: string;
  readonly shortcut?: string;
  readonly disabled?: boolean;
  readonly onClick: () => void;
}) {
  return (
    <div
      data-testid={`context-menu-item-${label}`}
      role="menuitem"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: ITEM_HEIGHT,
        padding: '0 14px',
        borderRadius: 6,
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.92)',
        fontSize: 14,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
      }}
    >
      <span>{label}</span>
      {shortcut && (
        <span style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.45)', marginLeft: 20 }}>
          {shortcut}
        </span>
      )}
    </div>
  );
}

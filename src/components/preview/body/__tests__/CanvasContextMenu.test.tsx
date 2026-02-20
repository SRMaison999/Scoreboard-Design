import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CanvasContextMenu } from '../CanvasContextMenu';
import { useClipboardStore } from '@/stores/clipboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';
import type { CustomField, FieldElementConfig } from '@/types/customField';

function makeField(id: string, overrides?: Partial<CustomField>): CustomField {
  const element: FieldElementConfig = {
    type: 'text-block',
    config: {
      content: 'test',
      fontSize: 20,
      fontWeight: 400,
      fontFamily: '',
      textAlign: 'center',
      textTransform: 'none',
      letterSpacing: 0,
    },
  };
  return {
    id,
    label: `Champ ${id}`,
    x: 100,
    y: 200,
    width: 200,
    height: 80,
    rotation: 0,
    zIndex: 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: true,
    initialWidth: 200,
    initialHeight: 80,
    element,
    style: { ...DEFAULT_FIELD_STYLE },
    ...overrides,
  } as CustomField;
}

/* Mock du store scoreboard */
const mockRemoveSelectedFields = vi.fn();
const mockDuplicateSelectedFields = vi.fn();
const mockSelectAllFields = vi.fn();
const mockReorderCustomField = vi.fn();
const mockUpdateCustomFieldProp = vi.fn();
const mockUpdateCustomFieldsOption = vi.fn();
const mockPasteFields = vi.fn();
const mockSelectCustomField = vi.fn();

vi.mock('@/stores/scoreboardStore', () => ({
  useScoreboardStore: (selector: (s: Record<string, unknown>) => unknown) =>
    selector({
      customFieldsData: {
        fields: [makeField('f1'), makeField('f2', { zIndex: 2 })],
        selectedFieldIds: ['f1'],
        showGuides: true,
      },
      removeSelectedFields: mockRemoveSelectedFields,
      duplicateSelectedFields: mockDuplicateSelectedFields,
      selectAllFields: mockSelectAllFields,
      reorderCustomField: mockReorderCustomField,
      updateCustomFieldProp: mockUpdateCustomFieldProp,
      updateCustomFieldsOption: mockUpdateCustomFieldsOption,
      pasteFields: mockPasteFields,
      selectCustomField: mockSelectCustomField,
    }),
}));

describe('CanvasContextMenu', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useClipboardStore.setState({ copiedFields: [], pasteCount: 0 });
  });

  it('affiche le menu contextuel avec data-testid', () => {
    render(
      <CanvasContextMenu
        position={{ x: 100, y: 100 }}
        targetField={makeField('f1')}
        canvasWidth={1920}
        canvasHeight={1080}
        onClose={onClose}
      />,
    );
    expect(screen.getByTestId('canvas-context-menu')).toBeInTheDocument();
  });

  it('affiche les entr\u00e9es du menu pour un champ', () => {
    render(
      <CanvasContextMenu
        position={{ x: 100, y: 100 }}
        targetField={makeField('f1')}
        canvasWidth={1920}
        canvasHeight={1080}
        onClose={onClose}
      />,
    );
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextCut)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextCopy)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextPaste)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextDuplicate)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextDelete)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextLock)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextHide)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextBringToFront)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextSendToBack)).toBeInTheDocument();
  });

  it('affiche D\u00e9verrouiller pour un champ verrouill\u00e9', () => {
    render(
      <CanvasContextMenu
        position={{ x: 100, y: 100 }}
        targetField={makeField('f1', { locked: true })}
        canvasWidth={1920}
        canvasHeight={1080}
        onClose={onClose}
      />,
    );
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextUnlock)).toBeInTheDocument();
  });

  it('affiche les entr\u00e9es du menu pour le canvas vide', () => {
    render(
      <CanvasContextMenu
        position={{ x: 100, y: 100 }}
        targetField={null}
        canvasWidth={1920}
        canvasHeight={1080}
        onClose={onClose}
      />,
    );
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextPaste)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextSelectAll)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.contextToggleGrid)).toBeInTheDocument();
    /* Les entr\u00e9es sp\u00e9cifiques aux champs ne doivent pas \u00eatre visibles */
    expect(screen.queryByText(CUSTOM_FIELD_LABELS.contextCut)).not.toBeInTheDocument();
  });

  it('affiche les raccourcis clavier', () => {
    render(
      <CanvasContextMenu
        position={{ x: 100, y: 100 }}
        targetField={makeField('f1')}
        canvasWidth={1920}
        canvasHeight={1080}
        onClose={onClose}
      />,
    );
    expect(screen.getByText('Ctrl+X')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+C')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+V')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+D')).toBeInTheDocument();
    expect(screen.getByText('Suppr')).toBeInTheDocument();
  });

  it('appelle onClose au clic sur Supprimer', () => {
    render(
      <CanvasContextMenu
        position={{ x: 100, y: 100 }}
        targetField={makeField('f1')}
        canvasWidth={1920}
        canvasHeight={1080}
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getByText(CUSTOM_FIELD_LABELS.contextDelete));
    expect(mockRemoveSelectedFields).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('appelle onClose au clic sur Dupliquer', () => {
    render(
      <CanvasContextMenu
        position={{ x: 100, y: 100 }}
        targetField={makeField('f1')}
        canvasWidth={1920}
        canvasHeight={1080}
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getByText(CUSTOM_FIELD_LABELS.contextDuplicate));
    expect(mockDuplicateSelectedFields).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('appelle selectAllFields au clic sur Tout s\u00e9lectionner', () => {
    render(
      <CanvasContextMenu
        position={{ x: 100, y: 100 }}
        targetField={null}
        canvasWidth={1920}
        canvasHeight={1080}
        onClose={onClose}
      />,
    );
    fireEvent.click(screen.getByText(CUSTOM_FIELD_LABELS.contextSelectAll));
    expect(mockSelectAllFields).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('ferme le menu sur \u00c9chap', () => {
    render(
      <CanvasContextMenu
        position={{ x: 100, y: 100 }}
        targetField={makeField('f1')}
        canvasWidth={1920}
        canvasHeight={1080}
        onClose={onClose}
      />,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('clampe la position du menu dans le canvas', () => {
    render(
      <CanvasContextMenu
        position={{ x: 1900, y: 1050 }}
        targetField={null}
        canvasWidth={1920}
        canvasHeight={1080}
        onClose={onClose}
      />,
    );
    const menu = screen.getByTestId('canvas-context-menu');
    const left = parseInt(menu.style.left, 10);
    const top = parseInt(menu.style.top, 10);
    /* Le menu doit \u00eatre d\u00e9cal\u00e9 pour rester dans les limites */
    expect(left).toBeLessThanOrEqual(1920);
    expect(top).toBeLessThanOrEqual(1080);
  });
});

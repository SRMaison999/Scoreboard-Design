import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { KeyboardShortcutsModal } from '../KeyboardShortcutsModal';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

describe('KeyboardShortcutsModal', () => {
  it('affiche le titre de la modale quand ouverte', () => {
    render(<KeyboardShortcutsModal isOpen onClose={() => {}} />);
    expect(
      screen.getByText(CUSTOM_FIELD_LABELS.shortcutsTitle),
    ).toBeInTheDocument();
  });

  it('ne rend rien quand isOpen est false', () => {
    render(<KeyboardShortcutsModal isOpen={false} onClose={() => {}} />);
    expect(
      screen.queryByText(CUSTOM_FIELD_LABELS.shortcutsTitle),
    ).not.toBeInTheDocument();
  });

  it('affiche le data-testid correct', () => {
    render(<KeyboardShortcutsModal isOpen onClose={() => {}} />);
    expect(screen.getByTestId('keyboard-shortcuts-modal')).toBeInTheDocument();
  });

  it('affiche les cinq sections de raccourcis', () => {
    render(<KeyboardShortcutsModal isOpen onClose={() => {}} />);
    expect(
      screen.getByText(CUSTOM_FIELD_LABELS.shortcutsSectionGeneral),
    ).toBeInTheDocument();
    expect(
      screen.getByText(CUSTOM_FIELD_LABELS.shortcutsSectionSelection),
    ).toBeInTheDocument();
    expect(
      screen.getByText(CUSTOM_FIELD_LABELS.shortcutsSectionClipboard),
    ).toBeInTheDocument();
    expect(
      screen.getByText(CUSTOM_FIELD_LABELS.shortcutsSectionFields),
    ).toBeInTheDocument();
    expect(
      screen.getByText(CUSTOM_FIELD_LABELS.shortcutsSectionZoom),
    ).toBeInTheDocument();
  });

  it('affiche les raccourcis de la section G\u00e9n\u00e9ral', () => {
    render(<KeyboardShortcutsModal isOpen onClose={() => {}} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutUndo)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutRedo)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutSave)).toBeInTheDocument();
  });

  it('affiche les raccourcis de la section S\u00e9lection', () => {
    render(<KeyboardShortcutsModal isOpen onClose={() => {}} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutSelectAll)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutDeselect)).toBeInTheDocument();
  });

  it('affiche les raccourcis de la section Presse-papiers', () => {
    render(<KeyboardShortcutsModal isOpen onClose={() => {}} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutCopy)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutCut)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutPaste)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutDuplicate)).toBeInTheDocument();
  });

  it('affiche les raccourcis de la section Champs', () => {
    render(<KeyboardShortcutsModal isOpen onClose={() => {}} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutDelete)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutMove)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutMoveFast)).toBeInTheDocument();
  });

  it('affiche les raccourcis de la section Zoom', () => {
    render(<KeyboardShortcutsModal isOpen onClose={() => {}} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutZoomFit)).toBeInTheDocument();
    expect(
      screen.getByText((_content, element) =>
        element?.textContent === CUSTOM_FIELD_LABELS.shortcutZoom100,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutZoomIn)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.shortcutZoomOut)).toBeInTheDocument();
  });

  it('affiche les touches sous forme de kbd', () => {
    render(<KeyboardShortcutsModal isOpen onClose={() => {}} />);
    const kbdElements = screen.getAllByText('Ctrl');
    expect(kbdElements.length).toBeGreaterThan(0);
    const firstKbd = kbdElements[0];
    expect(firstKbd).toBeDefined();
    expect(firstKbd?.tagName).toBe('KBD');
  });

  it('appelle onClose quand on clique sur le fond', () => {
    const onClose = vi.fn();
    render(<KeyboardShortcutsModal isOpen onClose={onClose} />);
    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('appelle onClose quand on appuie sur Escape', () => {
    const onClose = vi.fn();
    render(<KeyboardShortcutsModal isOpen onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ne contient pas le data-testid quand ferm\u00e9e', () => {
    render(<KeyboardShortcutsModal isOpen={false} onClose={() => {}} />);
    expect(
      screen.queryByTestId('keyboard-shortcuts-modal'),
    ).not.toBeInTheDocument();
  });
});

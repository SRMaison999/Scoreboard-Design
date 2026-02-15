import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RosterImportModal } from '@/components/editor/RosterImportModal';
import { EDITOR_LABELS } from '@/constants/labels';

describe('RosterImportModal', () => {
  const onClose = vi.fn();
  const onImport = vi.fn();

  it('n\'affiche rien quand ferm\u00e9e', () => {
    render(<RosterImportModal open={false} onClose={onClose} onImport={onImport} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('affiche le titre quand ouverte', () => {
    render(<RosterImportModal open={true} onClose={onClose} onImport={onImport} />);
    expect(screen.getByText(EDITOR_LABELS.rosterImportTitle)).toBeInTheDocument();
  });

  it('affiche la zone de drop', () => {
    render(<RosterImportModal open={true} onClose={onClose} onImport={onImport} />);
    expect(screen.getByText(EDITOR_LABELS.rosterImportSelectFile)).toBeInTheDocument();
  });

  it('d\u00e9sactive le bouton importer sans donn\u00e9es', () => {
    render(<RosterImportModal open={true} onClose={onClose} onImport={onImport} />);
    const btn = screen.getByText(EDITOR_LABELS.rosterImportConfirm);
    expect(btn).toBeDisabled();
  });

  it('appelle onClose quand on clique Annuler', () => {
    render(<RosterImportModal open={true} onClose={onClose} onImport={onImport} />);
    fireEvent.click(screen.getByText(EDITOR_LABELS.rosterImportCancel));
    expect(onClose).toHaveBeenCalled();
  });
});

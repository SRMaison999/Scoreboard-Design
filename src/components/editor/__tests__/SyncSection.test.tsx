import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SyncSection } from '@/components/editor/SyncSection';
import { EDITOR_LABELS } from '@/constants/labels';
import { useSyncStore } from '@/stores/syncStore';

function renderAndOpen() {
  const result = render(<SyncSection />);
  const title = screen.getByText(EDITOR_LABELS.sectionSync);
  fireEvent.click(title);
  return result;
}

describe('SyncSection', () => {
  beforeEach(() => {
    useSyncStore.getState().resetSync();
  });

  it('affiche le titre', () => {
    render(<SyncSection />);
    expect(screen.getByText(EDITOR_LABELS.sectionSync)).toBeInTheDocument();
  });

  it('affiche les champs de configuration', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.syncServerUrl)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.syncRole)).toBeInTheDocument();
  });

  it('affiche le statut d\u00e9connect\u00e9', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.syncDisconnected)).toBeInTheDocument();
  });

  it('d\u00e9sactive le bouton connecter sans URL', () => {
    renderAndOpen();
    const btn = screen.getByText(EDITOR_LABELS.syncConnect);
    expect(btn).toBeDisabled();
  });
});

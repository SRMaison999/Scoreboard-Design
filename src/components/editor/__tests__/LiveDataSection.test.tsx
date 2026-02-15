import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LiveDataSection } from '@/components/editor/LiveDataSection';
import { EDITOR_LABELS } from '@/constants/labels';
import { useLiveDataStore } from '@/stores/liveDataStore';

function renderAndOpen() {
  const result = render(<LiveDataSection />);
  const title = screen.getByText(EDITOR_LABELS.sectionLiveData);
  fireEvent.click(title);
  return result;
}

describe('LiveDataSection', () => {
  beforeEach(() => {
    useLiveDataStore.getState().resetConfig();
  });

  it('affiche le titre de la section', () => {
    render(<LiveDataSection />);
    expect(screen.getByText(EDITOR_LABELS.sectionLiveData)).toBeInTheDocument();
  });

  it('affiche les champs de configuration apr\u00e8s ouverture', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.liveDataEndpoint)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.liveDataMatchId)).toBeInTheDocument();
  });

  it('affiche le statut d\u00e9connect\u00e9', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.liveDataDisconnected)).toBeInTheDocument();
  });

  it('affiche le bouton connecter', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.liveDataConnect)).toBeInTheDocument();
  });

  it('d\u00e9sactive le bouton connecter sans endpoint', () => {
    renderAndOpen();
    const btn = screen.getByText(EDITOR_LABELS.liveDataConnect);
    expect(btn).toBeDisabled();
  });
});

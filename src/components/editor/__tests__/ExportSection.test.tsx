import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExportSection } from '../ExportSection';
import { EDITOR_LABELS } from '@/constants/labels';

function renderAndOpen() {
  render(<ExportSection />);
  /* La section est fermée par défaut, on clique sur le titre pour l'ouvrir */
  const title = screen.getByText(EDITOR_LABELS.sectionExport);
  fireEvent.click(title);
}

describe('ExportSection', () => {
  it('affiche le titre de la section', () => {
    render(<ExportSection />);
    expect(screen.getByText(EDITOR_LABELS.sectionExport)).toBeInTheDocument();
  });

  it('affiche le selecteur de format video', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.exportVideoFormat)).toBeInTheDocument();
  });

  it('affiche le bouton de demarrage d enregistrement', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.exportStartRecording)).toBeInTheDocument();
  });

  it('affiche le bouton de generation GIF', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.exportGenerateGif)).toBeInTheDocument();
  });

  it('affiche le slider de duree GIF', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.exportGifDuration)).toBeInTheDocument();
  });

  it('affiche le selecteur de qualite GIF', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.exportGifQuality)).toBeInTheDocument();
  });

  it('affiche le slider de FPS video', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.exportVideoFps)).toBeInTheDocument();
  });

  it('ne contient plus le bouton de generation de specs (deplace dans la toolbar)', () => {
    renderAndOpen();
    expect(screen.queryByText(EDITOR_LABELS.exportSpecsButton)).not.toBeInTheDocument();
  });
});

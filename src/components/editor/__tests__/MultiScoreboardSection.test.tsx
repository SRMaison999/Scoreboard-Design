import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MultiScoreboardSection } from '@/components/editor/MultiScoreboardSection';
import { EDITOR_LABELS } from '@/constants/labels';
import { useMultiScoreboardStore } from '@/stores/multiScoreboardStore';

function renderAndOpen() {
  const result = render(<MultiScoreboardSection />);
  const title = screen.getByText(EDITOR_LABELS.sectionMultiScoreboard);
  fireEvent.click(title);
  return result;
}

describe('MultiScoreboardSection', () => {
  beforeEach(() => {
    useMultiScoreboardStore.getState().resetOverlays();
  });

  it('affiche le titre', () => {
    render(<MultiScoreboardSection />);
    expect(screen.getByText(EDITOR_LABELS.sectionMultiScoreboard)).toBeInTheDocument();
  });

  it('affiche les boutons d\'ajout apr\u00e8s ouverture', () => {
    renderAndOpen();
    expect(screen.getByText(`+ ${EDITOR_LABELS.multiScoreboardTypeLowerThird}`)).toBeInTheDocument();
    expect(screen.getByText(`+ ${EDITOR_LABELS.multiScoreboardTypeBug}`)).toBeInTheDocument();
    expect(screen.getByText(`+ ${EDITOR_LABELS.multiScoreboardTypeTicker}`)).toBeInTheDocument();
  });

  it('ajoute un overlay bande basse', () => {
    renderAndOpen();
    fireEvent.click(screen.getByText(`+ ${EDITOR_LABELS.multiScoreboardTypeLowerThird}`));
    expect(screen.getByText(EDITOR_LABELS.multiScoreboardTypeLowerThird)).toBeInTheDocument();
  });

  it('ajoute un overlay bug avec s\u00e9lecteur de position', () => {
    renderAndOpen();
    fireEvent.click(screen.getByText(`+ ${EDITOR_LABELS.multiScoreboardTypeBug}`));
    expect(screen.getByText(EDITOR_LABELS.multiScoreboardPosition)).toBeInTheDocument();
  });
});

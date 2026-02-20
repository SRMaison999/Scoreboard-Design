import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderSection } from '@/components/editor/HeaderSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

describe('HeaderSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de la section', () => {
    render(<HeaderSection />);
    expect(screen.getByText(EDITOR_LABELS.sectionHeader)).toBeInTheDocument();
  });

  it('affiche les labels des drapeaux', () => {
    render(<HeaderSection />);
    expect(screen.getByText(EDITOR_LABELS.showFlagTeam1)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.showFlagTeam2)).toBeInTheDocument();
  });

  it('les checkboxes de drapeaux sont cochees par defaut avec un code pays', () => {
    useScoreboardStore.getState().update('team1', 'CAN');
    useScoreboardStore.getState().update('team2', 'FIN');
    render(<HeaderSection />);
    const checkboxes = screen.getAllByRole('checkbox');
    const flagCheckbox1 = checkboxes[0];
    const flagCheckbox2 = checkboxes[1];
    expect(flagCheckbox1).toBeChecked();
    expect(flagCheckbox2).toBeChecked();
  });

  it('decocher le drapeau met a jour le store', () => {
    useScoreboardStore.getState().update('team1', 'CAN');
    render(<HeaderSection />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThanOrEqual(1);
    fireEvent.click(checkboxes[0] as HTMLElement);
    expect(useScoreboardStore.getState().showFlagTeam1).toBe(false);
  });

  it('affiche les selecteurs d\'equipes', () => {
    render(<HeaderSection />);
    expect(screen.getByText(EDITOR_LABELS.team1Label)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.team2Label)).toBeInTheDocument();
  });

  it('affiche les champs de score', () => {
    render(<HeaderSection />);
    expect(screen.getByText(EDITOR_LABELS.score1Label)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.score2Label)).toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FinalScoreSection } from '@/components/editor/FinalScoreSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('FinalScoreSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section avec le compte', () => {
    render(<FinalScoreSection />);
    expect(screen.getByText(/Score final/)).toBeInTheDocument();
    expect(screen.getByText(/3\/8/)).toBeInTheDocument();
  });

  it('affiche le champ titre', () => {
    render(<FinalScoreSection />);
    expect(screen.getByDisplayValue('SCORE FINAL')).toBeInTheDocument();
  });

  it('affiche la checkbox GWG', () => {
    render(<FinalScoreSection />);
    expect(screen.getByText(/Afficher le but gagnant/)).toBeInTheDocument();
  });

  it('affiche les champs GWG quand activé', () => {
    render(<FinalScoreSection />);
    expect(screen.getByDisplayValue('#11 KOPITAR')).toBeInTheDocument();
  });

  it('ajoute une période', async () => {
    const user = userEvent.setup();
    render(<FinalScoreSection />);
    const addBtn = screen.getByText(/Ajouter une période/);
    await user.click(addBtn);
    expect(useScoreboardStore.getState().finalScoreData.periodScores).toHaveLength(4);
  });

  it('supprime une période', async () => {
    const user = userEvent.setup();
    render(<FinalScoreSection />);
    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]!);
    expect(useScoreboardStore.getState().finalScoreData.periodScores).toHaveLength(2);
  });
});

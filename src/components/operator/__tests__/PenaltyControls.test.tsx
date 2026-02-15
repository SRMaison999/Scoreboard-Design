import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PenaltyControls } from '@/components/operator/PenaltyControls';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('PenaltyControls', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche les noms des équipes', () => {
    render(<PenaltyControls />);
    expect(screen.getAllByText('SVK').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('FIN').length).toBeGreaterThanOrEqual(1);
  });

  it('affiche les boutons de durée prédéfinie', () => {
    render(<PenaltyControls />);
    expect(screen.getAllByText('2:00').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('5:00').length).toBeGreaterThanOrEqual(2);
  });

  it('ajoute une pénalité avec durée 2:00 à gauche', async () => {
    const user = userEvent.setup();
    const before = useScoreboardStore.getState().penaltiesLeft.length;
    render(<PenaltyControls />);
    const btn200 = screen.getAllByText('2:00')[0]!;
    await user.click(btn200);
    expect(useScoreboardStore.getState().penaltiesLeft.length).toBe(before + 1);
    expect(useScoreboardStore.getState().penaltiesLeft[0]?.time).toBe('2:00');
  });

  it('ajoute une pénalité avec numéro de joueur', async () => {
    const user = userEvent.setup();
    render(<PenaltyControls />);
    const input = screen.getByTestId('penalty-number-left');
    await user.type(input, '99');
    const btn500 = screen.getAllByText('5:00')[0]!;
    await user.click(btn500);
    expect(useScoreboardStore.getState().penaltiesLeft[0]?.number).toBe('99');
    expect(useScoreboardStore.getState().penaltiesLeft[0]?.time).toBe('5:00');
  });
});

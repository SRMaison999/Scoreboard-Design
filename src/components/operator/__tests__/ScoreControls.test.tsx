import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScoreControls } from '@/components/operator/ScoreControls';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('ScoreControls', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche les noms des équipes et les scores', () => {
    render(<ScoreControls />);
    expect(screen.getByText('SVK')).toBeInTheDocument();
    expect(screen.getByText('FIN')).toBeInTheDocument();
    expect(screen.getAllByText('1').length).toBe(2);
  });

  it('incrémente le score équipe 1', async () => {
    const user = userEvent.setup();
    render(<ScoreControls />);
    await user.click(screen.getByTestId('score1-plus'));
    expect(useScoreboardStore.getState().score1).toBe('2');
  });

  it('décrémente le score équipe 1', async () => {
    const user = userEvent.setup();
    render(<ScoreControls />);
    await user.click(screen.getByTestId('score1-minus'));
    expect(useScoreboardStore.getState().score1).toBe('0');
  });

  it('incrémente le score équipe 2', async () => {
    const user = userEvent.setup();
    render(<ScoreControls />);
    await user.click(screen.getByTestId('score2-plus'));
    expect(useScoreboardStore.getState().score2).toBe('2');
  });

  it('ne descend pas sous zéro', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().update('score1', '0');
    render(<ScoreControls />);
    await user.click(screen.getByTestId('score1-minus'));
    expect(useScoreboardStore.getState().score1).toBe('0');
  });
});

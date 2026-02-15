import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GoalSection } from '@/components/editor/GoalSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('GoalSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section', () => {
    render(<GoalSection />);
    expect(screen.getByText(/Célébration de but/)).toBeInTheDocument();
  });

  it('affiche les champs du buteur', () => {
    render(<GoalSection />);
    expect(screen.getByDisplayValue('KOPITAR')).toBeInTheDocument();
    expect(screen.getByDisplayValue('11')).toBeInTheDocument();
  });

  it('met à jour le nom du buteur', async () => {
    const user = userEvent.setup();
    render(<GoalSection />);
    const input = screen.getByDisplayValue('KOPITAR');
    await user.clear(input);
    await user.type(input, 'GRETZKY');
    expect(useScoreboardStore.getState().goalData.scorerName).toBe('GRETZKY');
  });

  it('affiche les champs assist', () => {
    render(<GoalSection />);
    expect(screen.getByDisplayValue('PASTRNAK')).toBeInTheDocument();
    expect(screen.getByDisplayValue('88')).toBeInTheDocument();
  });

  it('affiche le sélecteur de côté', () => {
    render(<GoalSection />);
    expect(screen.getByText('Gauche')).toBeInTheDocument();
    expect(screen.getByText('Droite')).toBeInTheDocument();
  });
});

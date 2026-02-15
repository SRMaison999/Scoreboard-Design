import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhaseControls } from '@/components/operator/PhaseControls';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('PhaseControls', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche les phases disponibles', () => {
    render(<PhaseControls />);
    expect(screen.getByText('1st PERIOD')).toBeInTheDocument();
    expect(screen.getByText('2nd PERIOD')).toBeInTheDocument();
  });

  it('sélectionne une phase au clic', async () => {
    const user = userEvent.setup();
    render(<PhaseControls />);
    await user.click(screen.getByText('2nd PERIOD'));
    expect(useScoreboardStore.getState().period).toBe('2nd PERIOD');
  });

  it('passe à la phase suivante', async () => {
    const user = userEvent.setup();
    render(<PhaseControls />);
    await user.click(screen.getByTestId('next-phase'));
    expect(useScoreboardStore.getState().period).toBe('1st INTERMISSION');
  });

  it('affiche le bouton Phase suivante', () => {
    render(<PhaseControls />);
    expect(screen.getByText(/Phase suivante/)).toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BarChartSection } from '@/components/editor/BarChartSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('BarChartSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section avec le compte', () => {
    render(<BarChartSection />);
    expect(screen.getByText(/Barres comparatives/)).toBeInTheDocument();
    expect(screen.getByText(/4\/8/)).toBeInTheDocument();
  });

  it('affiche les barres existantes', () => {
    render(<BarChartSection />);
    expect(screen.getByDisplayValue('SHOTS ON GOAL')).toBeInTheDocument();
    expect(screen.getByDisplayValue('32')).toBeInTheDocument();
  });

  it('ajoute une barre', async () => {
    const user = userEvent.setup();
    render(<BarChartSection />);
    const addBtn = screen.getByText(/Ajouter une barre/);
    await user.click(addBtn);
    expect(useScoreboardStore.getState().barChartData.rows).toHaveLength(5);
  });

  it('supprime une barre', async () => {
    const user = userEvent.setup();
    render(<BarChartSection />);
    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]!);
    expect(useScoreboardStore.getState().barChartData.rows).toHaveLength(3);
  });
});

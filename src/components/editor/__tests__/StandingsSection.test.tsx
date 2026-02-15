import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StandingsSection } from '@/components/editor/StandingsSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('StandingsSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section avec le compte', () => {
    render(<StandingsSection />);
    expect(screen.getByText(/Classement/)).toBeInTheDocument();
    expect(screen.getByText(/4\/12/)).toBeInTheDocument();
  });

  it('affiche le champ titre', () => {
    render(<StandingsSection />);
    expect(screen.getByDisplayValue('GROUPE A - CLASSEMENT')).toBeInTheDocument();
  });

  it('affiche les lignes existantes', () => {
    render(<StandingsSection />);
    expect(useScoreboardStore.getState().standingsData.rows).toHaveLength(4);
    expect(screen.getAllByText('X')).toHaveLength(4);
  });

  it('ajoute une ligne', async () => {
    const user = userEvent.setup();
    render(<StandingsSection />);
    const addBtn = screen.getByText(/Ajouter une équipe/);
    await user.click(addBtn);
    expect(useScoreboardStore.getState().standingsData.rows).toHaveLength(5);
  });

  it('supprime une ligne', async () => {
    const user = userEvent.setup();
    render(<StandingsSection />);
    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]!);
    expect(useScoreboardStore.getState().standingsData.rows).toHaveLength(3);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RosterSection } from '@/components/editor/RosterSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('RosterSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section avec le compte', () => {
    render(<RosterSection />);
    expect(screen.getByText(/Composition d'équipe/)).toBeInTheDocument();
    expect(screen.getByText(/6\/25/)).toBeInTheDocument();
  });

  it('affiche les joueurs existants', () => {
    render(<RosterSection />);
    expect(screen.getByDisplayValue('KOPITAR')).toBeInTheDocument();
    expect(screen.getByDisplayValue('RAMSAY')).toBeInTheDocument();
  });

  it('ajoute un joueur', async () => {
    const user = userEvent.setup();
    render(<RosterSection />);
    const addBtn = screen.getByText(/Ajouter un joueur/);
    await user.click(addBtn);
    expect(useScoreboardStore.getState().rosterData.players).toHaveLength(7);
  });

  it('supprime un joueur', async () => {
    const user = userEvent.setup();
    render(<RosterSection />);
    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]!);
    expect(useScoreboardStore.getState().rosterData.players).toHaveLength(5);
  });
});

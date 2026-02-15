import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlayerCardSection } from '@/components/editor/PlayerCardSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('PlayerCardSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section avec le compte', () => {
    render(<PlayerCardSection />);
    expect(screen.getByText(/Fiche joueur/)).toBeInTheDocument();
    expect(screen.getByText(/4\/8/)).toBeInTheDocument();
  });

  it('affiche les champs du joueur', () => {
    render(<PlayerCardSection />);
    expect(screen.getByDisplayValue('KOPITAR')).toBeInTheDocument();
    expect(screen.getByDisplayValue('11')).toBeInTheDocument();
  });

  it('affiche les stats existantes', () => {
    render(<PlayerCardSection />);
    expect(screen.getByDisplayValue('BUTS')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ASSISTS')).toBeInTheDocument();
  });

  it('ajoute une stat', async () => {
    const user = userEvent.setup();
    render(<PlayerCardSection />);
    const addBtn = screen.getByText(/Ajouter une stat/);
    await user.click(addBtn);
    expect(useScoreboardStore.getState().playerCardData.stats).toHaveLength(5);
  });

  it('supprime une stat', async () => {
    const user = userEvent.setup();
    render(<PlayerCardSection />);
    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]!);
    expect(useScoreboardStore.getState().playerCardData.stats).toHaveLength(3);
  });
});

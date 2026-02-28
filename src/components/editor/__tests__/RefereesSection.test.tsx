import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RefereesSection } from '@/components/editor/RefereesSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('RefereesSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section avec le compte', () => {
    render(<RefereesSection />);
    expect(screen.getByText(/Arbitres/)).toBeInTheDocument();
    expect(screen.getByText(/4\/8/)).toBeInTheDocument();
  });

  it('affiche les arbitres existants', () => {
    render(<RefereesSection />);
    expect(screen.getByDisplayValue('ANSONS')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ROMASKO')).toBeInTheDocument();
  });

  it('ajoute un arbitre', async () => {
    const user = userEvent.setup();
    render(<RefereesSection />);
    const addBtn = screen.getByText(/Ajouter un arbitre/);
    await user.click(addBtn);
    expect(useScoreboardStore.getState().refereesData.referees).toHaveLength(5);
  });

  it('supprime un arbitre', async () => {
    const user = userEvent.setup();
    render(<RefereesSection />);
    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]!);
    expect(useScoreboardStore.getState().refereesData.referees).toHaveLength(3);
  });

  it('affiche les checkboxes globales', () => {
    render(<RefereesSection />);
    expect(screen.getByText('Afficher les drapeaux')).toBeInTheDocument();
    expect(screen.getByText('Afficher les NOC')).toBeInTheDocument();
    expect(screen.getByText(/Afficher les r\u00f4les/)).toBeInTheDocument();
  });
});

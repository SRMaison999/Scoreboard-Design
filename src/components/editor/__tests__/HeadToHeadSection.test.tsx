import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeadToHeadSection } from '@/components/editor/HeadToHeadSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('HeadToHeadSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section avec le compte', () => {
    render(<HeadToHeadSection />);
    expect(screen.getByText(/Face-à-face/)).toBeInTheDocument();
    expect(screen.getByText(/4\/8/)).toBeInTheDocument();
  });

  it('affiche les noms des joueurs', () => {
    render(<HeadToHeadSection />);
    expect(screen.getByDisplayValue('KOPITAR')).toBeInTheDocument();
    expect(screen.getByDisplayValue('BARKOV')).toBeInTheDocument();
  });

  it('ajoute une stat', async () => {
    const user = userEvent.setup();
    render(<HeadToHeadSection />);
    const addBtn = screen.getByText(/Ajouter une stat/);
    await user.click(addBtn);
    expect(useScoreboardStore.getState().headToHeadData.stats).toHaveLength(5);
  });

  it('supprime une stat', async () => {
    const user = userEvent.setup();
    render(<HeadToHeadSection />);
    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]!);
    expect(useScoreboardStore.getState().headToHeadData.stats).toHaveLength(3);
  });
});

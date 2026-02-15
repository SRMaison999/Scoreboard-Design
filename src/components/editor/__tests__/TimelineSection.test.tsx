import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimelineSection } from '@/components/editor/TimelineSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('TimelineSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section avec le compte', () => {
    render(<TimelineSection />);
    expect(screen.getByText(/Chronologie/)).toBeInTheDocument();
    expect(screen.getByText(/4\/8/)).toBeInTheDocument();
  });

  it('affiche les événements existants', () => {
    render(<TimelineSection />);
    expect(screen.getByDisplayValue('04:22')).toBeInTheDocument();
    expect(screen.getByDisplayValue(/KOPITAR/)).toBeInTheDocument();
  });

  it('ajoute un événement', async () => {
    const user = userEvent.setup();
    render(<TimelineSection />);
    const addBtn = screen.getByText(/Ajouter un événement/);
    await user.click(addBtn);
    expect(useScoreboardStore.getState().timelineData.events).toHaveLength(5);
  });

  it('supprime un événement', async () => {
    const user = userEvent.setup();
    render(<TimelineSection />);
    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]!);
    expect(useScoreboardStore.getState().timelineData.events).toHaveLength(3);
  });
});

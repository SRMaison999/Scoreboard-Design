import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScheduleSection } from '@/components/editor/ScheduleSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('ScheduleSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section avec le compte', () => {
    render(<ScheduleSection />);
    expect(screen.getByText(/Calendrier/)).toBeInTheDocument();
    expect(screen.getByText(/3\/8/)).toBeInTheDocument();
  });

  it('affiche les matchs existants', () => {
    render(<ScheduleSection />);
    expect(screen.getByDisplayValue('CAN')).toBeInTheDocument();
    expect(screen.getByDisplayValue('SWE')).toBeInTheDocument();
  });

  it('ajoute un match', async () => {
    const user = userEvent.setup();
    render(<ScheduleSection />);
    const addBtn = screen.getByText(/Ajouter un match/);
    await user.click(addBtn);
    expect(useScoreboardStore.getState().scheduleData.matches).toHaveLength(4);
  });

  it('supprime un match', async () => {
    const user = userEvent.setup();
    render(<ScheduleSection />);
    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]!);
    expect(useScoreboardStore.getState().scheduleData.matches).toHaveLength(2);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClockControls } from '@/components/operator/ClockControls';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('ClockControls', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le temps et la période', () => {
    render(<ClockControls />);
    expect(screen.getByText('20:00')).toBeInTheDocument();
    expect(screen.getByText('1st PERIOD')).toBeInTheDocument();
  });

  it('démarre le timer', async () => {
    const user = userEvent.setup();
    render(<ClockControls />);
    await user.click(screen.getByTestId('clock-start'));
    expect(useScoreboardStore.getState().demoRunning).toBe(true);
  });

  it('arrête le timer', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().startClock();
    render(<ClockControls />);
    await user.click(screen.getByTestId('clock-stop'));
    expect(useScoreboardStore.getState().demoRunning).toBe(false);
  });

  it('reset le timer', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().update('time', '5:00');
    render(<ClockControls />);
    await user.click(screen.getByTestId('clock-reset'));
    expect(useScoreboardStore.getState().time).toBe('20:00');
  });
});

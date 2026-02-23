import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClockDataEditor, TimeoutEditor, ShootoutEditor } from '../FieldMatchEditors';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

describe('ClockDataEditor', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('affiche les champs temps et période', () => {
    render(<ClockDataEditor />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configClockTime)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configClockPeriod)).toBeInTheDocument();
  });

  it('affiche les valeurs actuelles du store', () => {
    useScoreboardStore.getState().update('time', '15:30');
    useScoreboardStore.getState().update('period', '2nd PERIOD');
    render(<ClockDataEditor />);
    expect(screen.getByDisplayValue('15:30')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2nd PERIOD')).toBeInTheDocument();
  });

  it('met à jour le temps dans le store', async () => {
    const user = userEvent.setup();
    render(<ClockDataEditor />);
    const timeInput = screen.getByDisplayValue('20:00');
    await user.clear(timeInput);
    await user.type(timeInput, '05:00');
    expect(useScoreboardStore.getState().time).toBe('05:00');
  });
});

describe('TimeoutEditor', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('affiche les champs de temps morts', () => {
    render(<TimeoutEditor />);
    expect(screen.getAllByText(CUSTOM_FIELD_LABELS.configTimeoutsCount).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId('timeout-left-input')).toBeInTheDocument();
    expect(screen.getByTestId('timeout-right-input')).toBeInTheDocument();
  });

  it('affiche les valeurs initiales à 0', () => {
    render(<TimeoutEditor />);
    expect(screen.getByTestId('timeout-left-input')).toHaveValue(0);
    expect(screen.getByTestId('timeout-right-input')).toHaveValue(0);
  });
});

describe('ShootoutEditor', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('affiche le message aucun tir quand la liste est vide', () => {
    render(<ShootoutEditor />);
    const empties = screen.getAllByText(CUSTOM_FIELD_LABELS.configShootoutEmpty);
    expect(empties.length).toBe(2);
  });

  it('affiche les boutons d\'ajout de tir pour les deux côtés', () => {
    render(<ShootoutEditor />);
    const addBtns = screen.getAllByText(`+ ${CUSTOM_FIELD_LABELS.configShootoutAdd}`);
    expect(addBtns.length).toBe(2);
  });

  it('ajoute un tir au côté gauche', async () => {
    const user = userEvent.setup();
    render(<ShootoutEditor />);
    const addBtns = screen.getAllByText(`+ ${CUSTOM_FIELD_LABELS.configShootoutAdd}`);
    await user.click(addBtns[0]!);
    expect(useScoreboardStore.getState().shootoutLeft.length).toBe(1);
    expect(useScoreboardStore.getState().shootoutLeft[0]?.result).toBe('pending');
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamNationSelector } from '../TeamNationSelector';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';

const LEFT_ELEMENT: FieldElementConfig = {
  type: 'team-name',
  config: { side: 'left', showFlag: true, fontSizeOverride: 0 },
};

const RIGHT_ELEMENT: FieldElementConfig = {
  type: 'team-name',
  config: { side: 'right', showFlag: true, fontSizeOverride: 0 },
};

describe('TeamNationSelector', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('affiche le dropdown de nation, le nom affich\u00e9 et le score', () => {
    render(<TeamNationSelector element={LEFT_ELEMENT} />);
    const container = screen.getByTestId('team-nation-selector');
    expect(container).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTeamNation)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTeamDisplayName)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTeamScore)).toBeInTheDocument();
  });

  it('lit la valeur de team1 quand side=left', () => {
    useScoreboardStore.getState().update('team1', 'CAN');
    render(<TeamNationSelector element={LEFT_ELEMENT} />);
    const container = screen.getByTestId('team-nation-selector');
    const select = within(container).getByRole('combobox');
    expect(select).toHaveValue('CAN');
  });

  it('lit la valeur de team2 quand side=right', () => {
    useScoreboardStore.getState().update('team2', 'USA');
    render(<TeamNationSelector element={RIGHT_ELEMENT} />);
    const container = screen.getByTestId('team-nation-selector');
    const select = within(container).getByRole('combobox');
    expect(select).toHaveValue('USA');
  });

  it('met \u00e0 jour team1 quand on change la nation (side=left)', async () => {
    const user = userEvent.setup();
    render(<TeamNationSelector element={LEFT_ELEMENT} />);
    const container = screen.getByTestId('team-nation-selector');
    const select = within(container).getByRole('combobox');
    await user.selectOptions(select, 'FIN');
    expect(useScoreboardStore.getState().team1).toBe('FIN');
  });

  it('met \u00e0 jour team2 quand on change la nation (side=right)', async () => {
    const user = userEvent.setup();
    render(<TeamNationSelector element={RIGHT_ELEMENT} />);
    const container = screen.getByTestId('team-nation-selector');
    const select = within(container).getByRole('combobox');
    await user.selectOptions(select, 'SWE');
    expect(useScoreboardStore.getState().team2).toBe('SWE');
  });

  it('met \u00e0 jour le score quand on le modifie', async () => {
    const user = userEvent.setup();
    render(<TeamNationSelector element={LEFT_ELEMENT} />);
    const container = screen.getByTestId('team-nation-selector');
    const inputs = within(container).getAllByRole('textbox');
    const scoreInput = inputs[1]!;
    await user.clear(scoreInput);
    await user.type(scoreInput, '3');
    expect(useScoreboardStore.getState().score1).toBe('3');
  });

  it('met \u00e0 jour le nom affich\u00e9 quand on le modifie', async () => {
    const user = userEvent.setup();
    render(<TeamNationSelector element={LEFT_ELEMENT} />);
    const container = screen.getByTestId('team-nation-selector');
    const inputs = within(container).getAllByRole('textbox');
    const displayNameInput = inputs[0]!;
    await user.clear(displayNameInput);
    await user.type(displayNameInput, 'Canadiens');
    expect(useScoreboardStore.getState().teamDisplayName1).toBe('Canadiens');
  });
});

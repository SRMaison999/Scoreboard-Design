import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FreeLayoutCanvasPanel } from '../FreeLayoutCanvasPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

describe('FreeLayoutCanvasPanel', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre Canvas', () => {
    render(<FreeLayoutCanvasPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.freeLayoutTabCanvas)).toBeInTheDocument();
  });

  it('affiche les options du canvas', () => {
    render(<FreeLayoutCanvasPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.fullPageMode)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.snapToGrid)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.showGuides)).toBeInTheDocument();
  });

  it('toggle le mode pleine page', async () => {
    const user = userEvent.setup();
    render(<FreeLayoutCanvasPanel />);

    const checkbox = screen.getByRole('checkbox', { name: new RegExp(CUSTOM_FIELD_LABELS.fullPageMode) });
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(useScoreboardStore.getState().customFieldsData.fullPageMode).toBe(true);
  });

  it('affiche les boutons undo/redo', () => {
    render(<FreeLayoutCanvasPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.undoAction)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.redoAction)).toBeInTheDocument();
  });

  it('affiche le data-testid', () => {
    render(<FreeLayoutCanvasPanel />);
    expect(screen.getByTestId('free-layout-canvas-panel')).toBeInTheDocument();
  });
});

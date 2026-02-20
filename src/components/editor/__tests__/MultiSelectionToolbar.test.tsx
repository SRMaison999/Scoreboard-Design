/**
 * Tests pour le composant MultiSelectionToolbar.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

const mockDistribute = vi.fn();
const mockRemove = vi.fn();
const mockDuplicate = vi.fn();

vi.mock('@/stores/scoreboardStore', () => ({
  useScoreboardStore: vi.fn((selector: unknown) => {
    if (typeof selector === 'function') {
      return (selector as (s: unknown) => unknown)({
        distributeSelectedFields: mockDistribute,
        removeSelectedFields: mockRemove,
        duplicateSelectedFields: mockDuplicate,
      });
    }
    return undefined;
  }),
}));

describe('MultiSelectionToolbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('affiche le nombre de champs selectionnes', async () => {
    const { MultiSelectionToolbar } = await import('../MultiSelectionToolbar');
    render(<MultiSelectionToolbar count={3} />);
    expect(screen.getByText(`3 ${CUSTOM_FIELD_LABELS.multiSelectionCount}`)).toBeInTheDocument();
  });

  it('affiche la section alignement', async () => {
    const { MultiSelectionToolbar } = await import('../MultiSelectionToolbar');
    render(<MultiSelectionToolbar count={2} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.alignSelectionTitle)).toBeInTheDocument();
  });

  it('affiche la section distribution pour 3+ champs', async () => {
    const { MultiSelectionToolbar } = await import('../MultiSelectionToolbar');
    render(<MultiSelectionToolbar count={3} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.distributeTitle)).toBeInTheDocument();
  });

  it('masque la section distribution pour 2 champs', async () => {
    const { MultiSelectionToolbar } = await import('../MultiSelectionToolbar');
    render(<MultiSelectionToolbar count={2} />);
    expect(screen.queryByText(CUSTOM_FIELD_LABELS.distributeTitle)).not.toBeInTheDocument();
  });

  it('appelle distributeSelectedFields au clic sur alignement gauche', async () => {
    const user = userEvent.setup();
    const { MultiSelectionToolbar } = await import('../MultiSelectionToolbar');
    render(<MultiSelectionToolbar count={2} />);
    const btn = screen.getByTitle(CUSTOM_FIELD_LABELS.alignSelLeft);
    await user.click(btn);
    expect(mockDistribute).toHaveBeenCalledWith('align-sel-left');
  });

  it('appelle removeSelectedFields au clic sur supprimer', async () => {
    const user = userEvent.setup();
    const { MultiSelectionToolbar } = await import('../MultiSelectionToolbar');
    render(<MultiSelectionToolbar count={2} />);
    await user.click(screen.getByText(CUSTOM_FIELD_LABELS.fieldDelete));
    expect(mockRemove).toHaveBeenCalled();
  });
});

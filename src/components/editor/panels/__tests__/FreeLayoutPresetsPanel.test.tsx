import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FreeLayoutPresetsPanel } from '../FreeLayoutPresetsPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

describe('FreeLayoutPresetsPanel', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre Presets', () => {
    render(<FreeLayoutPresetsPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.sectionPresets)).toBeInTheDocument();
  });

  it('affiche les boutons de sauvegarde et chargement', () => {
    render(<FreeLayoutPresetsPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.presetSaveField)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.presetSaveLayout)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.presetLoad)).toBeInTheDocument();
  });

  it('d\u00e9sactive le bouton sauvegarder champ sans s\u00e9lection', () => {
    render(<FreeLayoutPresetsPanel />);
    const btn = screen.getByRole('button', { name: new RegExp(CUSTOM_FIELD_LABELS.presetSaveField) });
    expect(btn).toBeDisabled();
  });

  it('d\u00e9sactive le bouton sauvegarder layout sans champs', () => {
    render(<FreeLayoutPresetsPanel />);
    const btn = screen.getByRole('button', { name: new RegExp(CUSTOM_FIELD_LABELS.presetSaveLayout) });
    expect(btn).toBeDisabled();
  });

  it('affiche le bouton de s\u00e9lection de zone d\u00e9sactiv\u00e9 sans champs', () => {
    render(<FreeLayoutPresetsPanel />);
    const btn = screen.getByRole('button', { name: new RegExp(CUSTOM_FIELD_LABELS.zoneSelectStart) });
    expect(btn).toBeDisabled();
  });

  it('affiche le data-testid', () => {
    render(<FreeLayoutPresetsPanel />);
    expect(screen.getByTestId('free-layout-presets-panel')).toBeInTheDocument();
  });
});

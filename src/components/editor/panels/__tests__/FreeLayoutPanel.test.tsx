import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FreeLayoutPanel } from '../FreeLayoutPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useEditorUIStore } from '@/stores/editorUIStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

describe('FreeLayoutPanel', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
    useEditorUIStore.setState({ activeFreeLayoutTab: 'library' });
  });

  it('rend le panneau avec le data-testid', () => {
    render(<FreeLayoutPanel />);
    expect(screen.getByTestId('free-layout-panel')).toBeInTheDocument();
  });

  it('affiche les 4 boutons de navigation du rail', () => {
    render(<FreeLayoutPanel />);
    expect(screen.getByLabelText(CUSTOM_FIELD_LABELS.freeLayoutTabLibrary)).toBeInTheDocument();
    expect(screen.getByLabelText(CUSTOM_FIELD_LABELS.freeLayoutTabCanvas)).toBeInTheDocument();
    expect(screen.getByLabelText(CUSTOM_FIELD_LABELS.freeLayoutTabLayers)).toBeInTheDocument();
    expect(screen.getByLabelText(CUSTOM_FIELD_LABELS.freeLayoutTabPresets)).toBeInTheDocument();
  });

  it('change d\'onglet au clic sur un bouton du rail', async () => {
    const user = userEvent.setup();
    render(<FreeLayoutPanel />);

    await user.click(screen.getByLabelText(CUSTOM_FIELD_LABELS.freeLayoutTabLayers));
    expect(useEditorUIStore.getState().activeFreeLayoutTab).toBe('layers');
  });

  it('affiche le panneau Canvas quand l\'onglet canvas est actif', () => {
    useEditorUIStore.setState({ activeFreeLayoutTab: 'canvas' });
    render(<FreeLayoutPanel />);
    expect(screen.getByTestId('free-layout-canvas-panel')).toBeInTheDocument();
  });

  it('affiche le panneau Couches quand l\'onglet layers est actif', () => {
    useEditorUIStore.setState({ activeFreeLayoutTab: 'layers' });
    render(<FreeLayoutPanel />);
    expect(screen.getByTestId('free-layout-layers-panel')).toBeInTheDocument();
  });

  it('affiche le panneau Presets quand l\'onglet presets est actif', () => {
    useEditorUIStore.setState({ activeFreeLayoutTab: 'presets' });
    render(<FreeLayoutPanel />);
    expect(screen.getByTestId('free-layout-presets-panel')).toBeInTheDocument();
  });

  it('affiche le panneau de propri\u00e9t\u00e9s persistant', () => {
    render(<FreeLayoutPanel />);
    expect(screen.getByTestId('persistent-properties-panel')).toBeInTheDocument();
  });

  it('affiche le message de s\u00e9lection vide dans le panneau persistant', () => {
    render(<FreeLayoutPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.freeLayoutNoSelection)).toBeInTheDocument();
  });

  it('affiche les propri\u00e9t\u00e9s d\'un champ s\u00e9lectionn\u00e9 dans le panneau persistant', () => {
    const element = {
      type: 'text-block' as const,
      config: { content: 'test', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center' as const, textTransform: 'none' as const, letterSpacing: 0 },
    };
    useScoreboardStore.getState().addCustomField(element, 50, 50, 200, 100);
    const firstField = useScoreboardStore.getState().customFieldsData.fields[0];
    if (!firstField) throw new Error('Le champ devrait exister');
    useScoreboardStore.getState().selectCustomField(firstField.id);
    render(<FreeLayoutPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldLabel)).toBeInTheDocument();
  });

  it('affiche la biblioth\u00e8que quand l\'onglet library est actif', () => {
    useEditorUIStore.setState({ activeFreeLayoutTab: 'library' });
    render(<FreeLayoutPanel />);
    expect(screen.getByTestId('free-layout-library-panel')).toBeInTheDocument();
  });
});

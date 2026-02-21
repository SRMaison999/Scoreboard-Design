import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropertiesPanel } from '../PropertiesPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { EDITOR_LABELS } from '@/constants/labels';

const TEXT_ELEMENT = {
  type: 'text-block' as const,
  config: {
    content: 'test', fontSize: 20, fontWeight: 400,
    textAlign: 'center' as const, textTransform: 'none' as const,
    fontFamily: '',
    letterSpacing: 0,
  },
};

describe('PropertiesPanel', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('affiche les donn\u00e9es du match sans champ s\u00e9lectionn\u00e9', () => {
    render(<PropertiesPanel />);
    expect(screen.getByTestId('properties-panel')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.propertiesPanelMatchData)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.sectionHeader)).toBeInTheDocument();
  });

  it('n\u2019affiche pas le bouton fermer sans s\u00e9lection', () => {
    render(<PropertiesPanel />);
    expect(screen.queryByTestId('properties-panel-close')).not.toBeInTheDocument();
  });

  it('affiche le panneau quand un champ est s\u00e9lectionn\u00e9', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.getByTestId('properties-panel')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.propertiesPanelTitle)).toBeInTheDocument();
  });

  it('affiche les propri\u00e9t\u00e9s du champ s\u00e9lectionn\u00e9', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldPosition)).toBeInTheDocument();
  });

  it('ferme la s\u00e9lection avec le bouton X et revient aux donn\u00e9es du match', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);

    const closeBtn = screen.getByTestId('properties-panel-close');
    await user.click(closeBtn);

    expect(useScoreboardStore.getState().customFieldsData.selectedFieldIds).toEqual([]);
  });

  it('affiche la barre multi-s\u00e9lection quand 2+ champs sont s\u00e9lectionn\u00e9s', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 300, 50, 200, 100);
    const fields = useScoreboardStore.getState().customFieldsData.fields;
    useScoreboardStore.getState().selectCustomField(fields[0]!.id);
    useScoreboardStore.getState().toggleFieldSelection(fields[1]!.id);
    render(<PropertiesPanel />);

    expect(screen.getByText(CUSTOM_FIELD_LABELS.multiSelectionCount, { exact: false })).toBeInTheDocument();
  });
});

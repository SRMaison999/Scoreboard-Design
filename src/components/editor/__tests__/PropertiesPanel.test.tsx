import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropertiesPanel } from '../PropertiesPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useEditorUIStore } from '@/stores/editorUIStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

const TEXT_ELEMENT = {
  type: 'text-block' as const,
  config: {
    content: 'test', fontSize: 20, fontWeight: 400,
    textAlign: 'center' as const, textTransform: 'none' as const,
    fontFamily: '',
    letterSpacing: 0,
  },
};

const TEAM_NAME_ELEMENT = {
  type: 'team-name' as const,
  config: {
    side: 'left' as const,
    showFlag: true,
    fontSizeOverride: 0,
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
    useEditorUIStore.setState({ matchDataVisible: false });
  });

  it('affiche le placeholder sans champ s\u00e9lectionn\u00e9', () => {
    render(<PropertiesPanel />);
    expect(screen.getByTestId('properties-panel')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.freeLayoutNoSelection)).toBeInTheDocument();
  });

  it('n\u2019affiche pas le bouton fermer sans s\u00e9lection', () => {
    render(<PropertiesPanel />);
    expect(screen.queryByTestId('properties-panel-close')).not.toBeInTheDocument();
  });

  it('n\u2019affiche pas les donn\u00e9es du match sans s\u00e9lection m\u00eame si matchDataVisible', () => {
    useEditorUIStore.setState({ matchDataVisible: true });
    render(<PropertiesPanel />);
    expect(screen.queryByTestId('match-data-section')).not.toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.freeLayoutNoSelection)).toBeInTheDocument();
  });

  it('affiche le panneau quand un champ texte est s\u00e9lectionn\u00e9', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.getByTestId('properties-panel')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.propertiesPanelTitle)).toBeInTheDocument();
  });

  it('n\u2019affiche pas les donn\u00e9es du match pour un champ texte', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.queryByTestId('match-data-section')).not.toBeInTheDocument();
  });

  it('affiche les donn\u00e9es du match pour un champ nom d\u2019\u00e9quipe', () => {
    useScoreboardStore.getState().addCustomField(TEAM_NAME_ELEMENT, 50, 50, 600, 160);
    render(<PropertiesPanel />);
    expect(screen.getByTestId('match-data-section')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.propertiesPanelMatchData)).toBeInTheDocument();
  });

  it('affiche les propri\u00e9t\u00e9s du champ s\u00e9lectionn\u00e9', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldPosition)).toBeInTheDocument();
  });

  it('ferme la s\u00e9lection avec le bouton X', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);

    const closeBtn = screen.getByTestId('properties-panel-close');
    await user.click(closeBtn);

    expect(useScoreboardStore.getState().customFieldsData.selectedFieldIds).toEqual([]);
  });

  it('affiche le bouton Donn\u00e9es du match dans l\u2019\u00e9tat vide', () => {
    render(<PropertiesPanel />);
    expect(screen.getByTestId('match-data-empty-button')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.matchDataOpenButton)).toBeInTheDocument();
  });

  it('ouvre les donn\u00e9es du match au clic sur le bouton \u00e9tat vide', async () => {
    const user = userEvent.setup();
    render(<PropertiesPanel />);
    await user.click(screen.getByTestId('match-data-empty-button'));
    expect(useEditorUIStore.getState().matchDataVisible).toBe(true);
  });

  it('affiche le toggle donn\u00e9es du match pour un champ non-match s\u00e9lectionn\u00e9', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.getByTestId('match-data-toggle')).toBeInTheDocument();
  });

  it('masque le toggle quand un champ match est s\u00e9lectionn\u00e9', () => {
    useScoreboardStore.getState().addCustomField(TEAM_NAME_ELEMENT, 50, 50, 600, 160);
    render(<PropertiesPanel />);
    expect(screen.queryByTestId('match-data-toggle')).not.toBeInTheDocument();
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

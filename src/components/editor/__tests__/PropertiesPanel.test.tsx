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
    textColor: '#ffffff',
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
  });

  it('affiche le placeholder sans champ sélectionné', () => {
    render(<PropertiesPanel />);
    expect(screen.getByTestId('properties-panel')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.freeLayoutNoSelection)).toBeInTheDocument();
  });

  it('n\u2019affiche pas le bouton fermer sans sélection', () => {
    render(<PropertiesPanel />);
    expect(screen.queryByTestId('properties-panel-close')).not.toBeInTheDocument();
  });

  it('affiche toujours la section Données du match, même sans sélection', () => {
    render(<PropertiesPanel />);
    expect(screen.getByTestId('match-data-section')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.propertiesPanelMatchData)).toBeInTheDocument();
  });

  it('affiche les dropdowns Équipe 1 et Équipe 2 sans sélection', () => {
    render(<PropertiesPanel />);
    expect(screen.getByText(EDITOR_LABELS.team1Label)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.team2Label)).toBeInTheDocument();
  });

  it('affiche le panneau quand un champ texte est sélectionné', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.getByTestId('properties-panel')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.propertiesPanelTitle)).toBeInTheDocument();
  });

  it('affiche les données du match même pour un champ texte', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.getByTestId('match-data-section')).toBeInTheDocument();
  });

  it('affiche les données du match pour un champ nom d\u2019équipe', () => {
    useScoreboardStore.getState().addCustomField(TEAM_NAME_ELEMENT, 50, 50, 600, 160);
    render(<PropertiesPanel />);
    expect(screen.getByTestId('match-data-section')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.propertiesPanelMatchData)).toBeInTheDocument();
  });

  it('affiche les dropdowns Équipe 1 et Équipe 2 pour un champ nom d\u2019équipe', () => {
    useScoreboardStore.getState().addCustomField(TEAM_NAME_ELEMENT, 50, 50, 600, 160);
    render(<PropertiesPanel />);
    expect(screen.getByText(EDITOR_LABELS.team1Label)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.team2Label)).toBeInTheDocument();
    expect(screen.getByTestId('team-nation-selector')).toBeInTheDocument();
  });

  it('affiche les dropdowns Équipe 1 et Équipe 2 pour un champ drapeau', () => {
    const FLAG_ELEMENT = {
      type: 'flag-display' as const,
      config: { side: 'left' as const },
    };
    useScoreboardStore.getState().addCustomField(FLAG_ELEMENT, 50, 50, 120, 80);
    render(<PropertiesPanel />);
    expect(screen.getByText(EDITOR_LABELS.team1Label)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.team2Label)).toBeInTheDocument();
    expect(screen.getByTestId('team-nation-selector')).toBeInTheDocument();
  });

  it('affiche les propriétés du champ sélectionné', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldPosition)).toBeInTheDocument();
  });

  it('ferme la sélection avec le bouton X', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    render(<PropertiesPanel />);

    const closeBtn = screen.getByTestId('properties-panel-close');
    await user.click(closeBtn);

    expect(useScoreboardStore.getState().customFieldsData.selectedFieldIds).toEqual([]);
  });

  it('affiche la barre multi-sélection quand 2+ champs sont sélectionnés', () => {
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 50, 50, 200, 100);
    useScoreboardStore.getState().addCustomField(TEXT_ELEMENT, 300, 50, 200, 100);
    const fields = useScoreboardStore.getState().customFieldsData.fields;
    useScoreboardStore.getState().selectCustomField(fields[0]!.id);
    useScoreboardStore.getState().toggleFieldSelection(fields[1]!.id);
    render(<PropertiesPanel />);

    expect(screen.getByText(CUSTOM_FIELD_LABELS.multiSelectionCount, { exact: false })).toBeInTheDocument();
  });
});

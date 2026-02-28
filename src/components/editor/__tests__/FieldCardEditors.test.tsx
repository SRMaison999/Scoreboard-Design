import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlayerCardEditor, PeriodScoreRowEditor } from '../FieldCardEditors';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';

function setupBroadcastChannel() {
  const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
    this.onmessage = null;
    this.postMessage = vi.fn();
    this.close = vi.fn();
  });
  vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
}

describe('PlayerCardEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'player-card' }> = {
    type: 'player-card',
    config: {
      title: '', subtitle: '', playerName: 'KOPITAR', playerNumber: '11',
      playerTeam: 'LAK', playerPhoto: '', stats: [],
      fontSize: 24, fontFamily: '', textColor: '#ffffff', titleColor: '#ffffff',
    },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche les champs de configuration de la fiche joueur', () => {
    render(<PlayerCardEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configCardTitle)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configCardSubtitle)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configCardPlayerName)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configCardPlayerNumber)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configCardPlayerTeam)).toBeInTheDocument();
  });

  it('affiche le message vide quand aucune statistique n\u2019existe', () => {
    render(<PlayerCardEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configCardEmptyStats)).toBeInTheDocument();
  });

  it('affiche le bouton d\u2019ajout de statistique', () => {
    render(<PlayerCardEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configCardAddStat)).toBeInTheDocument();
  });
});

describe('PeriodScoreRowEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'period-score-row' }> = {
    type: 'period-score-row',
    config: { periods: [], fontSize: 18, fontFamily: '', headerColor: '#ffffff', textColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche le message vide quand aucune période n\u2019existe', () => {
    render(<PeriodScoreRowEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPeriodScoreEmpty)).toBeInTheDocument();
  });

  it('affiche le bouton d\u2019ajout de période', () => {
    render(<PeriodScoreRowEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPeriodScoreAdd)).toBeInTheDocument();
  });

  it('affiche les champs de style', () => {
    render(<PeriodScoreRowEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPeriodScoreHeaderColor)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTextColor)).toBeInTheDocument();
  });
});

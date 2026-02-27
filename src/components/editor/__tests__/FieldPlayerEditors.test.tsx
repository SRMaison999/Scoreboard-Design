import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlayerRowEditor, PlayerListEditor } from '../FieldPlayerEditors';
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

describe('PlayerRowEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'player-row' }> = {
    type: 'player-row',
    config: { playerName: 'KOPITAR', playerNumber: '11', position: 'C', showNumber: true, showPosition: false, fontSize: 24, fontFamily: '', textColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche les champs de configuration du joueur', () => {
    render(<PlayerRowEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPlayerName)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPlayerNumber)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPlayerPosition)).toBeInTheDocument();
  });

  it('affiche les toggles showNumber et showPosition', () => {
    render(<PlayerRowEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPlayerShowNumber)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPlayerShowPosition)).toBeInTheDocument();
  });
});

describe('PlayerListEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'player-list' }> = {
    type: 'player-list',
    config: { title: '', players: [], showNumbers: true, showPositions: true, fontSize: 20, fontFamily: '', textColor: '#ffffff', titleColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche le message vide quand aucun joueur n\u2019existe', () => {
    render(<PlayerListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPlayerListEmpty)).toBeInTheDocument();
  });

  it('affiche le bouton d\u2019ajout de joueur', () => {
    render(<PlayerListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPlayerListAdd)).toBeInTheDocument();
  });

  it('affiche les toggles showNumbers et showPositions', () => {
    render(<PlayerListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPlayerListShowNumbers)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPlayerListShowPositions)).toBeInTheDocument();
  });
});

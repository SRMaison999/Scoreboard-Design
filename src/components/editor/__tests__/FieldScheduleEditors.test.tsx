import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScheduleMatchEditor, ScheduleListEditor } from '../FieldScheduleEditors';
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

describe('ScheduleMatchEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'schedule-match' }> = {
    type: 'schedule-match',
    config: { date: '25/02', time: '19:00', teamLeft: 'LAK', teamRight: 'MTL', scoreLeft: '', scoreRight: '', status: 'upcoming', venue: '', fontSize: 18, fontFamily: '', textColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche les champs de configuration du match', () => {
    render(<ScheduleMatchEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configMatchDate)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configMatchTime)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configMatchTeamLeft)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configMatchTeamRight)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configMatchStatus)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configMatchVenue)).toBeInTheDocument();
  });

  it('affiche les champs de score', () => {
    render(<ScheduleMatchEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configMatchScoreLeft)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configMatchScoreRight)).toBeInTheDocument();
  });
});

describe('ScheduleListEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'schedule-list' }> = {
    type: 'schedule-list',
    config: { title: '', matches: [], fontSize: 16, fontFamily: '', textColor: '#ffffff', titleColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche le message vide quand aucun match n\u2019existe', () => {
    render(<ScheduleListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configScheduleEmpty)).toBeInTheDocument();
  });

  it('affiche le bouton d\u2019ajout de match', () => {
    render(<ScheduleListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configScheduleAdd)).toBeInTheDocument();
  });

  it('affiche les champs titre et style', () => {
    render(<ScheduleListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configScheduleTitle)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configScheduleTitleColor)).toBeInTheDocument();
  });
});

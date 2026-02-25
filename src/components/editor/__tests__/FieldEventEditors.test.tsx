import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimelineEventEditor, TimelineListEditor } from '../FieldEventEditors';
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

describe('TimelineEventEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'timeline-event' }> = {
    type: 'timeline-event',
    config: { period: 'P1', time: '12:34', kind: 'goal', description: 'KOPITAR', team: 'LAK', fontSize: 18, textColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche les champs de configuration de l\u2019événement', () => {
    render(<TimelineEventEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configEventKind)).toBeInTheDocument();
    /* configEventPeriod et configEventKindPeriod partagent le même libellé */
    expect(screen.getAllByText(CUSTOM_FIELD_LABELS.configEventPeriod).length).toBeGreaterThan(0);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configEventTime)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configEventTeam)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configEventDescription)).toBeInTheDocument();
  });

  it('affiche les champs de style', () => {
    render(<TimelineEventEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTextFontSize)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTextColor)).toBeInTheDocument();
  });
});

describe('TimelineListEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'timeline-list' }> = {
    type: 'timeline-list',
    config: { title: '', events: [], fontSize: 16, textColor: '#ffffff', titleColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche le message vide quand aucun événement n\u2019existe', () => {
    render(<TimelineListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTimelineEmpty)).toBeInTheDocument();
  });

  it('affiche le bouton d\u2019ajout d\u2019événement', () => {
    render(<TimelineListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTimelineAdd)).toBeInTheDocument();
  });

  it('affiche les champs titre et style', () => {
    render(<TimelineListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTimelineTitle)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTimelineTitleColor)).toBeInTheDocument();
  });
});

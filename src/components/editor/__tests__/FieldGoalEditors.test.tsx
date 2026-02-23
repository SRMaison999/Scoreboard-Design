import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GoalScorerEditor, GoalAssistsEditor, GoalDetailsEditor } from '../FieldGoalEditors';
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

describe('GoalScorerEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'goal-scorer' }> = {
    type: 'goal-scorer',
    config: { scorerName: '', scorerNumber: '', scorerPhoto: '', showPhoto: true, showNumber: true, fontSize: 32, textColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche les champs du buteur', () => {
    render(<GoalScorerEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalScorerName)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalScorerNumber)).toBeInTheDocument();
  });

  it('affiche les toggles showNumber et showPhoto', () => {
    render(<GoalScorerEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalScorerShowNumber)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalScorerShowPhoto)).toBeInTheDocument();
  });
});

describe('GoalAssistsEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'goal-assists' }> = {
    type: 'goal-assists',
    config: { assist1Name: '', assist1Number: '', assist2Name: '', assist2Number: '', showNumbers: true, fontSize: 20, textColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche les champs des assistants', () => {
    render(<GoalAssistsEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalAssist1Name)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalAssist1Number)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalAssist2Name)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalAssist2Number)).toBeInTheDocument();
  });

  it('affiche le toggle showNumbers', () => {
    render(<GoalAssistsEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalAssistsShowNumbers)).toBeInTheDocument();
  });
});

describe('GoalDetailsEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'goal-details' }> = {
    type: 'goal-details',
    config: { goalTime: '', goalPeriod: '', goalCountMatch: '', goalCountTournament: '', showPeriod: true, showCount: true, fontSize: 20, textColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche les champs des d\u00e9tails du but', () => {
    render(<GoalDetailsEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalTime)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalPeriod)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalCountMatch)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalCountTournament)).toBeInTheDocument();
  });

  it('affiche les toggles showPeriod et showCount', () => {
    render(<GoalDetailsEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalShowPeriod)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configGoalShowCount)).toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  StatLineDataEditor,
  BarCompareDataEditor,
  PenaltyColumnEditor,
  HeaderBlockFullEditor,
  BodyTypeEmbeddedInfo,
} from '../FieldDataEditors';
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

/* ------------------------------------------------------------------ */
/*  StatLineDataEditor                                                 */
/* ------------------------------------------------------------------ */

describe('StatLineDataEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'stat-line' }> = {
    type: 'stat-line',
    config: { statIndex: 0 },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().clearContent();
  });

  it('affiche le sélecteur d\u2019index', () => {
    render(<StatLineDataEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configStatIndex)).toBeInTheDocument();
  });

  it('affiche le message vide quand aucune stat n\u2019existe', () => {
    render(<StatLineDataEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configStatEmpty)).toBeInTheDocument();
  });

  it('affiche le bouton d\u2019ajout', () => {
    render(<StatLineDataEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByTestId('stat-add-btn')).toBeInTheDocument();
  });

  it('affiche les champs de la stat après ajout', () => {
    useScoreboardStore.getState().addStat();
    render(<StatLineDataEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configStatLabel)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configStatValLeft)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configStatValRight)).toBeInTheDocument();
  });

  it('ajoute une stat via le bouton', async () => {
    const user = userEvent.setup();
    render(<StatLineDataEditor fieldId="f1" element={ELEMENT} />);
    await user.click(screen.getByTestId('stat-add-btn'));
    expect(useScoreboardStore.getState().stats.length).toBe(1);
  });
});

/* ------------------------------------------------------------------ */
/*  BarCompareDataEditor                                               */
/* ------------------------------------------------------------------ */

describe('BarCompareDataEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'bar-compare' }> = {
    type: 'bar-compare',
    config: { barIndex: 0 },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().clearContent();
  });

  it('affiche le sélecteur d\u2019index', () => {
    render(<BarCompareDataEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configBarIndex)).toBeInTheDocument();
  });

  it('affiche le message vide quand aucune barre n\u2019existe', () => {
    render(<BarCompareDataEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configBarEmpty)).toBeInTheDocument();
  });

  it('affiche le bouton d\u2019ajout', () => {
    render(<BarCompareDataEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByTestId('bar-add-btn')).toBeInTheDocument();
  });

  it('affiche les champs de la barre après ajout', () => {
    useScoreboardStore.getState().addBarChartRow();
    render(<BarCompareDataEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configBarLabel)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configBarValLeft)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configBarValRight)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configBarFormat)).toBeInTheDocument();
  });

  it('ajoute une barre via le bouton', async () => {
    const user = userEvent.setup();
    render(<BarCompareDataEditor fieldId="f1" element={ELEMENT} />);
    await user.click(screen.getByTestId('bar-add-btn'));
    expect(useScoreboardStore.getState().barChartData.rows.length).toBe(1);
  });
});

/* ------------------------------------------------------------------ */
/*  PenaltyColumnEditor                                                */
/* ------------------------------------------------------------------ */

describe('PenaltyColumnEditor', () => {
  const ELEMENT_LEFT: Extract<FieldElementConfig, { type: 'penalty-column' }> = {
    type: 'penalty-column',
    config: { side: 'left' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().clearContent();
  });

  it('affiche le message vide quand aucune pénalité n\u2019existe', () => {
    render(<PenaltyColumnEditor element={ELEMENT_LEFT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configPenaltyEmpty)).toBeInTheDocument();
  });

  it('affiche le bouton d\u2019ajout', () => {
    render(<PenaltyColumnEditor element={ELEMENT_LEFT} />);
    expect(screen.getByTestId('penalty-add-btn')).toBeInTheDocument();
  });

  it('ajoute une pénalité via le bouton', async () => {
    const user = userEvent.setup();
    render(<PenaltyColumnEditor element={ELEMENT_LEFT} />);
    await user.click(screen.getByTestId('penalty-add-btn'));
    expect(useScoreboardStore.getState().penaltiesLeft.length).toBe(1);
  });

  it('affiche les champs temps et numéro après ajout', () => {
    useScoreboardStore.getState().addPenalty('left');
    render(<PenaltyColumnEditor element={ELEMENT_LEFT} />);
    expect(screen.queryByText(CUSTOM_FIELD_LABELS.configPenaltyEmpty)).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('2:00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/*  HeaderBlockFullEditor                                              */
/* ------------------------------------------------------------------ */

describe('HeaderBlockFullEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'header-block' }> = {
    type: 'header-block',
    config: { showClock: true },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche l\u2019indice d\u2019aide', () => {
    render(<HeaderBlockFullEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configHeaderTeamsHint)).toBeInTheDocument();
  });

  it('affiche la checkbox horloge cochée', () => {
    render(<HeaderBlockFullEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configShowClock)).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    const clockCheckbox = checkboxes.find((cb) => {
      const label = cb.closest('label');
      return label?.textContent?.includes(CUSTOM_FIELD_LABELS.configShowClock);
    });
    expect(clockCheckbox).toBeChecked();
  });

  it('affiche les champs d\u2019horloge', () => {
    render(<HeaderBlockFullEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configClockTime)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configClockPeriod)).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/*  BodyTypeEmbeddedInfo                                               */
/* ------------------------------------------------------------------ */

describe('BodyTypeEmbeddedInfo', () => {
  it('affiche le numéro du body type imbriqué', () => {
    const element = { type: 'body-type-5', config: {} } as FieldElementConfig;
    render(<BodyTypeEmbeddedInfo element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configBodyTypeEmbedded)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('affiche l\u2019indice explicatif', () => {
    const element = { type: 'body-type-14', config: {} } as FieldElementConfig;
    render(<BodyTypeEmbeddedInfo element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configBodyTypeEmbeddedHint)).toBeInTheDocument();
  });

  it('affiche un ? pour un type invalide', () => {
    const element = { type: 'unknown-type', config: {} } as unknown as FieldElementConfig;
    render(<BodyTypeEmbeddedInfo element={element} />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});

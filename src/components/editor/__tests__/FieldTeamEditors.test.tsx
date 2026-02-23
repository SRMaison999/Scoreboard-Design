import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StaffRowEditor, StaffListEditor, DataTableEditor } from '../FieldTeamEditors';
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

describe('StaffRowEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'staff-row' }> = {
    type: 'staff-row',
    config: { role: '', name: '', fontSize: 20, textColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche les champs r\u00f4le et nom', () => {
    render(<StaffRowEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configStaffRole)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configStaffName)).toBeInTheDocument();
  });
});

describe('StaffListEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'staff-list' }> = {
    type: 'staff-list',
    config: { title: '', members: [], fontSize: 18, textColor: '#ffffff', titleColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche le message vide quand aucun membre n\u2019existe', () => {
    render(<StaffListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configStaffListEmpty)).toBeInTheDocument();
  });

  it('affiche le bouton d\u2019ajout de membre', () => {
    render(<StaffListEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configStaffListAdd)).toBeInTheDocument();
  });
});

describe('DataTableEditor', () => {
  const ELEMENT: Extract<FieldElementConfig, { type: 'data-table' }> = {
    type: 'data-table',
    config: { title: '', columns: [], rows: [], showHeader: true, fontSize: 16, headerColor: '#ffffff', textColor: '#ffffff' },
  };

  beforeEach(() => {
    setupBroadcastChannel();
    useScoreboardStore.getState().resetState();
  });

  it('affiche le champ titre et le toggle showHeader', () => {
    render(<DataTableEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTableTitle)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTableShowHeader)).toBeInTheDocument();
  });

  it('affiche le message vide quand aucune colonne n\u2019existe', () => {
    render(<DataTableEditor fieldId="f1" element={ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTableEmptyColumns)).toBeInTheDocument();
  });

  it('affiche le bouton d\u2019ajout de colonne', () => {
    render(<DataTableEditor fieldId="f1" element={ELEMENT} />);
    const buttons = screen.getAllByText(CUSTOM_FIELD_LABELS.configTableAddColumn);
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});

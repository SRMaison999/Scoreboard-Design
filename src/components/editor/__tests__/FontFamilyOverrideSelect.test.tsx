import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FontFamilyOverrideSelect } from '../FontFamilyOverrideSelect';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { FONT_OPTIONS, FONT_CATEGORY_LABELS } from '@/constants/fonts';
import type { FieldElementConfig } from '@/types/customField';

const SCORE_ELEMENT: Extract<FieldElementConfig, { type: 'score-display' }> = {
  type: 'score-display',
  config: {
    side: 'left',
    showLabel: false,
    fontSizeOverride: 0,
    fontFamily: '',
  },
};

const TEXT_ELEMENT: Extract<FieldElementConfig, { type: 'text-block' }> = {
  type: 'text-block',
  config: {
    content: 'Test',
    fontSize: 24,
    fontWeight: 400,
    fontFamily: "'Oswald', sans-serif",
    textAlign: 'center',
    textTransform: 'none',
    letterSpacing: 0,
    textColor: '#ffffff',
  },
};

describe('FontFamilyOverrideSelect', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('affiche le label de police', () => {
    render(<FontFamilyOverrideSelect fieldId="f1" element={SCORE_ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configFontFamily)).toBeInTheDocument();
  });

  it('affiche le placeholder "Police globale" quand fontFamily est vide', () => {
    render(<FontFamilyOverrideSelect fieldId="f1" element={SCORE_ELEMENT} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('');
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configFontFamilyGlobal)).toBeInTheDocument();
  });

  it('affiche la police sélectionnée quand fontFamily est définie', () => {
    render(<FontFamilyOverrideSelect fieldId="f1" element={TEXT_ELEMENT} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue("'Oswald', sans-serif");
  });

  it('affiche les groupes de catégories de polices', () => {
    render(<FontFamilyOverrideSelect fieldId="f1" element={SCORE_ELEMENT} />);
    for (const label of Object.values(FONT_CATEGORY_LABELS)) {
      expect(screen.getByRole('group', { name: label })).toBeInTheDocument();
    }
  });

  it('affiche toutes les polices disponibles comme options', () => {
    render(<FontFamilyOverrideSelect fieldId="f1" element={SCORE_ELEMENT} />);
    for (const font of FONT_OPTIONS) {
      expect(screen.getByRole('option', { name: font.label })).toBeInTheDocument();
    }
  });

  it('appelle updateCustomFieldElement quand une police est sélectionnée', async () => {
    const user = userEvent.setup();
    const updateSpy = vi.fn();
    useScoreboardStore.setState({ updateCustomFieldElement: updateSpy });

    render(<FontFamilyOverrideSelect fieldId="f1" element={SCORE_ELEMENT} />);
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, "'Oswald', sans-serif");

    expect(updateSpy).toHaveBeenCalledWith('f1', {
      ...SCORE_ELEMENT,
      config: { ...SCORE_ELEMENT.config, fontFamily: "'Oswald', sans-serif" },
    });
  });

  it('appelle updateCustomFieldElement avec chaîne vide pour revenir à la police globale', async () => {
    const user = userEvent.setup();
    const updateSpy = vi.fn();
    useScoreboardStore.setState({ updateCustomFieldElement: updateSpy });

    render(<FontFamilyOverrideSelect fieldId="f1" element={TEXT_ELEMENT} />);
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '');

    expect(updateSpy).toHaveBeenCalledWith('f1', {
      ...TEXT_ELEMENT,
      config: { ...TEXT_ELEMENT.config, fontFamily: '' },
    });
  });
});

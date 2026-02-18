import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomFieldsSection } from '../CustomFieldsSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

describe('CustomFieldsSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('rend la section principale', () => {
    render(<CustomFieldsSection />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.sectionCustomFields)).toBeInTheDocument();
  });

  it('affiche les options du canvas', () => {
    render(<CustomFieldsSection />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.fullPageMode)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.snapToGrid)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.showGuides)).toBeInTheDocument();
  });

  it('affiche la section couches', () => {
    render(<CustomFieldsSection />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.layersTitle)).toBeInTheDocument();
  });

  it('n\'affiche pas les propriétés sans champ sélectionné', () => {
    render(<CustomFieldsSection />);
    expect(screen.queryByText(CUSTOM_FIELD_LABELS.fieldProperties)).not.toBeInTheDocument();
  });

  it('affiche les propriétés quand un champ est sélectionné', () => {
    const element = { type: 'text-block' as const, config: { content: 'test', fontSize: 20, fontWeight: 400, textAlign: 'center' as const, textTransform: 'none' as const, letterSpacing: 0 } };
    useScoreboardStore.getState().addCustomField(element, 50, 50, 200, 100);
    render(<CustomFieldsSection />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldProperties)).toBeInTheDocument();
  });

  it('toggle le mode pleine page', async () => {
    const user = userEvent.setup();
    render(<CustomFieldsSection />);

    const checkbox = screen.getByRole('checkbox', { name: new RegExp(CUSTOM_FIELD_LABELS.fullPageMode) });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(useScoreboardStore.getState().customFieldsData.fullPageMode).toBe(true);
  });
});

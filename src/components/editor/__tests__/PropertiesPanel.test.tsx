import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropertiesPanel } from '../PropertiesPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

describe('PropertiesPanel', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('ne rend rien sans champ sélectionné', () => {
    const { container } = render(<PropertiesPanel />);
    expect(container.firstChild).toBeNull();
  });

  it('affiche le panneau quand un champ est sélectionné', () => {
    const element = {
      type: 'text-block' as const,
      config: {
        content: 'test', fontSize: 20, fontWeight: 400,
        textAlign: 'center' as const, textTransform: 'none' as const,
        letterSpacing: 0,
      },
    };
    useScoreboardStore.getState().addCustomField(element, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.getByTestId('properties-panel')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.propertiesPanelTitle)).toBeInTheDocument();
  });

  it('affiche les propriétés du champ sélectionné', () => {
    const element = {
      type: 'text-block' as const,
      config: {
        content: 'test', fontSize: 20, fontWeight: 400,
        textAlign: 'center' as const, textTransform: 'none' as const,
        letterSpacing: 0,
      },
    };
    useScoreboardStore.getState().addCustomField(element, 50, 50, 200, 100);
    render(<PropertiesPanel />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldProperties)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldPosition)).toBeInTheDocument();
  });

  it('ferme le panneau avec le bouton X', async () => {
    const user = userEvent.setup();
    const element = {
      type: 'text-block' as const,
      config: {
        content: 'test', fontSize: 20, fontWeight: 400,
        textAlign: 'center' as const, textTransform: 'none' as const,
        letterSpacing: 0,
      },
    };
    useScoreboardStore.getState().addCustomField(element, 50, 50, 200, 100);
    render(<PropertiesPanel />);

    const closeBtn = screen.getByTitle(CUSTOM_FIELD_LABELS.propertiesPanelClose);
    await user.click(closeBtn);

    expect(useScoreboardStore.getState().customFieldsData.selectedFieldId).toBeNull();
  });
});

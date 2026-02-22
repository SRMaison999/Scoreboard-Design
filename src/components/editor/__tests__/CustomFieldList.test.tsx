import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomFieldList } from '../CustomFieldList';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';

const textElement: FieldElementConfig = {
  type: 'text-block',
  config: { content: 'test', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center', textTransform: 'none', letterSpacing: 0, textColor: '#ffffff' },
};

describe('CustomFieldList', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('affiche un message si aucun champ', () => {
    useScoreboardStore.getState().selectCustomField(null);
    render(<CustomFieldList />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.libraryEmpty)).toBeInTheDocument();
  });

  it('affiche les champs existants', () => {
    useScoreboardStore.getState().addCustomField(textElement, 0, 0, 200, 100);
    useScoreboardStore.getState().addCustomField(textElement, 100, 100, 200, 100);

    render(<CustomFieldList />);
    const fields = useScoreboardStore.getState().customFieldsData.fields;
    for (const field of fields) {
      expect(screen.getByText(field.label)).toBeInTheDocument();
    }
  });

  it('sélectionne un champ au clic', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().addCustomField(textElement, 0, 0, 200, 100);
    useScoreboardStore.getState().selectCustomField(null);

    render(<CustomFieldList />);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];
    if (field) {
      await user.click(screen.getByText(field.label));
      expect(useScoreboardStore.getState().customFieldsData.selectedFieldIds).toEqual([field.id]);
    }
  });

  it('affiche le z-index de chaque champ', () => {
    useScoreboardStore.getState().addCustomField(textElement, 0, 0, 200, 100);

    render(<CustomFieldList />);
    expect(screen.getByText('z1')).toBeInTheDocument();
  });

  it('affiche les boutons de visibilité, verrouillage et suppression', () => {
    useScoreboardStore.getState().addCustomField(textElement, 0, 0, 200, 100);

    render(<CustomFieldList />);
    expect(screen.getByTitle(CUSTOM_FIELD_LABELS.fieldVisible)).toBeInTheDocument();
    expect(screen.getByTitle(CUSTOM_FIELD_LABELS.fieldLocked)).toBeInTheDocument();
    expect(screen.getByTitle(CUSTOM_FIELD_LABELS.fieldDelete)).toBeInTheDocument();
  });

  it('affiche le data-testid de la liste', () => {
    useScoreboardStore.getState().addCustomField(textElement, 0, 0, 200, 100);
    render(<CustomFieldList />);
    expect(screen.getByTestId('custom-field-list')).toBeInTheDocument();
  });

  it('active le renommage au double-clic sur le label', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().addCustomField(textElement, 0, 0, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];
    if (!field) return;

    render(<CustomFieldList />);
    const label = screen.getByText(field.label);
    await user.dblClick(label);

    expect(screen.getByTestId('layer-rename-input')).toBeInTheDocument();
  });

  it('renomme un champ après double-clic et Enter', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().addCustomField(textElement, 0, 0, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];
    if (!field) return;

    render(<CustomFieldList />);
    await user.dblClick(screen.getByText(field.label));

    const input = screen.getByTestId('layer-rename-input');
    await user.clear(input);
    await user.type(input, 'Nouveau nom');
    await user.keyboard('{Enter}');

    expect(useScoreboardStore.getState().customFieldsData.fields[0]?.label).toBe('Nouveau nom');
  });

  it('affiche l\'indicateur de multi-sélection quand 2+ champs sélectionnés', () => {
    useScoreboardStore.getState().addCustomField(textElement, 0, 0, 200, 100);
    useScoreboardStore.getState().addCustomField(textElement, 100, 0, 200, 100);
    const fields = useScoreboardStore.getState().customFieldsData.fields;
    useScoreboardStore.getState().selectCustomField(fields[0]!.id);
    useScoreboardStore.getState().toggleFieldSelection(fields[1]!.id);

    render(<CustomFieldList />);
    expect(screen.getByTestId('multi-select-indicator')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('ne montre pas l\'indicateur avec un seul champ sélectionné', () => {
    useScoreboardStore.getState().addCustomField(textElement, 0, 0, 200, 100);
    render(<CustomFieldList />);
    expect(screen.queryByTestId('multi-select-indicator')).not.toBeInTheDocument();
  });

  it('annule le renommage avec Echap', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().addCustomField(textElement, 0, 0, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];
    if (!field) return;
    const originalLabel = field.label;

    render(<CustomFieldList />);
    await user.dblClick(screen.getByText(originalLabel));

    const input = screen.getByTestId('layer-rename-input');
    await user.clear(input);
    await user.type(input, 'Annulé');
    await user.keyboard('{Escape}');

    expect(useScoreboardStore.getState().customFieldsData.fields[0]?.label).toBe(originalLabel);
  });
});

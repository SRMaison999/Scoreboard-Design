import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomFieldList } from '../CustomFieldList';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';

const textElement: FieldElementConfig = {
  type: 'text-block',
  config: { content: 'test', fontSize: 20, fontWeight: 400, textAlign: 'center', textTransform: 'none', letterSpacing: 0 },
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
      expect(useScoreboardStore.getState().customFieldsData.selectedFieldId).toBe(field.id);
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
});

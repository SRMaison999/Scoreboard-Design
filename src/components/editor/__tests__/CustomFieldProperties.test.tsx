import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomFieldProperties } from '../CustomFieldProperties';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';

const textElement: FieldElementConfig = {
  type: 'text-block',
  config: { content: 'test', fontSize: 20, fontWeight: 400, textAlign: 'center', textTransform: 'none', letterSpacing: 0 },
};

describe('CustomFieldProperties', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('ne rend rien si le champ n\'existe pas', () => {
    const { container } = render(<CustomFieldProperties fieldId="inexistant" />);
    expect(container.innerHTML).toBe('');
  });

  it('affiche les propriétés du champ sélectionné', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldPosition)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldSize)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldZIndex)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldStyleTitle)).toBeInTheDocument();
    }
  });

  it('affiche les boutons dupliquer et supprimer', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldDuplicate)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldDelete)).toBeInTheDocument();
    }
  });

  it('affiche les labels de position X et Y', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldX)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldY)).toBeInTheDocument();
    }
  });

  it('affiche les labels de taille largeur et hauteur', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldWidth)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldHeight)).toBeInTheDocument();
    }
  });

  it('affiche les labels de style', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldBgColor)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldBorderColor)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldBorderWidth)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldBorderRadius)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldPadding)).toBeInTheDocument();
    }
  });
});

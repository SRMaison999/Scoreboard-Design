import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomFieldProperties } from '../CustomFieldProperties';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';

const textElement: FieldElementConfig = {
  type: 'text-block',
  config: { content: 'test', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center', textTransform: 'none', letterSpacing: 0 },
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

  it('affiche les propri\u00e9t\u00e9s de position du champ s\u00e9lectionn\u00e9', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldPosition)).toBeInTheDocument();
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

  it('affiche la section d\'ordre d\'affichage avec les boutons', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.getByText(CUSTOM_FIELD_LABELS.zIndexOrderTitle)).toBeInTheDocument();
      expect(screen.getByTestId('z-index-buttons')).toBeInTheDocument();
    }
  });

  it('affiche les boutons de z-index', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.getByTitle(CUSTOM_FIELD_LABELS.zIndexBringToFront)).toBeInTheDocument();
      expect(screen.getByTitle(CUSTOM_FIELD_LABELS.zIndexBringForward)).toBeInTheDocument();
      expect(screen.getByTitle(CUSTOM_FIELD_LABELS.zIndexSendBackward)).toBeInTheDocument();
      expect(screen.getByTitle(CUSTOM_FIELD_LABELS.zIndexSendToBack)).toBeInTheDocument();
    }
  });

  it('affiche les labels de style dans la section repliable', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      /* La section style est ferm\u00e9e par d\u00e9faut, ouvrons-la */
      const styleButton = screen.getByText(CUSTOM_FIELD_LABELS.fieldStyleTitle);
      fireEvent.click(styleButton);
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldBgColor)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldBorderColor)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldBorderWidth)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldBorderRadius)).toBeInTheDocument();
      expect(screen.getByText(CUSTOM_FIELD_LABELS.fieldPadding)).toBeInTheDocument();
    }
  });

  it('affiche le label lisible du type d element', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.getByText('Bloc de texte')).toBeInTheDocument();
    }
  });

  it('affiche la section rotation avec la valeur par defaut 0', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      const input = screen.getByTestId('rotation-input') as HTMLInputElement;
      expect(input.value).toBe('0');
    }
  });

  it('ne montre pas le bouton de reinitialisation quand la rotation est 0', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.queryByTestId('rotation-reset')).not.toBeInTheDocument();
    }
  });

  it('montre le bouton de reinitialisation quand la rotation n\'est pas 0', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      useScoreboardStore.getState().updateCustomFieldProp(field.id, 'rotation', 45);
      render(<CustomFieldProperties fieldId={field.id} />);
      expect(screen.getByTestId('rotation-reset')).toBeInTheDocument();
    }
  });

  it('met a jour la rotation via l\'input', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      render(<CustomFieldProperties fieldId={field.id} />);
      const input = screen.getByTestId('rotation-input');
      fireEvent.change(input, { target: { value: '90' } });
      const updated = useScoreboardStore.getState().customFieldsData.fields[0];
      expect(updated?.rotation).toBe(90);
    }
  });

  it('reinitialise la rotation a 0 avec le bouton', () => {
    useScoreboardStore.getState().addCustomField(textElement, 50, 60, 200, 100);
    const field = useScoreboardStore.getState().customFieldsData.fields[0];

    if (field) {
      useScoreboardStore.getState().updateCustomFieldProp(field.id, 'rotation', 45);
      render(<CustomFieldProperties fieldId={field.id} />);
      fireEvent.click(screen.getByTestId('rotation-reset'));
      const updated = useScoreboardStore.getState().customFieldsData.fields[0];
      expect(updated?.rotation).toBe(0);
    }
  });
});

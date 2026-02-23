import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextBlockEditor } from '../FieldTextEditor';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';

const TEXT_ELEMENT: Extract<FieldElementConfig, { type: 'text-block' }> = {
  type: 'text-block',
  config: {
    content: 'Test',
    fontSize: 24,
    fontWeight: 400,
    fontFamily: '',
    textAlign: 'center',
    textTransform: 'none',
    letterSpacing: 0,
    textColor: '#ffffff',
  },
};

describe('TextBlockEditor', () => {
  it('affiche le champ de contenu', () => {
    render(<TextBlockEditor fieldId="f1" element={TEXT_ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTextContent)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });

  it('affiche les contrôles de police', () => {
    render(<TextBlockEditor fieldId="f1" element={TEXT_ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTextFontSize)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTextFontWeight)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configFontFamily)).toBeInTheDocument();
  });

  it('affiche les contrôles d\u2019alignement et de casse', () => {
    render(<TextBlockEditor fieldId="f1" element={TEXT_ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTextAlign)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTextTransform)).toBeInTheDocument();
  });

  it('affiche les contrôles de couleur et espacement', () => {
    render(<TextBlockEditor fieldId="f1" element={TEXT_ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTextLetterSpacing)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configTextColor)).toBeInTheDocument();
  });
});

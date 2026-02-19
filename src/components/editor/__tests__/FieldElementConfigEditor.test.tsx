import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldElementConfigEditor } from '../FieldElementConfigEditor';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';

describe('FieldElementConfigEditor', () => {
  it('affiche l editeur de texte pour un text-block', () => {
    const element: FieldElementConfig = {
      type: 'text-block',
      config: {
        content: 'Hello',
        fontSize: 24,
        fontWeight: 600,
        textAlign: 'center',
        textTransform: 'none',
        letterSpacing: 0,
      },
    };
    render(<FieldElementConfigEditor fieldId="f1" element={element} />);
    expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
  });

  it('affiche le selecteur de cote pour un score-display', () => {
    const element: FieldElementConfig = {
      type: 'score-display',
      config: { side: 'left', showLabel: false, fontSizeOverride: 0 },
    };
    render(<FieldElementConfigEditor fieldId="f1" element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configSide)).toBeInTheDocument();
  });

  it('affiche l editeur de forme pour un shape-block', () => {
    const element: FieldElementConfig = {
      type: 'shape-block',
      config: { shape: 'rectangle', fillColor: '#ffffff', fillOpacity: 80, borderColor: '', borderWidth: 0, borderRadius: 0 },
    };
    render(<FieldElementConfigEditor fieldId="f1" element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configShapeType)).toBeInTheDocument();
  });

  it('affiche l editeur de separateur', () => {
    const element: FieldElementConfig = {
      type: 'separator-line',
      config: { orientation: 'horizontal', thickness: 2, lineColor: '#ffffff', lineOpacity: 50 },
    };
    render(<FieldElementConfigEditor fieldId="f1" element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configSeparatorOrientation)).toBeInTheDocument();
  });

  it('affiche l editeur d image', () => {
    const element: FieldElementConfig = {
      type: 'image-block',
      config: { src: '', objectFit: 'cover' },
    };
    render(<FieldElementConfigEditor fieldId="f1" element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configImageFit)).toBeInTheDocument();
  });

  it('affiche l editeur de header-block avec la checkbox horloge', () => {
    const element: FieldElementConfig = {
      type: 'header-block',
      config: { showClock: true },
    };
    render(<FieldElementConfigEditor fieldId="f1" element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configShowClock)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('affiche l editeur de header-block avec horloge desactivee', () => {
    const element: FieldElementConfig = {
      type: 'header-block',
      config: { showClock: false },
    };
    render(<FieldElementConfigEditor fieldId="f1" element={element} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('affiche l editeur de clock-display avec les checkboxes', () => {
    const element: FieldElementConfig = {
      type: 'clock-display',
      config: { showPeriod: true, showBox: false, fontSizeOverride: 0 },
    };
    render(<FieldElementConfigEditor fieldId="f1" element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configShowPeriod)).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configShowBox)).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('ne rend rien pour un type sans editeur specifique', () => {
    const element: FieldElementConfig = {
      type: 'timeout-display',
      config: {},
    };
    const { container } = render(<FieldElementConfigEditor fieldId="f1" element={element} />);
    expect(container.innerHTML).toBe('');
  });
});

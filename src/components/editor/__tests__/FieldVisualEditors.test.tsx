import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShapeEditor, SeparatorEditor, ImageEditor } from '../FieldVisualEditors';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig } from '@/types/customField';

describe('ShapeEditor', () => {
  it('affiche le selecteur de forme', () => {
    const element = {
      type: 'shape-block' as const,
      config: { shape: 'rectangle' as const, fillColor: '#ffffff', fillOpacity: 80, borderColor: '', borderWidth: 0, borderRadius: 0 },
    };
    render(<ShapeEditor fieldId="f1" element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configShapeType)).toBeInTheDocument();
  });
});

describe('SeparatorEditor', () => {
  it('affiche le selecteur d orientation', () => {
    const element: Extract<FieldElementConfig, { type: 'separator-line' }> = {
      type: 'separator-line',
      config: { orientation: 'horizontal', thickness: 2, lineColor: '#ffffff', lineOpacity: 50 },
    };
    render(<SeparatorEditor fieldId="f1" element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configSeparatorOrientation)).toBeInTheDocument();
  });
});

describe('ImageEditor', () => {
  it('affiche le selecteur d ajustement', () => {
    const element: Extract<FieldElementConfig, { type: 'image-block' }> = {
      type: 'image-block',
      config: { src: '', objectFit: 'cover' },
    };
    render(<ImageEditor fieldId="f1" element={element} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configImageFit)).toBeInTheDocument();
  });
});

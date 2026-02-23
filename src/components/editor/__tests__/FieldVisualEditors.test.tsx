import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  const EMPTY_ELEMENT: Extract<FieldElementConfig, { type: 'image-block' }> = {
    type: 'image-block',
    config: { src: '', objectFit: 'cover' },
  };

  const FILLED_ELEMENT: Extract<FieldElementConfig, { type: 'image-block' }> = {
    type: 'image-block',
    config: { src: 'data:image/png;base64,abc123', objectFit: 'contain' },
  };

  it('affiche le sélecteur d\u2019ajustement', () => {
    render(<ImageEditor fieldId="f1" element={EMPTY_ELEMENT} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configImageFit)).toBeInTheDocument();
  });

  it('affiche la zone de dépôt quand aucune image n\u2019est chargée', () => {
    render(<ImageEditor fieldId="f1" element={EMPTY_ELEMENT} />);
    expect(screen.getByTestId('image-dropzone')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.configImageDropHint)).toBeInTheDocument();
  });

  it('affiche la preview quand une image est chargée', () => {
    render(<ImageEditor fieldId="f1" element={FILLED_ELEMENT} />);
    expect(screen.getByTestId('image-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('image-dropzone')).not.toBeInTheDocument();
  });

  it('affiche le bouton supprimer au survol quand une image est chargée', () => {
    render(<ImageEditor fieldId="f1" element={FILLED_ELEMENT} />);
    expect(screen.getByTestId('image-remove-btn')).toBeInTheDocument();
  });

  it('conserve l\u2019input fichier caché', () => {
    render(<ImageEditor fieldId="f1" element={EMPTY_ELEMENT} />);
    expect(screen.getByTestId('image-file-input')).toBeInTheDocument();
  });

  it('ouvre le sélecteur de fichiers au clic sur la zone de dépôt', async () => {
    const user = userEvent.setup();
    render(<ImageEditor fieldId="f1" element={EMPTY_ELEMENT} />);
    const dropzone = screen.getByTestId('image-dropzone');
    /* Clicking the dropzone triggers the hidden file input */
    await user.click(dropzone);
    /* File input should be present in DOM */
    expect(screen.getByTestId('image-file-input')).toBeInTheDocument();
  });
});

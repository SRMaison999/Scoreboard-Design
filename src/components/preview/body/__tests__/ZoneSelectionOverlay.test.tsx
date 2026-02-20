import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ZoneSelectionOverlay } from '../ZoneSelectionOverlay';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

describe('ZoneSelectionOverlay', () => {
  it('affiche l\'overlay de s\u00e9lection de zone', () => {
    render(<ZoneSelectionOverlay drawing={false} currentRect={null} />);
    expect(screen.getByTestId('zone-selection-overlay')).toBeInTheDocument();
  });

  it('affiche l\'indication textuelle quand pas en train de dessiner', () => {
    render(<ZoneSelectionOverlay drawing={false} currentRect={null} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.zoneSelectHint)).toBeInTheDocument();
  });

  it('masque l\'indication textuelle pendant le dessin', () => {
    render(<ZoneSelectionOverlay drawing currentRect={{ x: 10, y: 10, width: 50, height: 50 }} />);
    expect(screen.queryByText(CUSTOM_FIELD_LABELS.zoneSelectHint)).not.toBeInTheDocument();
  });

  it('affiche le rectangle de s\u00e9lection quand fourni', () => {
    render(<ZoneSelectionOverlay drawing currentRect={{ x: 20, y: 30, width: 100, height: 80 }} />);
    expect(screen.getByTestId('zone-selection-rect')).toBeInTheDocument();
  });

  it('ne rend pas le rectangle quand null', () => {
    render(<ZoneSelectionOverlay drawing={false} currentRect={null} />);
    expect(screen.queryByTestId('zone-selection-rect')).not.toBeInTheDocument();
  });
});

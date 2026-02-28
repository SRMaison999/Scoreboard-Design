import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType16 } from '@/components/preview/body/BodyType16';
import { DEFAULT_SPECTATORS_DATA } from '@/types/bodyTypes/spectators';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  spectatorsData: DEFAULT_SPECTATORS_DATA,
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType16', () => {
  it('affiche le titre', () => {
    render(<BodyType16 {...baseProps} />);
    expect(screen.getByText('ATTENDANCE')).toBeInTheDocument();
  });

  it('affiche le nombre de spectateurs', () => {
    render(<BodyType16 {...baseProps} />);
    expect(screen.getByText('8 247')).toBeInTheDocument();
  });

  it('affiche le lieu quand activ\u00e9', () => {
    render(<BodyType16 {...baseProps} />);
    expect(screen.getByText('Hallenstadion')).toBeInTheDocument();
  });

  it('masque le lieu quand d\u00e9sactiv\u00e9', () => {
    const props = {
      ...baseProps,
      spectatorsData: { ...DEFAULT_SPECTATORS_DATA, showVenue: false },
    };
    render(<BodyType16 {...props} />);
    expect(screen.queryByText('Hallenstadion')).not.toBeInTheDocument();
  });

  it('affiche la capacit\u00e9 quand activ\u00e9e', () => {
    render(<BodyType16 {...baseProps} />);
    expect(screen.getByText(/11 200/)).toBeInTheDocument();
  });

  it('affiche le preset banni\u00e8re', () => {
    const props = {
      ...baseProps,
      spectatorsData: { ...DEFAULT_SPECTATORS_DATA, preset: 'banner' as const },
    };
    render(<BodyType16 {...props} />);
    expect(screen.getByText('8 247')).toBeInTheDocument();
    expect(screen.getByText('SPECTATEURS')).toBeInTheDocument();
  });

  it('affiche le preset compact', () => {
    const props = {
      ...baseProps,
      spectatorsData: { ...DEFAULT_SPECTATORS_DATA, preset: 'compact' as const },
    };
    render(<BodyType16 {...props} />);
    expect(screen.getByText('8 247')).toBeInTheDocument();
  });

  it('g\u00e8re des donn\u00e9es vides', () => {
    const props = {
      ...baseProps,
      spectatorsData: {
        title: '',
        preset: 'centered' as const,
        count: '',
        venue: '',
        capacity: '',
        showVenue: false,
        showCapacity: false,
        label: '',
        styleOverrides: {},
      },
    };
    const { container } = render(<BodyType16 {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType13 } from '@/components/preview/body/BodyType13';
import { DEFAULT_SCHEDULE_DATA } from '@/types/bodyTypes/schedule';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  scheduleData: DEFAULT_SCHEDULE_DATA,
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType13', () => {
  it('affiche le titre', () => {
    render(<BodyType13 {...baseProps} />);
    expect(screen.getByText('UPCOMING MATCHES')).toBeInTheDocument();
  });

  it('affiche les équipes', () => {
    render(<BodyType13 {...baseProps} />);
    expect(screen.getByText('CAN')).toBeInTheDocument();
    expect(screen.getByText('SWE')).toBeInTheDocument();
  });

  it('affiche les horaires', () => {
    render(<BodyType13 {...baseProps} />);
    expect(screen.getAllByText('16:00').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('20:00')).toBeInTheDocument();
  });

  it('affiche les lieux', () => {
    render(<BodyType13 {...baseProps} />);
    expect(screen.getAllByText('Arena Milano').length).toBeGreaterThanOrEqual(1);
  });

  it('gère un calendrier vide', () => {
    const props = {
      ...baseProps,
      scheduleData: { title: 'TEST', matches: [] },
    };
    const { container } = render(<BodyType13 {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

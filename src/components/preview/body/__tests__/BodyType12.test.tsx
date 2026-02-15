import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType12 } from '@/components/preview/body/BodyType12';
import { DEFAULT_ROSTER_DATA } from '@/types/bodyTypes/roster';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  rosterData: DEFAULT_ROSTER_DATA,
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType12', () => {
  it('affiche le titre', () => {
    render(<BodyType12 {...baseProps} />);
    expect(screen.getByText('ROSTER')).toBeInTheDocument();
  });

  it("affiche l'entraîneur", () => {
    render(<BodyType12 {...baseProps} />);
    expect(screen.getByText(/RAMSAY/)).toBeInTheDocument();
  });

  it('affiche les joueurs', () => {
    render(<BodyType12 {...baseProps} />);
    expect(screen.getByText('KOPITAR')).toBeInTheDocument();
    expect(screen.getByText('SLAFKOVSKY')).toBeInTheDocument();
  });

  it('affiche les positions', () => {
    render(<BodyType12 {...baseProps} />);
    expect(screen.getAllByText('D').length).toBeGreaterThanOrEqual(1);
  });

  it('gère un roster vide', () => {
    const props = {
      ...baseProps,
      rosterData: { title: 'TEST', team: 'X', coach: '', players: [] },
    };
    const { container } = render(<BodyType12 {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType15 } from '@/components/preview/body/BodyType15';
import { DEFAULT_REFEREES_DATA } from '@/types/bodyTypes/referees';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  refereesData: DEFAULT_REFEREES_DATA,
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType15', () => {
  it('affiche le titre', () => {
    render(<BodyType15 {...baseProps} />);
    expect(screen.getByText('REFEREES')).toBeInTheDocument();
  });

  it('affiche les noms des arbitres', () => {
    render(<BodyType15 {...baseProps} />);
    expect(screen.getByText('ANSONS')).toBeInTheDocument();
    expect(screen.getByText('ROMASKO')).toBeInTheDocument();
    expect(screen.getByText('GOFMAN')).toBeInTheDocument();
    expect(screen.getByText('ONDRACEK')).toBeInTheDocument();
  });

  it('affiche les r\u00f4les quand activ\u00e9s', () => {
    render(<BodyType15 {...baseProps} />);
    expect(screen.getAllByText('Arbitre principal').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Juge de ligne').length).toBeGreaterThanOrEqual(1);
  });

  it('masque les r\u00f4les quand d\u00e9sactiv\u00e9s', () => {
    const props = {
      ...baseProps,
      refereesData: { ...DEFAULT_REFEREES_DATA, showRoles: false },
    };
    render(<BodyType15 {...props} />);
    expect(screen.queryByText('Arbitre principal')).not.toBeInTheDocument();
    expect(screen.queryByText('Juge de ligne')).not.toBeInTheDocument();
  });

  it('affiche un seul arbitre en mode one-by-one', () => {
    const props = {
      ...baseProps,
      refereesData: { ...DEFAULT_REFEREES_DATA, preset: 'one-by-one' as const, activeIndex: 1 },
    };
    render(<BodyType15 {...props} />);
    expect(screen.getByText('ROMASKO')).toBeInTheDocument();
    expect(screen.queryByText('ANSONS')).not.toBeInTheDocument();
  });

  it('affiche les colonnes par r\u00f4le', () => {
    const props = {
      ...baseProps,
      refereesData: { ...DEFAULT_REFEREES_DATA, preset: 'refs-vs-linesmen-columns' as const },
    };
    render(<BodyType15 {...props} />);
    expect(screen.getByText('Arbitre principal')).toBeInTheDocument();
    expect(screen.getByText('Juge de ligne')).toBeInTheDocument();
  });

  it('g\u00e8re une liste vide', () => {
    const props = {
      ...baseProps,
      refereesData: { ...DEFAULT_REFEREES_DATA, referees: [] },
    };
    const { container } = render(<BodyType15 {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

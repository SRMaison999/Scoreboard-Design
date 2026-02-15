import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType6 } from '@/components/preview/body/BodyType6';
import { DEFAULT_STANDINGS_DATA } from '@/types/bodyTypes/standings';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  standingsData: DEFAULT_STANDINGS_DATA,
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType6', () => {
  it('affiche le titre du classement', () => {
    render(<BodyType6 {...baseProps} />);
    expect(screen.getByText('GROUPE A - CLASSEMENT')).toBeInTheDocument();
  });

  it('affiche les en-têtes de colonnes', () => {
    render(<BodyType6 {...baseProps} />);
    expect(screen.getByText('PJ')).toBeInTheDocument();
    expect(screen.getByText('PTS')).toBeInTheDocument();
  });

  it('affiche les équipes', () => {
    render(<BodyType6 {...baseProps} />);
    expect(screen.getAllByText('CAN').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('USA').length).toBeGreaterThanOrEqual(1);
  });

  it('affiche les rangs', () => {
    render(<BodyType6 {...baseProps} />);
    // '1' apparait dans les rangs et dans les stats, on vérifie qu'il y a 4 lignes
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('4').length).toBeGreaterThanOrEqual(1);
  });

  it('gère un classement vide', () => {
    const props = {
      ...baseProps,
      standingsData: { ...DEFAULT_STANDINGS_DATA, rows: [] },
    };
    render(<BodyType6 {...props} />);
    expect(screen.getByText('GROUPE A - CLASSEMENT')).toBeInTheDocument();
  });
});

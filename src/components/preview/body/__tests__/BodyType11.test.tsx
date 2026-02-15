import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType11 } from '@/components/preview/body/BodyType11';
import { DEFAULT_BAR_CHART_DATA } from '@/types/bodyTypes/barChart';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  barChartData: DEFAULT_BAR_CHART_DATA,
  team1: 'SVK',
  team2: 'FIN',
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType11', () => {
  it('affiche le titre', () => {
    render(<BodyType11 {...baseProps} />);
    expect(screen.getByText('TEAM COMPARISON')).toBeInTheDocument();
  });

  it('affiche les noms des équipes', () => {
    render(<BodyType11 {...baseProps} />);
    expect(screen.getByText('SVK')).toBeInTheDocument();
    expect(screen.getByText('FIN')).toBeInTheDocument();
  });

  it('affiche les labels de barres', () => {
    render(<BodyType11 {...baseProps} />);
    expect(screen.getByText('SHOTS ON GOAL')).toBeInTheDocument();
    expect(screen.getByText('POWER PLAY')).toBeInTheDocument();
  });

  it('affiche les valeurs en pourcentage', () => {
    render(<BodyType11 {...baseProps} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('gère des données vides', () => {
    const props = {
      ...baseProps,
      barChartData: { title: 'TEST', rows: [] },
    };
    const { container } = render(<BodyType11 {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType4 } from '@/components/preview/body/BodyType4';
import { DEFAULT_GOAL_DATA } from '@/types/bodyTypes/goal';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  goalData: DEFAULT_GOAL_DATA,
  team1: 'SVK',
  team2: 'FIN',
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType4', () => {
  it('affiche le titre GOAL', () => {
    render(<BodyType4 {...baseProps} />);
    expect(screen.getByText('GOAL')).toBeInTheDocument();
  });

  it('affiche le nom du buteur', () => {
    render(<BodyType4 {...baseProps} />);
    expect(screen.getByText('KOPITAR')).toBeInTheDocument();
  });

  it('affiche le numéro du buteur', () => {
    render(<BodyType4 {...baseProps} />);
    expect(screen.getByText('11')).toBeInTheDocument();
  });

  it("affiche l'équipe marqueuse gauche", () => {
    render(<BodyType4 {...baseProps} />);
    expect(screen.getByText('SVK')).toBeInTheDocument();
  });

  it("affiche l'équipe marqueuse droite", () => {
    const props = {
      ...baseProps,
      goalData: { ...DEFAULT_GOAL_DATA, scoringTeamSide: 'right' as const },
    };
    render(<BodyType4 {...props} />);
    expect(screen.getByText('FIN')).toBeInTheDocument();
  });

  it("affiche l'assist quand renseigné", () => {
    render(<BodyType4 {...baseProps} />);
    expect(screen.getByText(/PASTRNAK/)).toBeInTheDocument();
  });

  it("n'affiche pas l'assist 2 quand vide", () => {
    render(<BodyType4 {...baseProps} />);
    expect(screen.queryByText(/Assist 2/)).not.toBeInTheDocument();
  });

  it('affiche le temps et la période', () => {
    render(<BodyType4 {...baseProps} />);
    expect(screen.getByText(/14:23/)).toBeInTheDocument();
  });
});

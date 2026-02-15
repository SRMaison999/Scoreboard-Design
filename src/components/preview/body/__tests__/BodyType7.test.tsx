import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType7 } from '@/components/preview/body/BodyType7';
import { DEFAULT_FINAL_SCORE_DATA } from '@/types/bodyTypes/finalScore';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  finalScoreData: DEFAULT_FINAL_SCORE_DATA,
  team1: 'SVK',
  team2: 'FIN',
  score1: '2',
  score2: '1',
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType7', () => {
  it('affiche le titre', () => {
    render(<BodyType7 {...baseProps} />);
    expect(screen.getByText('SCORE FINAL')).toBeInTheDocument();
  });

  it('affiche le score', () => {
    render(<BodyType7 {...baseProps} />);
    expect(screen.getByText(/2 - 1/)).toBeInTheDocument();
  });

  it('affiche les équipes', () => {
    render(<BodyType7 {...baseProps} />);
    expect(screen.getAllByText('SVK').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('FIN').length).toBeGreaterThanOrEqual(1);
  });

  it('affiche la note de prolongation', () => {
    render(<BodyType7 {...baseProps} />);
    expect(screen.getByText('(PROL.)')).toBeInTheDocument();
  });

  it('affiche le but gagnant', () => {
    render(<BodyType7 {...baseProps} />);
    expect(screen.getByText(/KOPITAR/)).toBeInTheDocument();
  });

  it('masque le but gagnant quand désactivé', () => {
    const props = {
      ...baseProps,
      finalScoreData: { ...DEFAULT_FINAL_SCORE_DATA, showGwg: false },
    };
    render(<BodyType7 {...props} />);
    expect(screen.queryByText(/KOPITAR/)).not.toBeInTheDocument();
  });

  it('affiche le résumé des périodes', () => {
    render(<BodyType7 {...baseProps} />);
    expect(screen.getByText(/1-0/)).toBeInTheDocument();
  });
});

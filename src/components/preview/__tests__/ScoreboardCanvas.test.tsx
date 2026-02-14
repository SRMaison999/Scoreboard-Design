import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScoreboardCanvas } from '@/components/preview/ScoreboardCanvas';
import { DEFAULT_STATE } from '@/data/defaultState';

describe('ScoreboardCanvas', () => {
  it('rend le canvas avec les equipes par defaut', () => {
    render(<ScoreboardCanvas state={DEFAULT_STATE} />);
    expect(screen.getByText('SVK')).toBeInTheDocument();
    expect(screen.getByText('FIN')).toBeInTheDocument();
  });

  it('affiche les scores', () => {
    render(<ScoreboardCanvas state={DEFAULT_STATE} />);
    const scores = screen.getAllByText('1');
    expect(scores.length).toBeGreaterThanOrEqual(2);
  });

  it('affiche le temps et la periode', () => {
    render(<ScoreboardCanvas state={DEFAULT_STATE} />);
    expect(screen.getByText('20:00')).toBeInTheDocument();
    expect(screen.getByText('1st PERIOD')).toBeInTheDocument();
  });

  it('affiche le titre et les stats pour body type 1', () => {
    render(<ScoreboardCanvas state={DEFAULT_STATE} />);
    expect(screen.getByText('GAME STATISTICS')).toBeInTheDocument();
    expect(screen.getByText('GAME')).toBeInTheDocument();
  });

  it('affiche les penalites quand showPenalties est actif', () => {
    const state = { ...DEFAULT_STATE, showPenalties: true };
    render(<ScoreboardCanvas state={state} />);
    expect(screen.getByText('1:52')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
  });

  it('affiche le body type 3 avec les stats joueur', () => {
    const state = { ...DEFAULT_STATE, bodyType: 3 as const };
    render(<ScoreboardCanvas state={state} />);
    expect(screen.getAllByText('KOPITAR').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('GOALS')).toBeInTheDocument();
  });

  it('utilise un fond uni en mode uniform', () => {
    const state = {
      ...DEFAULT_STATE,
      bgMode: 'uniform' as const,
      colors: { ...DEFAULT_STATE.colors, bgTop: '#ff0000' },
    };
    render(<ScoreboardCanvas state={state} />);
    const canvas = screen.getByTestId('scoreboard-canvas');
    expect(canvas.style.background).not.toContain('linear-gradient');
  });

  it('utilise un dégradé en mode gradient', () => {
    const state = { ...DEFAULT_STATE, bgMode: 'gradient' as const };
    render(<ScoreboardCanvas state={state} />);
    const canvas = screen.getByTestId('scoreboard-canvas');
    expect(canvas.style.background).toContain('linear-gradient');
  });
});

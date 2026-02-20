import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  ScoreElement,
  ClockElement,
  PeriodElement,
  TeamNameElement,
  FlagElement,
  TimeoutElement,
  ShootoutElement,
} from '../FieldMatchElements';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';

describe('FieldMatchElements', () => {
  it('ScoreElement affiche le score gauche', () => {
    const state = { ...DEFAULT_STATE, score1: '3', score2: '1' };
    render(
      <ScoreElement
        state={state}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        element={{ config: { side: 'left' } }}
      />,
    );
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('ScoreElement affiche le score droit', () => {
    const state = { ...DEFAULT_STATE, score1: '3', score2: '1' };
    render(
      <ScoreElement
        state={state}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        element={{ config: { side: 'right' } }}
      />,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('ClockElement affiche le temps', () => {
    const state = { ...DEFAULT_STATE, time: '15:30' };
    render(<ClockElement state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} />);
    expect(screen.getByText('15:30')).toBeInTheDocument();
  });

  it('PeriodElement affiche la periode', () => {
    const state = { ...DEFAULT_STATE, period: '2nd' };
    render(<PeriodElement state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} />);
    expect(screen.getByText('2nd')).toBeInTheDocument();
  });

  it('TeamNameElement affiche l equipe gauche avec drapeau', () => {
    const state = { ...DEFAULT_STATE, team1: 'SUI', team2: 'CAN' };
    const { container } = render(
      <TeamNameElement
        state={state}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        element={{ config: { side: 'left', showFlag: true } }}
      />,
    );
    expect(screen.getByText('SUI')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeTruthy();
  });

  it('TeamNameElement affiche l equipe droite sans drapeau', () => {
    const state = { ...DEFAULT_STATE, team1: 'SUI', team2: 'CAN' };
    const { container } = render(
      <TeamNameElement
        state={state}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        element={{ config: { side: 'right', showFlag: false } }}
      />,
    );
    expect(screen.getByText('CAN')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeFalsy();
  });

  it('FlagElement rend un composant Flag', () => {
    const state = { ...DEFAULT_STATE, team1: 'SUI' };
    const { container } = render(
      <FlagElement state={state} element={{ config: { side: 'left' } }} width={100} height={70} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('TimeoutElement affiche les deux equipes', () => {
    const state = { ...DEFAULT_STATE, team1: 'SUI', team2: 'CAN', timeoutsLeft: 1, timeoutsRight: 0 };
    render(<TimeoutElement state={state} />);
    expect(screen.getByText('SUI')).toBeInTheDocument();
    expect(screen.getByText('CAN')).toBeInTheDocument();
  });

  it('ShootoutElement affiche les deux equipes', () => {
    const state = { ...DEFAULT_STATE, team1: 'SUI', team2: 'CAN' };
    render(<ShootoutElement state={state} />);
    expect(screen.getByText('SUI')).toBeInTheDocument();
    expect(screen.getByText('CAN')).toBeInTheDocument();
  });
});

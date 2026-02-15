import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimatedScoreboard } from '../AnimatedScoreboard';
import { DEFAULT_STATE } from '@/data/defaultState';

describe('AnimatedScoreboard', () => {
  it('rend le scoreboard canvas', () => {
    render(<AnimatedScoreboard state={DEFAULT_STATE} />);
    expect(screen.getByTestId('animated-scoreboard')).toBeInTheDocument();
    expect(screen.getByTestId('scoreboard-canvas')).toBeInTheDocument();
  });

  it('masque le scoreboard quand scoreboardVisible est false', () => {
    const state = { ...DEFAULT_STATE, scoreboardVisible: false };
    render(<AnimatedScoreboard state={state} />);
    const wrapper = screen.getByTestId('animated-scoreboard');
    expect(wrapper.style.opacity).toBe('0');
    expect(wrapper.style.pointerEvents).toBe('none');
  });

  it('affiche le scoreboard quand scoreboardVisible est true', () => {
    render(<AnimatedScoreboard state={DEFAULT_STATE} />);
    const wrapper = screen.getByTestId('animated-scoreboard');
    expect(wrapper.style.opacity).not.toBe('0');
  });

  it('transmet les props au ScoreboardCanvas', () => {
    render(<AnimatedScoreboard state={DEFAULT_STATE} width={1280} height={720} />);
    const canvas = screen.getByTestId('scoreboard-canvas');
    expect(canvas.style.width).toBe('1280px');
    expect(canvas.style.height).toBe('720px');
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScoreBug } from '@/components/output/ScoreBug';

describe('ScoreBug', () => {
  it('affiche le score compact', () => {
    render(<ScoreBug position="top-right" opacity={1} />);
    const el = screen.getByTestId('score-bug');
    expect(el).toBeInTheDocument();
  });

  it('applique la position top-right', () => {
    render(<ScoreBug position="top-right" opacity={1} />);
    const el = screen.getByTestId('score-bug');
    expect(el.style.top).toBe('20px');
    expect(el.style.right).toBe('20px');
  });

  it('applique l\'opacit\u00e9', () => {
    render(<ScoreBug position="bottom-left" opacity={0.7} />);
    const el = screen.getByTestId('score-bug');
    expect(el.style.opacity).toBe('0.7');
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { LowerThird } from '@/components/output/LowerThird';

describe('LowerThird', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche les \u00e9quipes et le score', () => {
    render(<LowerThird opacity={1} />);
    const el = screen.getByTestId('lower-third');
    expect(el).toBeInTheDocument();
    expect(el.textContent).toContain('SVK');
    expect(el.textContent).toContain('FIN');
  });

  it('applique l\'opacit\u00e9', () => {
    render(<LowerThird opacity={0.5} />);
    const el = screen.getByTestId('lower-third');
    expect(el.style.opacity).toBe('0.5');
  });
});

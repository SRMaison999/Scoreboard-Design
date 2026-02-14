import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Flag } from '@/components/preview/Flag';

describe('Flag', () => {
  it('rend un drapeau connu sans fallback', () => {
    const { container } = render(<Flag code="CAN" />);
    const flag = container.firstChild as HTMLElement;
    expect(flag.style.background).toContain('linear-gradient');
  });

  it('rend le fallback pour un code inconnu', () => {
    render(<Flag code="XXX" />);
    expect(screen.getByText('XXX')).toBeInTheDocument();
  });

  it('respecte les dimensions personnalisees', () => {
    const { container } = render(<Flag code="FIN" w={100} h={60} />);
    const flag = container.firstChild as HTMLElement;
    expect(flag.style.width).toBe('100px');
    expect(flag.style.height).toBe('60px');
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Flag } from '@/components/preview/Flag';

/* Test SANS mock — utilise le vrai registre SVG */
describe('Flag (registre SVG r\u00e9el)', () => {
  it('rend un SVG inline pour SVK', () => {
    const { container } = render(<Flag code="SVK" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('rend un SVG inline pour FIN', () => {
    const { container } = render(<Flag code="FIN" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('rend le fallback pour un code inconnu', () => {
    const { container } = render(<Flag code="UNKNOWN" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });
});

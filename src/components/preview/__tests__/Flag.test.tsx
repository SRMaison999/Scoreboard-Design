import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Flag } from '@/components/preview/Flag';

vi.mock('@/assets/flags', () => ({
  FLAG_SVG_REGISTRY: {
    CAN: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect fill="red"/></svg>',
    FIN: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1100"><rect fill="blue"/></svg>',
  },
}));

describe('Flag', () => {
  it('rend un SVG inline pour un NOC connu', () => {
    const { container } = render(<Flag code="CAN" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('rend le fallback texte pour un code inconnu', () => {
    render(<Flag code="XXX" />);
    expect(screen.getByText('XXX')).toBeInTheDocument();
  });

  it('respecte les dimensions personnalis\u00e9es', () => {
    const { container } = render(<Flag code="FIN" w={100} h={60} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.style.width).toBe('100px');
    expect(wrapper?.style.height).toBe('60px');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('priorise l\u2019override utilisateur sur le SVG embarqu\u00e9', () => {
    const overrides = { 'flag-CAN': 'data:image/png;base64,CUSTOM_FLAG' };
    const { container } = render(<Flag code="CAN" flagOverrides={overrides} />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute('src')).toBe('data:image/png;base64,CUSTOM_FLAG');
  });

  it('rend le fallback si aucun override et NOC inconnu', () => {
    const { container } = render(<Flag code="ZZZ" />);
    const img = container.querySelector('img');
    expect(img).not.toBeInTheDocument();
    expect(screen.getByText('ZZZ')).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/preview/Header';
import { DEFAULT_STATE } from '@/data/defaultState';

vi.mock('@/assets/flags', () => ({
  FLAG_SVG_REGISTRY: {
    SVK: '<svg xmlns="http://www.w3.org/2000/svg"><rect fill="blue"/></svg>',
    FIN: '<svg xmlns="http://www.w3.org/2000/svg"><rect fill="white"/></svg>',
    CAN: '<svg xmlns="http://www.w3.org/2000/svg"><rect fill="red"/></svg>',
  },
}));

const baseProps = {
  team1: DEFAULT_STATE.team1,
  team2: DEFAULT_STATE.team2,
  score1: DEFAULT_STATE.score1,
  score2: DEFAULT_STATE.score2,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontTeams: DEFAULT_STATE.fontTeams,
};

describe('Header', () => {
  it('affiche les noms d\u2019\u00e9quipe', () => {
    render(<Header {...baseProps} />);
    expect(screen.getByText('SVK')).toBeInTheDocument();
    expect(screen.getByText('FIN')).toBeInTheDocument();
  });

  it('affiche des drapeaux SVG inline en mode flag par d\u00e9faut', () => {
    const { container } = render(<Header {...baseProps} />);
    /* Les drapeaux sont rendus en SVG inline (pas en <img>) */
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it('affiche des images de logo en mode logo quand disponibles', () => {
    const logos = { 'team-SVK': 'data:image/webp;base64,svk', 'team-FIN': 'data:image/webp;base64,fin' };
    const { container } = render(<Header {...baseProps} logoMode="logo" teamLogos={logos} />);
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    const firstImg = images[0] as HTMLImageElement;
    expect(firstImg).toHaveAttribute('src', 'data:image/webp;base64,svk');
  });

  it('affiche drapeaux et logos en mode both', () => {
    const logos = { 'team-SVK': 'data:image/webp;base64,svk', 'team-FIN': 'data:image/webp;base64,fin' };
    const { container } = render(<Header {...baseProps} logoMode="both" teamLogos={logos} />);
    /* 2 drapeaux SVG inline + 2 logos <img> */
    const svgs = container.querySelectorAll('svg');
    const images = container.querySelectorAll('img');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
    expect(images).toHaveLength(2);
  });

  it('fallback aux drapeaux SVG si logo mode est logo mais aucun logo disponible', () => {
    const { container } = render(<Header {...baseProps} logoMode="logo" teamLogos={{}} />);
    /* Fallback: affiche les drapeaux SVG inline */
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it('affiche les timeouts quand activ\u00e9s', () => {
    const { container } = render(
      <Header {...baseProps} showTimeouts timeoutsLeft={1} timeoutsRight={0} />,
    );
    expect(container.innerHTML).toContain('border-radius: 50%');
  });

  it('les drapeaux ont la m\u00eame hauteur que la cap height par d\u00e9faut', () => {
    /* En JSDOM sans canvas, measureCapHeight retourne Math.round(fontSize * 0.72) */
    const { container } = render(<Header {...baseProps} fontSizeTeamName={80} />);
    const flagDivs = container.querySelectorAll('[style*="box-shadow"]');
    const flagEl = flagDivs[0] as HTMLElement;
    expect(flagEl.style.height).toBe('58px');
    expect(flagEl.style.width).toBe('89px');
  });

  it('les drapeaux scalent quand fontSizeTeamName change', () => {
    const { container, rerender } = render(<Header {...baseProps} fontSizeTeamName={80} />);
    let flagDivs = container.querySelectorAll('[style*="box-shadow"]');
    let flagEl = flagDivs[0] as HTMLElement;
    expect(flagEl.style.height).toBe('58px');

    rerender(<Header {...baseProps} fontSizeTeamName={120} />);
    flagDivs = container.querySelectorAll('[style*="box-shadow"]');
    flagEl = flagDivs[0] as HTMLElement;
    expect(flagEl.style.height).toBe('86px');
    expect(flagEl.style.width).toBe('132px');
  });

  it('les drapeaux sont petits quand fontSizeTeamName est petit', () => {
    const { container } = render(<Header {...baseProps} fontSizeTeamName={40} />);
    const flagDivs = container.querySelectorAll('[style*="box-shadow"]');
    const flagEl = flagDivs[0] as HTMLElement;
    expect(flagEl.style.height).toBe('29px');
    expect(flagEl.style.width).toBe('45px');
  });
});

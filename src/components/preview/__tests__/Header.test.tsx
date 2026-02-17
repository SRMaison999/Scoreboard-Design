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

  it('affiche des drapeaux SVG en mode flag par d\u00e9faut', () => {
    const { container } = render(<Header {...baseProps} />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThanOrEqual(2);
    const firstImg = images[0] as HTMLImageElement;
    expect(firstImg.getAttribute('src')).toMatch(/^data:image\/svg\+xml;base64,/);
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
    const images = container.querySelectorAll('img');
    // 2 drapeaux SVG + 2 logos = 4 images
    expect(images).toHaveLength(4);
  });

  it('fallback aux drapeaux SVG si logo mode est logo mais aucun logo disponible', () => {
    const { container } = render(<Header {...baseProps} logoMode="logo" teamLogos={{}} />);
    const images = container.querySelectorAll('img');
    // Fallback: affiche les drapeaux SVG
    expect(images.length).toBeGreaterThanOrEqual(2);
    const firstImg = images[0] as HTMLImageElement;
    expect(firstImg.getAttribute('src')).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  it('affiche les timeouts quand activ\u00e9s', () => {
    const { container } = render(
      <Header {...baseProps} showTimeouts timeoutsLeft={1} timeoutsRight={0} />,
    );
    expect(container.innerHTML).toContain('border-radius: 50%');
  });

  it('les drapeaux ont la meme hauteur que la cap height par defaut', () => {
    // En JSDOM sans canvas, measureCapHeight retourne Math.round(fontSize * 0.72)
    const { container } = render(<Header {...baseProps} fontSizeTeamName={80} />);
    const flagDivs = container.querySelectorAll('[style*="box-shadow"]');
    const flagEl = flagDivs[0] as HTMLElement;
    expect(flagEl.style.height).toBe('58px');
    expect(flagEl.style.width).toBe('89px');
  });

  it('les drapeaux scalent quand fontSizeTeamName change', () => {
    // En JSDOM sans canvas, measureCapHeight retourne Math.round(fontSize * 0.72)
    // width = Math.round(capHeight * FLAG_ASPECT) avec FLAG_ASPECT = 1.54
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
    // En JSDOM sans canvas, measureCapHeight retourne Math.round(fontSize * 0.72)
    const { container } = render(<Header {...baseProps} fontSizeTeamName={40} />);
    const flagDivs = container.querySelectorAll('[style*="box-shadow"]');
    const flagEl = flagDivs[0] as HTMLElement;
    expect(flagEl.style.height).toBe('29px');
    expect(flagEl.style.width).toBe('45px');
  });
});

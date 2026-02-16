import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/preview/Header';
import { DEFAULT_STATE } from '@/data/defaultState';

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
  it('affiche les noms d\'équipe', () => {
    render(<Header {...baseProps} />);
    expect(screen.getByText('SVK')).toBeInTheDocument();
    expect(screen.getByText('FIN')).toBeInTheDocument();
  });

  it('n\'affiche pas d\'images en mode flag par défaut', () => {
    render(<Header {...baseProps} />);
    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);
  });

  it('affiche des images de logo en mode logo quand disponibles', () => {
    const logos = { 'team-SVK': 'data:image/webp;base64,svk', 'team-FIN': 'data:image/webp;base64,fin' };
    const { container } = render(<Header {...baseProps} logoMode="logo" teamLogos={logos} />);
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'data:image/webp;base64,svk');
  });

  it('affiche drapeaux et logos en mode both', () => {
    const logos = { 'team-SVK': 'data:image/webp;base64,svk', 'team-FIN': 'data:image/webp;base64,fin' };
    const { container } = render(<Header {...baseProps} logoMode="both" teamLogos={logos} />);
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
  });

  it('fallback aux drapeaux si logo mode est logo mais aucun logo disponible', () => {
    const { container } = render(<Header {...baseProps} logoMode="logo" teamLogos={{}} />);
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(0);
  });

  it('affiche les timeouts quand activés', () => {
    const { container } = render(
      <Header {...baseProps} showTimeouts timeoutsLeft={1} timeoutsRight={0} />,
    );
    expect(container.innerHTML).toContain('border-radius: 50%');
  });

  it('les drapeaux ont la meme hauteur que fontSizeTeamName par defaut', () => {
    const { container } = render(<Header {...baseProps} fontSizeTeamName={80} />);
    const flagDivs = container.querySelectorAll('[style*="box-shadow"]');
    const flagEl = flagDivs[0] as HTMLElement;
    expect(flagEl.style.height).toBe('80px');
    expect(flagEl.style.width).toBe('120px');
  });

  it('les drapeaux scalent quand fontSizeTeamName change', () => {
    const { container, rerender } = render(<Header {...baseProps} fontSizeTeamName={80} />);
    let flagDivs = container.querySelectorAll('[style*="box-shadow"]');
    let flagEl = flagDivs[0] as HTMLElement;
    expect(flagEl.style.height).toBe('80px');

    rerender(<Header {...baseProps} fontSizeTeamName={120} />);
    flagDivs = container.querySelectorAll('[style*="box-shadow"]');
    flagEl = flagDivs[0] as HTMLElement;
    expect(flagEl.style.height).toBe('120px');
    expect(flagEl.style.width).toBe('180px');
  });

  it('les drapeaux sont petits quand fontSizeTeamName est petit', () => {
    const { container } = render(<Header {...baseProps} fontSizeTeamName={40} />);
    const flagDivs = container.querySelectorAll('[style*="box-shadow"]');
    const flagEl = flagDivs[0] as HTMLElement;
    expect(flagEl.style.height).toBe('40px');
    expect(flagEl.style.width).toBe('60px');
  });
});

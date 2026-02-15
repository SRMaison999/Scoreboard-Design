import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScoreboardCanvas } from '@/components/preview/ScoreboardCanvas';
import { DEFAULT_STATE } from '@/data/defaultState';

describe('ScoreboardCanvas', () => {
  it('rend le canvas avec les equipes par defaut', () => {
    render(<ScoreboardCanvas state={DEFAULT_STATE} />);
    expect(screen.getByText('SVK')).toBeInTheDocument();
    expect(screen.getByText('FIN')).toBeInTheDocument();
  });

  it('affiche les scores', () => {
    render(<ScoreboardCanvas state={DEFAULT_STATE} />);
    const scores = screen.getAllByText('1');
    expect(scores.length).toBeGreaterThanOrEqual(2);
  });

  it('affiche le temps et la periode', () => {
    render(<ScoreboardCanvas state={DEFAULT_STATE} />);
    expect(screen.getByText('20:00')).toBeInTheDocument();
    expect(screen.getByText('1st PERIOD')).toBeInTheDocument();
  });

  it('affiche le titre et les stats pour body type 1', () => {
    render(<ScoreboardCanvas state={DEFAULT_STATE} />);
    expect(screen.getByText('GAME STATISTICS')).toBeInTheDocument();
    expect(screen.getByText('GAME')).toBeInTheDocument();
  });

  it('affiche les penalites quand showPenalties est actif', () => {
    const state = { ...DEFAULT_STATE, showPenalties: true };
    render(<ScoreboardCanvas state={state} />);
    expect(screen.getByText('1:52')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
  });

  it('affiche le body type 3 avec les stats joueur', () => {
    const state = { ...DEFAULT_STATE, bodyType: 3 as const };
    render(<ScoreboardCanvas state={state} />);
    expect(screen.getAllByText('KOPITAR').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('GOALS')).toBeInTheDocument();
  });

  it('utilise un fond uni en mode uniform', () => {
    const state = {
      ...DEFAULT_STATE,
      bgMode: 'uniform' as const,
      colors: { ...DEFAULT_STATE.colors, bgTop: '#ff0000' },
    };
    render(<ScoreboardCanvas state={state} />);
    const canvas = screen.getByTestId('scoreboard-canvas');
    expect(canvas.style.background).not.toContain('linear-gradient');
  });

  it('utilise un dégradé en mode gradient', () => {
    const state = { ...DEFAULT_STATE, bgMode: 'gradient' as const };
    render(<ScoreboardCanvas state={state} />);
    const canvas = screen.getByTestId('scoreboard-canvas');
    expect(canvas.style.background).toContain('linear-gradient');
  });

  it('affiche le body type 4 avec GOAL', () => {
    const state = { ...DEFAULT_STATE, bodyType: 4 as const };
    render(<ScoreboardCanvas state={state} />);
    expect(screen.getByText('GOAL')).toBeInTheDocument();
  });

  it('affiche le body type 5 avec la fiche joueur', () => {
    const state = { ...DEFAULT_STATE, bodyType: 5 as const };
    render(<ScoreboardCanvas state={state} />);
    expect(screen.getByText('JOUEUR DU MATCH')).toBeInTheDocument();
  });

  it('affiche le body type 6 avec le classement', () => {
    const state = { ...DEFAULT_STATE, bodyType: 6 as const };
    render(<ScoreboardCanvas state={state} />);
    expect(screen.getByText('GROUPE A - CLASSEMENT')).toBeInTheDocument();
  });

  it('affiche le body type 7 avec le score final', () => {
    const state = { ...DEFAULT_STATE, bodyType: 7 as const };
    render(<ScoreboardCanvas state={state} />);
    expect(screen.getByText('SCORE FINAL')).toBeInTheDocument();
  });

  it('affiche le body type 8 avec le texte libre', () => {
    const state = { ...DEFAULT_STATE, bodyType: 8 as const };
    render(<ScoreboardCanvas state={state} />);
    expect(screen.getByText('BIENVENUE')).toBeInTheDocument();
  });

  it('passe les logos d\'équipe au Header', () => {
    const logos = { 'team-SVK': 'data:image/webp;base64,svk' };
    const state = { ...DEFAULT_STATE, logoMode: 'logo' as const };
    const { container } = render(<ScoreboardCanvas state={state} logos={logos} />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThanOrEqual(1);
  });

  it('affiche le logo de compétition quand activé', () => {
    const logos = { 'competition-iihf': 'data:image/webp;base64,iihf' };
    const state = { ...DEFAULT_STATE, showCompetitionLogo: true, competitionLogoSize: 80 };
    const { container } = render(<ScoreboardCanvas state={state} logos={logos} />);
    const images = container.querySelectorAll('img');
    const iihfImg = Array.from(images).find((img) => img.getAttribute('src') === 'data:image/webp;base64,iihf');
    expect(iihfImg).toBeTruthy();
  });

  it('affiche le logo sponsor quand activé', () => {
    const logos = { 'sponsor-nike': 'data:image/webp;base64,nike' };
    const state = { ...DEFAULT_STATE, showSponsorLogo: true, sponsorLogoSize: 60 };
    const { container } = render(<ScoreboardCanvas state={state} logos={logos} />);
    const images = container.querySelectorAll('img');
    const nikeImg = Array.from(images).find((img) => img.getAttribute('src') === 'data:image/webp;base64,nike');
    expect(nikeImg).toBeTruthy();
  });
});

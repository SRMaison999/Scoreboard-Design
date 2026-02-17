import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType3 } from '@/components/preview/body/BodyType3';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_FONT_SIZES } from '@/types/fontSizes';

const baseProps = {
  playerStats: DEFAULT_STATE.playerStats,
  titleCenter: DEFAULT_STATE.titleCenter,
  showPlayerPhoto: true,
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType3', () => {
  it('affiche le titre central', () => {
    render(<BodyType3 {...baseProps} />);
    expect(screen.getByText('GAME STATISTICS')).toBeInTheDocument();
  });

  it('affiche les noms des joueurs', () => {
    render(<BodyType3 {...baseProps} />);
    expect(screen.getAllByText('KOPITAR').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('PASTRNAK')).toBeInTheDocument();
  });

  it('affiche les labels de stats', () => {
    render(<BodyType3 {...baseProps} />);
    expect(screen.getByText('GOALS')).toBeInTheDocument();
    expect(screen.getByText('ASSISTS')).toBeInTheDocument();
  });

  it('affiche les numéros en fallback quand pas de photos', () => {
    render(<BodyType3 {...baseProps} playerPhotos={{}} />);
    expect(screen.getAllByText('11').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('88')).toBeInTheDocument();
  });

  it('affiche l image quand une photo existe', () => {
    const playerPhotos = { 'CAN-11': 'data:image/webp;base64,photo11' };
    const { container } = render(<BodyType3 {...baseProps} playerPhotos={playerPhotos} />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBeGreaterThanOrEqual(1);
  });

  it('n affiche pas les photos quand showPlayerPhoto est false', () => {
    render(<BodyType3 {...baseProps} showPlayerPhoto={false} />);
    expect(screen.queryByText('11')).not.toBeInTheDocument();
  });

  it('gère une liste de stats vide', () => {
    const { container } = render(<BodyType3 {...baseProps} playerStats={[]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applique le body scale aux tailles de police', () => {
    const scaledFontSizes = { ...DEFAULT_FONT_SIZES, bodyScale3: 200 };
    render(<BodyType3 {...baseProps} fontSizes={scaledFontSizes} />);
    const title = screen.getByText('GAME STATISTICS');
    const titleFs = parseInt(title.style.fontSize, 10);
    expect(titleFs).toBe(60);
  });

  it('réduit les tailles avec un body scale inférieur à 100', () => {
    const scaledFontSizes = { ...DEFAULT_FONT_SIZES, bodyScale3: 50 };
    render(<BodyType3 {...baseProps} fontSizes={scaledFontSizes} />);
    const title = screen.getByText('GAME STATISTICS');
    const titleFs = parseInt(title.style.fontSize, 10);
    expect(titleFs).toBe(15);
  });
});

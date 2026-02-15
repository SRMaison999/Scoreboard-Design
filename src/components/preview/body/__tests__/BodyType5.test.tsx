import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType5 } from '@/components/preview/body/BodyType5';
import { DEFAULT_PLAYER_CARD_DATA } from '@/types/bodyTypes/playerCard';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  playerCardData: DEFAULT_PLAYER_CARD_DATA,
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType5', () => {
  it('affiche le titre de la fiche', () => {
    render(<BodyType5 {...baseProps} />);
    expect(screen.getByText('JOUEUR DU MATCH')).toBeInTheDocument();
  });

  it('affiche le nom du joueur', () => {
    render(<BodyType5 {...baseProps} />);
    expect(screen.getByText('KOPITAR')).toBeInTheDocument();
  });

  it('affiche le numéro du joueur', () => {
    render(<BodyType5 {...baseProps} />);
    expect(screen.getByText('11')).toBeInTheDocument();
  });

  it("affiche l'équipe du joueur", () => {
    render(<BodyType5 {...baseProps} />);
    expect(screen.getAllByText('SVK').length).toBeGreaterThanOrEqual(1);
  });

  it('affiche les statistiques', () => {
    render(<BodyType5 {...baseProps} />);
    expect(screen.getByText('BUTS')).toBeInTheDocument();
    expect(screen.getByText('ASSISTS')).toBeInTheDocument();
    expect(screen.getByText('POINTS')).toBeInTheDocument();
  });

  it("n'affiche pas le sous-titre quand vide", () => {
    render(<BodyType5 {...baseProps} />);
    const subtitle = baseProps.playerCardData.subtitle;
    expect(subtitle).toBe('');
  });

  it('affiche le sous-titre quand renseigné', () => {
    const props = {
      ...baseProps,
      playerCardData: { ...DEFAULT_PLAYER_CARD_DATA, subtitle: 'MVP' },
    };
    render(<BodyType5 {...props} />);
    expect(screen.getByText('MVP')).toBeInTheDocument();
  });
});

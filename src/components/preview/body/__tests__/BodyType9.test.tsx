import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType9 } from '@/components/preview/body/BodyType9';
import { DEFAULT_HEAD_TO_HEAD_DATA } from '@/types/bodyTypes/headToHead';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  headToHeadData: DEFAULT_HEAD_TO_HEAD_DATA,
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType9', () => {
  it('affiche le titre', () => {
    render(<BodyType9 {...baseProps} />);
    expect(screen.getByText('HEAD TO HEAD')).toBeInTheDocument();
  });

  it('affiche les noms des joueurs', () => {
    render(<BodyType9 {...baseProps} />);
    expect(screen.getByText('KOPITAR')).toBeInTheDocument();
    expect(screen.getByText('BARKOV')).toBeInTheDocument();
  });

  it('affiche les lignes de stats', () => {
    render(<BodyType9 {...baseProps} />);
    expect(screen.getByText('GOALS')).toBeInTheDocument();
    expect(screen.getByText('ASSISTS')).toBeInTheDocument();
    expect(screen.getByText('POINTS')).toBeInTheDocument();
  });

  it('gère des données vides', () => {
    const props = {
      ...baseProps,
      headToHeadData: {
        title: 'TEST',
        playerLeft: { name: 'A', number: '1', team: 'X' },
        playerRight: { name: 'B', number: '2', team: 'Y' },
        stats: [],
      },
    };
    const { container } = render(<BodyType9 {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('affiche les numéros en fallback quand pas de photos', () => {
    render(<BodyType9 {...baseProps} playerPhotos={{}} />);
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('16')).toBeInTheDocument();
  });

  it('affiche l image quand une photo est fournie', () => {
    const playerPhotos = {
      'SVK-11': 'data:image/webp;base64,photoLeft',
    };
    const { container } = render(<BodyType9 {...baseProps} playerPhotos={playerPhotos} />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBeGreaterThanOrEqual(1);
  });

  it('affiche les photos des deux joueurs', () => {
    const playerPhotos = {
      'SVK-11': 'data:image/webp;base64,photoLeft',
      'FIN-16': 'data:image/webp;base64,photoRight',
    };
    const { container } = render(<BodyType9 {...baseProps} playerPhotos={playerPhotos} />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBe(2);
  });
});

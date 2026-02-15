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
});

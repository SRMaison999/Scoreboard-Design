import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  StatLineElement,
  BarCompareElement,
  PlayerPhotoElement,
} from '@/components/preview/body/FieldDataElements';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';

function makeState(overrides: Partial<ScoreboardState> = {}): ScoreboardState {
  return { ...DEFAULT_STATE, ...overrides };
}

function colors(): ColorMap {
  return { ...DEFAULT_COLORS };
}

function opacities(): OpacityMap {
  return { ...DEFAULT_OPACITIES };
}

describe('StatLineElement', () => {
  it('affiche les donn\u00e9es de stat depuis state.stats[\u00edndex]', () => {
    const state = makeState({
      stats: [
        { valLeft: '82%', label: 'GAME', valRight: '91%' },
        { valLeft: '87%', label: 'TOURNAMENT', valRight: '85%' },
      ],
    });
    render(
      <StatLineElement
        state={state}
        colors={colors()}
        opacities={opacities()}
        element={{ config: { statIndex: 0 } }}
      />,
    );
    expect(screen.getByText('82%')).toBeInTheDocument();
    expect(screen.getByText('GAME')).toBeInTheDocument();
    expect(screen.getByText('91%')).toBeInTheDocument();
  });

  it('affiche la valeur gauche, le label et la valeur droite pour un index diff\u00e9rent', () => {
    const state = makeState({
      stats: [
        { valLeft: '82%', label: 'GAME', valRight: '91%' },
        { valLeft: '87%', label: 'TOURNAMENT', valRight: '85%' },
      ],
    });
    render(
      <StatLineElement
        state={state}
        colors={colors()}
        opacities={opacities()}
        element={{ config: { statIndex: 1 } }}
      />,
    );
    expect(screen.getByText('87%')).toBeInTheDocument();
    expect(screen.getByText('TOURNAMENT')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('affiche un placeholder lorsque statIndex est hors limites', () => {
    const state = makeState({ stats: [] });
    render(
      <StatLineElement
        state={state}
        colors={colors()}
        opacities={opacities()}
        element={{ config: { statIndex: 5 } }}
      />,
    );
    expect(screen.getByText('stat-line [5]')).toBeInTheDocument();
  });

  it('affiche un placeholder lorsque statIndex d\u00e9passe le tableau existant', () => {
    const state = makeState({
      stats: [{ valLeft: '10', label: 'SHOTS', valRight: '15' }],
    });
    render(
      <StatLineElement
        state={state}
        colors={colors()}
        opacities={opacities()}
        element={{ config: { statIndex: 3 } }}
      />,
    );
    expect(screen.getByText('stat-line [3]')).toBeInTheDocument();
  });
});

describe('BarCompareElement', () => {
  it('affiche les donn\u00e9es de barre depuis state.barChartData.rows[index]', () => {
    const state = makeState({
      barChartData: {
        title: 'COMPARAISON',
        rows: [
          { label: 'SHOTS ON GOAL', valueLeft: 32, valueRight: 28, format: 'absolute' },
          { label: 'POWER PLAY', valueLeft: 75, valueRight: 80, format: 'percent' },
        ],
      },
    });
    render(
      <BarCompareElement
        state={state}
        colors={colors()}
        opacities={opacities()}
        element={{ config: { barIndex: 0 } }}
      />,
    );
    expect(screen.getByText('SHOTS ON GOAL')).toBeInTheDocument();
    expect(screen.getByText('32')).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument();
  });

  it('affiche le label et les valeurs pour un index diff\u00e9rent', () => {
    const state = makeState({
      barChartData: {
        title: 'COMPARAISON',
        rows: [
          { label: 'SHOTS ON GOAL', valueLeft: 32, valueRight: 28, format: 'absolute' },
          { label: 'POWER PLAY', valueLeft: 75, valueRight: 80, format: 'percent' },
        ],
      },
    });
    render(
      <BarCompareElement
        state={state}
        colors={colors()}
        opacities={opacities()}
        element={{ config: { barIndex: 1 } }}
      />,
    );
    expect(screen.getByText('POWER PLAY')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
  });

  it('affiche un placeholder lorsque barIndex est hors limites', () => {
    const state = makeState({
      barChartData: { title: 'TEST', rows: [] },
    });
    render(
      <BarCompareElement
        state={state}
        colors={colors()}
        opacities={opacities()}
        element={{ config: { barIndex: 7 } }}
      />,
    );
    expect(screen.getByText('bar-compare [7]')).toBeInTheDocument();
  });

  it('affiche un placeholder lorsque barIndex d\u00e9passe le tableau existant', () => {
    const state = makeState({
      barChartData: {
        title: 'TEST',
        rows: [
          { label: 'HITS', valueLeft: 18, valueRight: 22, format: 'absolute' },
        ],
      },
    });
    render(
      <BarCompareElement
        state={state}
        colors={colors()}
        opacities={opacities()}
        element={{ config: { barIndex: 1 } }}
      />,
    );
    expect(screen.getByText('bar-compare [1]')).toBeInTheDocument();
  });
});

describe('PlayerPhotoElement', () => {
  it('affiche un placeholder avec le texte "Photo" lorsque photoKey est vide', () => {
    render(
      <PlayerPhotoElement
        element={{ config: { photoKey: '', shape: 'circle' } }}
        width={200}
        height={200}
      />,
    );
    expect(screen.getByText('Photo')).toBeInTheDocument();
  });

  it('affiche le texte de photoKey lorsqu\u2019il est fourni', () => {
    render(
      <PlayerPhotoElement
        element={{ config: { photoKey: 'player-42.png', shape: 'rect' } }}
        width={150}
        height={150}
      />,
    );
    expect(screen.getByText('player-42.png')).toBeInTheDocument();
    expect(screen.queryByText('Photo')).not.toBeInTheDocument();
  });

  it('applique un borderRadius circulaire pour la forme "circle"', () => {
    render(
      <PlayerPhotoElement
        element={{ config: { photoKey: 'test', shape: 'circle' } }}
        width={100}
        height={100}
      />,
    );
    const photoBox = screen.getByText('test').closest('div');
    expect(photoBox).toHaveStyle({ borderRadius: '50%' });
  });

  it('applique un borderRadius nul pour une forme rectangulaire', () => {
    render(
      <PlayerPhotoElement
        element={{ config: { photoKey: 'rect-test', shape: 'rect' } }}
        width={100}
        height={100}
      />,
    );
    const photoBox = screen.getByText('rect-test').closest('div');
    expect(photoBox).toHaveStyle({ borderRadius: '0' });
  });

  it('utilise la plus petite dimension entre width et height', () => {
    render(
      <PlayerPhotoElement
        element={{ config: { photoKey: 'dim-test', shape: 'rect' } }}
        width={300}
        height={150}
      />,
    );
    const photoBox = screen.getByText('dim-test').closest('div');
    expect(photoBox).toHaveStyle({ width: '150px', height: '150px' });
  });
});

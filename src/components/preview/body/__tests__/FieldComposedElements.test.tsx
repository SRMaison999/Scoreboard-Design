import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderBlockElement, PenaltyColumnElement } from '@/components/preview/body/FieldComposedElements';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';

describe('FieldComposedElements', () => {
  describe('HeaderBlockElement', () => {
    it('effectue le rendu sans erreur avec les valeurs par défaut', () => {
      const { container } = render(
        <HeaderBlockElement
          state={DEFAULT_STATE}
          colors={DEFAULT_COLORS}
          opacities={DEFAULT_OPACITIES}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('affiche les noms des deux équipes', () => {
      const state = { ...DEFAULT_STATE, team1: 'CZE', team2: 'SWE' };
      render(
        <HeaderBlockElement
          state={state}
          colors={DEFAULT_COLORS}
          opacities={DEFAULT_OPACITIES}
        />,
      );
      expect(screen.getByText('CZE')).toBeInTheDocument();
      expect(screen.getByText('SWE')).toBeInTheDocument();
    });

    it('affiche les scores des deux équipes', () => {
      const state = { ...DEFAULT_STATE, score1: '4', score2: '2' };
      render(
        <HeaderBlockElement
          state={state}
          colors={DEFAULT_COLORS}
          opacities={DEFAULT_OPACITIES}
        />,
      );
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  describe('PenaltyColumnElement', () => {
    it('effectue le rendu côté gauche sans erreur', () => {
      const { container } = render(
        <PenaltyColumnElement
          state={DEFAULT_STATE}
          colors={DEFAULT_COLORS}
          opacities={DEFAULT_OPACITIES}
          element={{ config: { side: 'left' } }}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('effectue le rendu côté droit sans erreur', () => {
      const { container } = render(
        <PenaltyColumnElement
          state={DEFAULT_STATE}
          colors={DEFAULT_COLORS}
          opacities={DEFAULT_OPACITIES}
          element={{ config: { side: 'right' } }}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it('affiche les pénalités du côté gauche', () => {
      const state = {
        ...DEFAULT_STATE,
        penaltiesLeft: [{ time: '1:30', number: '15' }],
      };
      render(
        <PenaltyColumnElement
          state={state}
          colors={DEFAULT_COLORS}
          opacities={DEFAULT_OPACITIES}
          element={{ config: { side: 'left' } }}
        />,
      );
      expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('affiche les pénalités du côté droit', () => {
      const state = {
        ...DEFAULT_STATE,
        penaltiesRight: [{ time: '0:55', number: '88' }],
      };
      render(
        <PenaltyColumnElement
          state={state}
          colors={DEFAULT_COLORS}
          opacities={DEFAULT_OPACITIES}
          element={{ config: { side: 'right' } }}
        />,
      );
      expect(screen.getByText('88')).toBeInTheDocument();
    });

    it('gère une liste de pénalités vide sans erreur', () => {
      const state = {
        ...DEFAULT_STATE,
        penaltiesLeft: [],
      };
      const { container } = render(
        <PenaltyColumnElement
          state={state}
          colors={DEFAULT_COLORS}
          opacities={DEFAULT_OPACITIES}
          element={{ config: { side: 'left' } }}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });
});

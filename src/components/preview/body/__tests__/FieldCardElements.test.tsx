import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlayerCardElement, PeriodScoreRowElement } from '@/components/preview/body/FieldCardElements';

describe('PlayerCardElement', () => {
  it('affiche le nom et le numéro du joueur', () => {
    render(
      <PlayerCardElement
        element={{ type: 'player-card', config: {
          title: '', subtitle: '', playerName: 'KOPITAR', playerNumber: '11',
          playerTeam: 'LAK', playerPhoto: '', stats: [],
          fontSize: 24, textColor: '#ffffff', titleColor: '#ffffff',
        } }}
        height={450}
      />,
    );
    expect(screen.getByText('KOPITAR')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('LAK')).toBeInTheDocument();
  });

  it('affiche le titre et le sous-titre', () => {
    render(
      <PlayerCardElement
        element={{ type: 'player-card', config: {
          title: 'JOUEUR DU MATCH', subtitle: 'Meilleur marqueur',
          playerName: 'KEMPE', playerNumber: '9',
          playerTeam: '', playerPhoto: '', stats: [],
          fontSize: 24, textColor: '#ffffff', titleColor: '#ffffff',
        } }}
        height={450}
      />,
    );
    expect(screen.getByText('JOUEUR DU MATCH')).toBeInTheDocument();
    expect(screen.getByText('Meilleur marqueur')).toBeInTheDocument();
  });

  it('affiche les statistiques', () => {
    render(
      <PlayerCardElement
        element={{ type: 'player-card', config: {
          title: '', subtitle: '', playerName: 'KOPITAR', playerNumber: '11',
          playerTeam: '', playerPhoto: '', stats: [
            { label: 'BUTS', value: '12' },
            { label: 'PASSES', value: '25' },
          ],
          fontSize: 24, textColor: '#ffffff', titleColor: '#ffffff',
        } }}
        height={450}
      />,
    );
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('BUTS')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('PASSES')).toBeInTheDocument();
  });
});

describe('PeriodScoreRowElement', () => {
  it('affiche un placeholder quand il n\u2019y a pas de périodes', () => {
    render(
      <PeriodScoreRowElement
        element={{ type: 'period-score-row', config: { periods: [], fontSize: 18, headerColor: '#ffffff', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('affiche les en-têtes de période et les scores', () => {
    render(
      <PeriodScoreRowElement
        element={{ type: 'period-score-row', config: {
          periods: [
            { period: 'P1', scoreLeft: '1', scoreRight: '0' },
            { period: 'P2', scoreLeft: '2', scoreRight: '1' },
            { period: 'P3', scoreLeft: '0', scoreRight: '2' },
          ],
          fontSize: 18, headerColor: '#ffffff', textColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.getByText('P1')).toBeInTheDocument();
    expect(screen.getByText('P2')).toBeInTheDocument();
    expect(screen.getByText('P3')).toBeInTheDocument();
  });
});

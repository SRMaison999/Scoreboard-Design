import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScheduleMatchElement, ScheduleListElement } from '@/components/preview/body/FieldScheduleElements';

describe('ScheduleMatchElement', () => {
  it('affiche les équipes avec vs pour un match à venir', () => {
    render(
      <ScheduleMatchElement
        element={{ type: 'schedule-match', config: {
          date: '25/02', time: '19:00', teamLeft: 'LAK', teamRight: 'MTL',
          scoreLeft: '', scoreRight: '', status: 'upcoming', venue: 'Crypto.com Arena',
          fontSize: 18, fontFamily: '', textColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.getByText('LAK')).toBeInTheDocument();
    expect(screen.getByText('MTL')).toBeInTheDocument();
    expect(screen.getByText('vs')).toBeInTheDocument();
    expect(screen.getByText('19:00')).toBeInTheDocument();
  });

  it('affiche le score pour un match terminé', () => {
    render(
      <ScheduleMatchElement
        element={{ type: 'schedule-match', config: {
          date: '24/02', time: '20:00', teamLeft: 'TOR', teamRight: 'BOS',
          scoreLeft: '3', scoreRight: '2', status: 'finished', venue: '',
          fontSize: 18, fontFamily: '', textColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.getByText('TOR')).toBeInTheDocument();
    expect(screen.getByText('BOS')).toBeInTheDocument();
    expect(screen.getByText('FIN')).toBeInTheDocument();
    expect(screen.queryByText('vs')).not.toBeInTheDocument();
  });

  it('affiche LIVE pour un match en cours', () => {
    render(
      <ScheduleMatchElement
        element={{ type: 'schedule-match', config: {
          date: '25/02', time: '20:30', teamLeft: 'NYR', teamRight: 'CHI',
          scoreLeft: '1', scoreRight: '0', status: 'live', venue: '',
          fontSize: 18, fontFamily: '', textColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.getByText('LIVE')).toBeInTheDocument();
  });
});

describe('ScheduleListElement', () => {
  it('affiche le titre quand il est défini', () => {
    render(
      <ScheduleListElement
        element={{ type: 'schedule-list', config: { title: 'PROGRAMME', matches: [], fontSize: 16, fontFamily: '', textColor: '#ffffff', titleColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('PROGRAMME')).toBeInTheDocument();
  });

  it('affiche les matchs de la liste', () => {
    render(
      <ScheduleListElement
        element={{ type: 'schedule-list', config: {
          title: '',
          matches: [
            { date: '25/02', time: '19:00', teamLeft: 'LAK', teamRight: 'MTL', scoreLeft: '', scoreRight: '', status: 'upcoming', venue: '' },
            { date: '26/02', time: '20:00', teamLeft: 'TOR', teamRight: 'BOS', scoreLeft: '4', scoreRight: '1', status: 'finished', venue: '' },
          ],
          fontSize: 16, fontFamily: '', textColor: '#ffffff', titleColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.getByText('LAK')).toBeInTheDocument();
    expect(screen.getByText('TOR')).toBeInTheDocument();
    expect(screen.getByText('BOS')).toBeInTheDocument();
  });
});

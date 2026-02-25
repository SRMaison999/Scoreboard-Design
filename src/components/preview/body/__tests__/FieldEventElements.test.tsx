import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimelineEventElement, TimelineListElement } from '@/components/preview/body/FieldEventElements';

describe('TimelineEventElement', () => {
  it('affiche le symbole, la période et le temps', () => {
    render(
      <TimelineEventElement
        element={{ type: 'timeline-event', config: { period: 'P1', time: '12:34', kind: 'goal', description: 'KOPITAR', team: 'LAK', fontSize: 18, textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('G')).toBeInTheDocument();
    expect(screen.getByText('P1')).toBeInTheDocument();
    expect(screen.getByText('12:34')).toBeInTheDocument();
    expect(screen.getByText('KOPITAR')).toBeInTheDocument();
    expect(screen.getByText('LAK')).toBeInTheDocument();
  });

  it('affiche P pour une pénalité', () => {
    render(
      <TimelineEventElement
        element={{ type: 'timeline-event', config: { period: 'P2', time: '05:00', kind: 'penalty', description: 'Accrochage', team: 'MTL', fontSize: 18, textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('P')).toBeInTheDocument();
    expect(screen.getByText('Accrochage')).toBeInTheDocument();
  });

  it('affiche T pour un temps mort', () => {
    render(
      <TimelineEventElement
        element={{ type: 'timeline-event', config: { period: 'P3', time: '18:00', kind: 'timeout', description: '', team: 'TOR', fontSize: 18, textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('T')).toBeInTheDocument();
  });
});

describe('TimelineListElement', () => {
  it('affiche le titre quand il est défini', () => {
    render(
      <TimelineListElement
        element={{ type: 'timeline-list', config: { title: 'CHRONOLOGIE', events: [], fontSize: 16, textColor: '#ffffff', titleColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('CHRONOLOGIE')).toBeInTheDocument();
  });

  it('affiche les événements de la liste', () => {
    render(
      <TimelineListElement
        element={{ type: 'timeline-list', config: {
          title: '',
          events: [
            { period: 'P1', time: '08:22', kind: 'goal', description: 'KOPITAR', team: 'LAK' },
            { period: 'P2', time: '15:10', kind: 'penalty', description: 'Charge', team: 'MTL' },
          ],
          fontSize: 16, textColor: '#ffffff', titleColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.getByText('KOPITAR')).toBeInTheDocument();
    expect(screen.getByText('Charge')).toBeInTheDocument();
    expect(screen.getByText('08:22')).toBeInTheDocument();
    expect(screen.getByText('15:10')).toBeInTheDocument();
  });
});

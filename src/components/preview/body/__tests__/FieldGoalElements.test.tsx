import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  GoalScorerElement,
  GoalAssistsElement,
  GoalDetailsElement,
} from '@/components/preview/body/FieldGoalElements';

describe('GoalScorerElement', () => {
  it('affiche un placeholder lorsque les donn\u00e9es sont vides', () => {
    render(
      <GoalScorerElement
        element={{ config: { scorerName: '', scorerNumber: '', scorerPhoto: '', showPhoto: true, showNumber: true, fontSize: 32, fontFamily: '', textColor: '#ffffff' } }}
        height={120}
      />,
    );
    expect(screen.getByText('Buteur')).toBeInTheDocument();
  });

  it('affiche le nom et le num\u00e9ro du buteur', () => {
    render(
      <GoalScorerElement
        element={{ config: { scorerName: 'KOPITAR', scorerNumber: '11', scorerPhoto: '', showPhoto: false, showNumber: true, fontSize: 32, fontFamily: '', textColor: '#ffffff' } }}
        height={120}
      />,
    );
    expect(screen.getByText('#11 KOPITAR')).toBeInTheDocument();
  });

  it('masque le num\u00e9ro si showNumber est false', () => {
    render(
      <GoalScorerElement
        element={{ config: { scorerName: 'KOPITAR', scorerNumber: '11', scorerPhoto: '', showPhoto: false, showNumber: false, fontSize: 32, fontFamily: '', textColor: '#ffffff' } }}
        height={120}
      />,
    );
    expect(screen.getByText('KOPITAR')).toBeInTheDocument();
    expect(screen.queryByText('#11')).not.toBeInTheDocument();
  });
});

describe('GoalAssistsElement', () => {
  it('affiche un placeholder lorsque aucun assistant n\u2019est d\u00e9fini', () => {
    render(
      <GoalAssistsElement
        element={{ config: { assist1Name: '', assist1Number: '', assist2Name: '', assist2Number: '', showNumbers: true, fontSize: 20, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('Assistants')).toBeInTheDocument();
  });

  it('affiche un seul assistant', () => {
    render(
      <GoalAssistsElement
        element={{ config: { assist1Name: 'DOUGHTY', assist1Number: '8', assist2Name: '', assist2Number: '', showNumbers: true, fontSize: 20, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('#8 DOUGHTY')).toBeInTheDocument();
  });

  it('affiche deux assistants s\u00e9par\u00e9s par un slash', () => {
    render(
      <GoalAssistsElement
        element={{ config: { assist1Name: 'DOUGHTY', assist1Number: '8', assist2Name: 'KEMPE', assist2Number: '9', showNumbers: true, fontSize: 20, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('#8 DOUGHTY')).toBeInTheDocument();
    expect(screen.getByText('#9 KEMPE')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
  });
});

describe('GoalDetailsElement', () => {
  it('affiche un placeholder lorsque les donn\u00e9es sont vides', () => {
    render(
      <GoalDetailsElement
        element={{ config: { goalTime: '', goalPeriod: '', goalCountMatch: '', goalCountTournament: '', showPeriod: true, showCount: true, fontSize: 20, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('D\u00e9tails du but')).toBeInTheDocument();
  });

  it('affiche le temps et la p\u00e9riode du but', () => {
    render(
      <GoalDetailsElement
        element={{ config: { goalTime: '12:34', goalPeriod: '2nd PERIOD', goalCountMatch: '', goalCountTournament: '', showPeriod: true, showCount: false, fontSize: 20, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('12:34')).toBeInTheDocument();
    expect(screen.getByText('2nd PERIOD')).toBeInTheDocument();
  });

  it('affiche les compteurs de buts', () => {
    render(
      <GoalDetailsElement
        element={{ config: { goalTime: '05:22', goalPeriod: '', goalCountMatch: '3', goalCountTournament: '7', showPeriod: false, showCount: true, fontSize: 20, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('05:22')).toBeInTheDocument();
    expect(screen.getByText('(3) [7]')).toBeInTheDocument();
  });
});

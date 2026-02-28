import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlayerRowElement, PlayerListElement } from '@/components/preview/body/FieldPlayerElements';

describe('PlayerRowElement', () => {
  it('affiche un placeholder lorsque les donn\u00e9es sont vides', () => {
    render(
      <PlayerRowElement
        element={{ config: { playerName: '', playerNumber: '', position: '', showNumber: true, showPosition: false, fontSize: 24, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('Joueur')).toBeInTheDocument();
  });

  it('affiche le nom et le num\u00e9ro du joueur', () => {
    render(
      <PlayerRowElement
        element={{ config: { playerName: 'KOPITAR', playerNumber: '11', position: 'C', showNumber: true, showPosition: false, fontSize: 24, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('#11 KOPITAR')).toBeInTheDocument();
  });

  it('n\u2019affiche pas le num\u00e9ro si showNumber est false', () => {
    render(
      <PlayerRowElement
        element={{ config: { playerName: 'KOPITAR', playerNumber: '11', position: 'C', showNumber: false, showPosition: false, fontSize: 24, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('KOPITAR')).toBeInTheDocument();
    expect(screen.queryByText('#11')).not.toBeInTheDocument();
  });

  it('affiche la position en fran\u00e7ais si showPosition est true', () => {
    render(
      <PlayerRowElement
        element={{ config: { playerName: 'KOPITAR', playerNumber: '11', position: 'C', showNumber: true, showPosition: true, fontSize: 24, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('Centre')).toBeInTheDocument();
  });
});

describe('PlayerListElement', () => {
  it('affiche un placeholder lorsque la liste est vide et sans titre', () => {
    render(
      <PlayerListElement
        element={{ config: { title: '', players: [], showNumbers: true, showPositions: true, fontSize: 20, fontFamily: '', textColor: '#ffffff', titleColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('Liste de joueurs')).toBeInTheDocument();
  });

  it('affiche le titre et les joueurs', () => {
    render(
      <PlayerListElement
        element={{ config: {
          title: 'LIGNE 1',
          players: [
            { name: 'KOPITAR', number: '11', position: 'C' },
            { name: 'KEMPE', number: '9', position: 'LW' },
          ],
          showNumbers: true, showPositions: true, fontSize: 20, fontFamily: '', textColor: '#ffffff', titleColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.getByText('LIGNE 1')).toBeInTheDocument();
    expect(screen.getByText('KOPITAR')).toBeInTheDocument();
    expect(screen.getByText('KEMPE')).toBeInTheDocument();
  });

  it('masque les num\u00e9ros si showNumbers est false', () => {
    render(
      <PlayerListElement
        element={{ config: {
          title: 'GARDIENS',
          players: [{ name: 'QUICK', number: '32', position: 'G' }],
          showNumbers: false, showPositions: true, fontSize: 20, fontFamily: '', textColor: '#ffffff', titleColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.getByText('QUICK')).toBeInTheDocument();
    expect(screen.queryByText('#32')).not.toBeInTheDocument();
  });
});

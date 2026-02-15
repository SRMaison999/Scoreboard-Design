import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EditorPanel } from '@/components/editor/EditorPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('EditorPanel', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre Scoreboard Editor', () => {
    render(<EditorPanel />);
    expect(screen.getByText('Scoreboard Editor')).toBeInTheDocument();
  });

  it('affiche les groupes de sections', () => {
    render(<EditorPanel />);
    expect(screen.getByText('Contenu')).toBeInTheDocument();
    expect(screen.getByText('Apparence')).toBeInTheDocument();
    // "Horloge" apparaît 2 fois : groupe + section
    expect(screen.getAllByText('Horloge')).toHaveLength(2);
  });

  it('affiche les sections principales', () => {
    render(<EditorPanel />);
    expect(screen.getByText('Type de corps')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('affiche les sections timeouts et shootout', () => {
    render(<EditorPanel />);
    expect(screen.getByText(/Temps morts/)).toBeInTheDocument();
    expect(screen.getByText(/Tirs au but/)).toBeInTheDocument();
  });

  it('affiche la section goal pour body type 4', () => {
    useScoreboardStore.getState().update('bodyType', 4);
    render(<EditorPanel />);
    // Radio label + section title
    expect(screen.getAllByText(/Célébration de but/).length).toBeGreaterThanOrEqual(2);
  });

  it('affiche la section fiche joueur pour body type 5', () => {
    useScoreboardStore.getState().update('bodyType', 5);
    render(<EditorPanel />);
    expect(screen.getAllByText(/Fiche joueur/).length).toBeGreaterThanOrEqual(2);
  });

  it('affiche la section classement pour body type 6', () => {
    useScoreboardStore.getState().update('bodyType', 6);
    render(<EditorPanel />);
    expect(screen.getAllByText(/Classement/).length).toBeGreaterThanOrEqual(2);
  });

  it('affiche la section score final pour body type 7', () => {
    useScoreboardStore.getState().update('bodyType', 7);
    render(<EditorPanel />);
    expect(screen.getAllByText(/Score final/).length).toBeGreaterThanOrEqual(2);
  });

  it('affiche la section texte libre pour body type 8', () => {
    useScoreboardStore.getState().update('bodyType', 8);
    render(<EditorPanel />);
    expect(screen.getAllByText(/Texte libre/).length).toBeGreaterThanOrEqual(2);
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('affiche le rail de navigation avec 5 onglets', () => {
    render(<EditorPanel />);
    expect(screen.getByLabelText('Contenu')).toBeInTheDocument();
    expect(screen.getByLabelText('Apparence')).toBeInTheDocument();
    expect(screen.getByLabelText('Horloge')).toBeInTheDocument();
    expect(screen.getByLabelText('Animations')).toBeInTheDocument();
    expect(screen.getByLabelText('Intégrations')).toBeInTheDocument();
  });

  it('affiche les sections principales du panneau Contenu par défaut', () => {
    render(<EditorPanel />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('affiche les sous-onglets du panneau Contenu', () => {
    render(<EditorPanel />);
    expect(screen.getByRole('tab', { name: /Général/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Équipes/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Match/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Médias/i })).toBeInTheDocument();
  });

  it('affiche les sections timeouts via l\u2019onglet Match', async () => {
    const user = userEvent.setup();
    render(<EditorPanel />);
    await user.click(screen.getByRole('tab', { name: /Match/i }));
    expect(screen.getByText(/Temps morts/)).toBeInTheDocument();
    expect(screen.getByText(/Tirs au but/)).toBeInTheDocument();
  });

  it('affiche la section goal pour body type 4 via l\u2019onglet Équipes', () => {
    useScoreboardStore.getState().update('bodyType', 4);
    render(<EditorPanel />);
    expect(screen.getByText(/Célébration de but/)).toBeInTheDocument();
  });

  it('affiche la section fiche joueur pour body type 5', () => {
    useScoreboardStore.getState().update('bodyType', 5);
    render(<EditorPanel />);
    expect(screen.getByText(/Fiche joueur/)).toBeInTheDocument();
  });

  it('affiche la section classement pour body type 6', () => {
    useScoreboardStore.getState().update('bodyType', 6);
    render(<EditorPanel />);
    expect(screen.getByText(/Classement/)).toBeInTheDocument();
  });

  it('affiche la section score final pour body type 7', () => {
    useScoreboardStore.getState().update('bodyType', 7);
    render(<EditorPanel />);
    expect(screen.getByText(/Score final/)).toBeInTheDocument();
  });

  it('affiche la section texte libre pour body type 8', () => {
    useScoreboardStore.getState().update('bodyType', 8);
    render(<EditorPanel />);
    expect(screen.getByText(/Texte libre/)).toBeInTheDocument();
  });

  it('navigue vers Apparence', async () => {
    const user = userEvent.setup();
    render(<EditorPanel />);
    await user.click(screen.getByLabelText('Apparence'));
    expect(screen.getByText(/Dimensions du template/)).toBeInTheDocument();
  });

  it('navigue vers Intégrations', async () => {
    const user = userEvent.setup();
    render(<EditorPanel />);
    await user.click(screen.getByLabelText('Intégrations'));
    expect(screen.getByText(/Scores en direct/)).toBeInTheDocument();
  });
});

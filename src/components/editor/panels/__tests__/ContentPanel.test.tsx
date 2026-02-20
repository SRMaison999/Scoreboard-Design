import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentPanel } from '@/components/editor/panels/ContentPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useEditorUIStore } from '@/stores/editorUIStore';

describe('ContentPanel', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
    useEditorUIStore.setState({ activeRailTab: 'content', activeContentSubTab: 'teams' });
  });

  it('affiche les sous-onglets', () => {
    render(<ContentPanel />);
    expect(screen.getByRole('tab', { name: /Général/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Équipes/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Match/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Médias/i })).toBeInTheDocument();
  });

  it('affiche le header par défaut (onglet Équipes)', () => {
    render(<ContentPanel />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('affiche le contenu Match au clic sur l\u2019onglet Match', async () => {
    const user = userEvent.setup();
    render(<ContentPanel />);

    await user.click(screen.getByRole('tab', { name: /Match/i }));
    expect(screen.getByText(/Temps morts/)).toBeInTheDocument();
  });

  it('affiche le contenu Général au clic sur l\u2019onglet Général', async () => {
    const user = userEvent.setup();
    render(<ContentPanel />);

    await user.click(screen.getByRole('tab', { name: /Général/i }));
    expect(screen.getByText(/Colonnes de pénalités/)).toBeInTheDocument();
  });

  it('affiche le contenu Médias au clic sur l\u2019onglet Médias', async () => {
    const user = userEvent.setup();
    render(<ContentPanel />);

    await user.click(screen.getByRole('tab', { name: /Médias/i }));
    expect(screen.getByText(/Photos des joueurs/)).toBeInTheDocument();
  });

  it('masque le header en mode Layout libre pleine page', () => {
    useScoreboardStore.getState().update('bodyType', 14);
    useScoreboardStore.getState().updateCustomFieldsOption('fullPageMode', true);
    render(<ContentPanel />);
    expect(screen.queryByText('Header')).not.toBeInTheDocument();
  });

  it('affiche le header en mode Layout libre sans pleine page', () => {
    useScoreboardStore.getState().update('bodyType', 14);
    useScoreboardStore.getState().updateCustomFieldsOption('fullPageMode', false);
    render(<ContentPanel />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});

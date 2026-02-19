import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditorNavigation } from '@/components/editor/EditorNavigation';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('EditorNavigation', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('affiche le rail avec 6 onglets', () => {
    render(<EditorNavigation />);
    expect(screen.getByLabelText('Modes')).toBeInTheDocument();
    expect(screen.getByLabelText('Contenu')).toBeInTheDocument();
    expect(screen.getByLabelText('Apparence')).toBeInTheDocument();
    expect(screen.getByLabelText('Horloge')).toBeInTheDocument();
    expect(screen.getByLabelText('Animations')).toBeInTheDocument();
    expect(screen.getByLabelText('Intégrations')).toBeInTheDocument();
  });

  it('affiche le panneau Contenu par défaut', () => {
    render(<EditorNavigation />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('navigue vers Apparence au clic', async () => {
    const user = userEvent.setup();
    render(<EditorNavigation />);

    await user.click(screen.getByLabelText('Apparence'));
    expect(screen.getByText(/Dimensions du template/)).toBeInTheDocument();
  });

  it('navigue vers Horloge au clic', async () => {
    const user = userEvent.setup();
    render(<EditorNavigation />);

    await user.click(screen.getByLabelText('Horloge'));
    expect(screen.getByText(/Afficher l'horloge/)).toBeInTheDocument();
  });

  it('navigue vers Intégrations au clic', async () => {
    const user = userEvent.setup();
    render(<EditorNavigation />);

    await user.click(screen.getByLabelText('Intégrations'));
    expect(screen.getByText(/Scores en direct/)).toBeInTheDocument();
  });
});

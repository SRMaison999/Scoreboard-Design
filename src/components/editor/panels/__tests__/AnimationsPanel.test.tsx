import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnimationsPanel } from '@/components/editor/panels/AnimationsPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('AnimationsPanel', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('affiche les sous-onglets', () => {
    render(<AnimationsPanel />);
    expect(screen.getByRole('tab', { name: /Animations/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Export/i })).toBeInTheDocument();
  });

  it('affiche la section Animations par défaut', () => {
    render(<AnimationsPanel />);
    /* "Animations" apparaît comme sous-onglet actif ET titre de section */
    expect(screen.getAllByText(/Animations/).length).toBeGreaterThanOrEqual(2);
  });

  it('affiche le contenu Export au clic', async () => {
    const user = userEvent.setup();
    render(<AnimationsPanel />);

    await user.click(screen.getByRole('tab', { name: /Export/i }));
    expect(screen.getByText(/Export vidéo/)).toBeInTheDocument();
  });
});

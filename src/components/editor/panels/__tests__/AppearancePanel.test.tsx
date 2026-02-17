import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppearancePanel } from '@/components/editor/panels/AppearancePanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('AppearancePanel', () => {
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
    render(<AppearancePanel />);
    expect(screen.getByRole('tab', { name: /Style/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Polices/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Couleurs/i })).toBeInTheDocument();
  });

  it('affiche le contenu Style par défaut', () => {
    render(<AppearancePanel />);
    expect(screen.getByText(/Dimensions du template/)).toBeInTheDocument();
  });

  it('affiche le contenu Polices au clic', async () => {
    const user = userEvent.setup();
    render(<AppearancePanel />);

    await user.click(screen.getByRole('tab', { name: /Polices/i }));
    expect(screen.getByText(/Tailles de police/)).toBeInTheDocument();
  });

  it('affiche le contenu Couleurs au clic', async () => {
    const user = userEvent.setup();
    render(<AppearancePanel />);

    await user.click(screen.getByRole('tab', { name: /Couleurs/i }));
    expect(screen.getByText(/Couleurs - Background/)).toBeInTheDocument();
  });
});

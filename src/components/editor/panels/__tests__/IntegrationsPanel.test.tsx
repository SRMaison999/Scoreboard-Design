import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntegrationsPanel } from '@/components/editor/panels/IntegrationsPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('IntegrationsPanel', () => {
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
    render(<IntegrationsPanel />);
    expect(screen.getByRole('tab', { name: /Live/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Multi/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Sync/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Broadcast/i })).toBeInTheDocument();
  });

  it('affiche le contenu Live par défaut', () => {
    render(<IntegrationsPanel />);
    expect(screen.getByText(/Scores en direct/)).toBeInTheDocument();
  });

  it('affiche le contenu Sync au clic', async () => {
    const user = userEvent.setup();
    render(<IntegrationsPanel />);

    await user.click(screen.getByRole('tab', { name: /Sync/i }));
    expect(screen.getByText(/Synchronisation/)).toBeInTheDocument();
  });
});

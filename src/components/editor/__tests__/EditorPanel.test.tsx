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

  it('affiche les sections principales', () => {
    render(<EditorPanel />);
    expect(screen.getByText('Type de corps')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Horloge')).toBeInTheDocument();
  });
});

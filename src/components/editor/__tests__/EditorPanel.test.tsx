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
});

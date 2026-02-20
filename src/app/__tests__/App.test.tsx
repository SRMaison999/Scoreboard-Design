import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '@/app/App';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

describe('App', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
  });

  it('rend l editeur et la preview', () => {
    render(<App />);
    expect(screen.getByText('Scoreboard Editor')).toBeInTheDocument();
    expect(screen.getByText('Ouvrir la sortie')).toBeInTheDocument();
  });

  it('affiche le bouton Specs dans la barre d outils', () => {
    render(<App />);
    expect(screen.getByText(EDITOR_LABELS.specsToolbarButton)).toBeInTheDocument();
  });
});

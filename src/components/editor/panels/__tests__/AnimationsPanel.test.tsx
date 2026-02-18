import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnimationsPanel } from '@/components/editor/panels/AnimationsPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

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
    /* La section Export est fermée par défaut ; on clique sur le titre de section pour l'ouvrir.
       "Export" apparaît aussi comme onglet, donc on cible le span du titre de section. */
    const sectionTitles = screen.getAllByText(EDITOR_LABELS.sectionExport);
    const sectionTitle = sectionTitles.find((el) => el.tagName === 'SPAN');
    if (sectionTitle) await user.click(sectionTitle);
    expect(screen.getByText(EDITOR_LABELS.exportVideoFormat)).toBeInTheDocument();
  });
});

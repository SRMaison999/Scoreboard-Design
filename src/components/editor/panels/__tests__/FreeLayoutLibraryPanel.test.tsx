import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FreeLayoutLibraryPanel } from '../FreeLayoutLibraryPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useEditorUIStore } from '@/stores/editorUIStore';
import { CUSTOM_FIELD_LABELS, LIBRARY_CATEGORY_LABELS } from '@/constants/customFields';

describe('FreeLayoutLibraryPanel', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
    useEditorUIStore.setState({ activeLibraryCategory: 'all' });
  });

  it('rend le panneau avec le data-testid', () => {
    render(<FreeLayoutLibraryPanel />);
    expect(screen.getByTestId('free-layout-library-panel')).toBeInTheDocument();
  });

  it('affiche les filtres de cat\u00e9gorie sous forme d\'onglets', () => {
    render(<FreeLayoutLibraryPanel />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(7);
    expect(tabs[0]?.textContent).toBe(CUSTOM_FIELD_LABELS.freeLayoutCategoryAll);
  });

  it('change de cat\u00e9gorie au clic sur un filtre', async () => {
    const user = userEvent.setup();
    render(<FreeLayoutLibraryPanel />);

    const tabs = screen.getAllByRole('tab');
    const textTab = tabs.find((t) => t.textContent === LIBRARY_CATEGORY_LABELS.text);
    if (!textTab) throw new Error('Onglet Texte introuvable');
    await user.click(textTab);
    expect(useEditorUIStore.getState().activeLibraryCategory).toBe('text');
  });

  it('affiche tous les \u00e9l\u00e9ments quand "Tout" est s\u00e9lectionn\u00e9', () => {
    render(<FreeLayoutLibraryPanel />);
    /* V\u00e9rifier qu'au moins un \u00e9l\u00e9ment de plusieurs cat\u00e9gories est affich\u00e9 */
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Bloc de texte')).toBeInTheDocument();
  });

  it('filtre les \u00e9l\u00e9ments par cat\u00e9gorie', () => {
    useEditorUIStore.setState({ activeLibraryCategory: 'text' });
    render(<FreeLayoutLibraryPanel />);
    expect(screen.getByText('Bloc de texte')).toBeInTheDocument();
    expect(screen.queryByText('Score')).not.toBeInTheDocument();
  });
});

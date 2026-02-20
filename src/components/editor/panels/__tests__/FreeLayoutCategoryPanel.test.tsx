import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FreeLayoutCategoryPanel } from '../FreeLayoutCategoryPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { LIBRARY_CATEGORY_LABELS, CUSTOM_FIELD_LABELS, LIBRARY_ELEMENTS } from '@/constants/customFields';

describe('FreeLayoutCategoryPanel', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
    /* Pas de dépendance à activeFreeLayoutTab */
  });

  it('affiche le titre de la cat\u00e9gorie Match', () => {
    render(<FreeLayoutCategoryPanel category="match" />);
    expect(screen.getByText(LIBRARY_CATEGORY_LABELS.match)).toBeInTheDocument();
  });

  it('affiche les \u00e9l\u00e9ments de la cat\u00e9gorie Match', () => {
    render(<FreeLayoutCategoryPanel category="match" />);
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Horloge')).toBeInTheDocument();
    expect(screen.getByText('P\u00e9riode')).toBeInTheDocument();
  });

  it('affiche les descriptions des \u00e9l\u00e9ments', () => {
    render(<FreeLayoutCategoryPanel category="match" />);
    const scoreEl = LIBRARY_ELEMENTS.find((el) => el.type === 'score-display');
    const clockEl = LIBRARY_ELEMENTS.find((el) => el.type === 'clock-display');
    const periodEl = LIBRARY_ELEMENTS.find((el) => el.type === 'period-display');
    expect(screen.getByText(scoreEl!.description)).toBeInTheDocument();
    expect(screen.getByText(clockEl!.description)).toBeInTheDocument();
    expect(screen.getByText(periodEl!.description)).toBeInTheDocument();
  });

  it('affiche les \u00e9l\u00e9ments de la cat\u00e9gorie M\u00e9dias', () => {
    render(<FreeLayoutCategoryPanel category="media" />);
    expect(screen.getByText('Image')).toBeInTheDocument();
    expect(screen.getByText('Forme')).toBeInTheDocument();
    expect(screen.getByText('S\u00e9parateur')).toBeInTheDocument();
  });

  it('affiche l\'indice de glisser-d\u00e9poser', () => {
    render(<FreeLayoutCategoryPanel category="text" />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.freeLayoutAddHint)).toBeInTheDocument();
  });

  it('ajoute un champ au clic', async () => {
    const user = userEvent.setup();
    render(<FreeLayoutCategoryPanel category="text" />);

    await user.click(screen.getByText('Bloc de texte'));
    expect(useScoreboardStore.getState().customFieldsData.fields).toHaveLength(1);
  });

  it('affiche le data-testid correct', () => {
    render(<FreeLayoutCategoryPanel category="data" />);
    expect(screen.getByTestId('free-layout-category-data')).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserManualSearchResults } from '../UserManualSearchResults';
import { EDITOR_LABELS } from '@/constants/labels';
import type { ManualSearchResult } from '@/types/userManual';

const mockResults: ManualSearchResult[] = [
  {
    chapterIndex: 0,
    chapterTitle: 'Introduction',
    matchCount: 5,
    snippets: [
      { text: '...le scoreboard affiche les scores...', matchIndex: 10 },
      { text: '...interface de configuration du score...', matchIndex: 50 },
    ],
  },
  {
    chapterIndex: 3,
    chapterTitle: 'Layout libre',
    matchCount: 2,
    snippets: [
      { text: '...placer un element Score sur le canvas...', matchIndex: 20 },
    ],
  },
];

describe('UserManualSearchResults', () => {
  it('affiche les resultats groupes par chapitre', () => {
    render(
      <UserManualSearchResults
        results={mockResults}
        onSelectChapter={vi.fn()}
      />,
    );
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Layout libre')).toBeInTheDocument();
  });

  it('affiche le nombre de correspondances par chapitre', () => {
    render(
      <UserManualSearchResults
        results={mockResults}
        onSelectChapter={vi.fn()}
      />,
    );
    expect(screen.getByText(`5 ${EDITOR_LABELS.userManualSearchMatchCount}`)).toBeInTheDocument();
    expect(screen.getByText(`2 ${EDITOR_LABELS.userManualSearchMatchCount}`)).toBeInTheDocument();
  });

  it('affiche les extraits de contexte', () => {
    render(
      <UserManualSearchResults
        results={mockResults}
        onSelectChapter={vi.fn()}
      />,
    );
    expect(screen.getByText('...le scoreboard affiche les scores...')).toBeInTheDocument();
  });

  it('appelle onSelectChapter au clic sur un resultat', () => {
    const onSelectChapter = vi.fn();
    render(
      <UserManualSearchResults
        results={mockResults}
        onSelectChapter={onSelectChapter}
      />,
    );
    fireEvent.click(screen.getByTestId('manual-search-result-0'));
    expect(onSelectChapter).toHaveBeenCalledWith(0);
  });

  it('affiche un message quand aucun resultat', () => {
    render(
      <UserManualSearchResults
        results={[]}
        onSelectChapter={vi.fn()}
      />,
    );
    expect(screen.getByText(EDITOR_LABELS.userManualSearchNoResults)).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserManual } from '@/components/common/UserManual';
import { EDITOR_LABELS } from '@/constants/labels';
import { MANUAL_CHAPTERS } from '@/data/manual/chapters';

const firstChapter = MANUAL_CHAPTERS[0] as (typeof MANUAL_CHAPTERS)[number];
const thirdChapter = MANUAL_CHAPTERS[2] as (typeof MANUAL_CHAPTERS)[number];
const sixthChapter = MANUAL_CHAPTERS[5] as (typeof MANUAL_CHAPTERS)[number];

describe('UserManual', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    activeChapterIndex: 0,
    onChapterSelect: vi.fn(),
  };

  it('affiche le titre du manuel quand ouvert', () => {
    render(<UserManual {...defaultProps} />);
    expect(screen.getByText(EDITOR_LABELS.userManualTitle)).toBeInTheDocument();
  });

  it('ne rend rien quand ferme', () => {
    render(<UserManual {...defaultProps} open={false} />);
    expect(screen.queryByText(EDITOR_LABELS.userManualTitle)).not.toBeInTheDocument();
  });

  it('affiche la table des matieres', () => {
    render(<UserManual {...defaultProps} />);
    expect(screen.getByText(EDITOR_LABELS.userManualTableOfContents)).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    const chapterButtons = buttons.filter((btn) =>
      MANUAL_CHAPTERS.some((ch) => btn.textContent?.includes(ch.title)),
    );
    expect(chapterButtons.length).toBe(MANUAL_CHAPTERS.length);
  });

  it('affiche le contenu du chapitre actif', () => {
    render(<UserManual {...defaultProps} activeChapterIndex={0} />);
    expect(screen.getByTestId('manual-chapter-title')).toHaveTextContent(
      firstChapter.title,
    );
  });

  it('appelle onChapterSelect au clic sur un chapitre', async () => {
    const user = userEvent.setup();
    const onChapterSelect = vi.fn();
    render(<UserManual {...defaultProps} onChapterSelect={onChapterSelect} />);
    await user.click(screen.getByText(thirdChapter.title));
    expect(onChapterSelect).toHaveBeenCalledWith(2);
  });

  it('affiche le bouton fermer', () => {
    render(<UserManual {...defaultProps} />);
    expect(screen.getByText(EDITOR_LABELS.userManualClose)).toBeInTheDocument();
  });

  it('appelle onClose au clic sur Fermer', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<UserManual {...defaultProps} onClose={onClose} />);
    await user.click(screen.getByText(EDITOR_LABELS.userManualClose));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('navigue vers un autre chapitre', () => {
    const { rerender } = render(<UserManual {...defaultProps} activeChapterIndex={0} />);
    expect(screen.getByTestId('manual-chapter-title')).toHaveTextContent(
      firstChapter.title,
    );
    rerender(<UserManual {...defaultProps} activeChapterIndex={5} />);
    expect(screen.getByTestId('manual-chapter-title')).toHaveTextContent(
      sixthChapter.title,
    );
  });
});

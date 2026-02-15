import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimeoutSection } from '@/components/editor/TimeoutSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('TimeoutSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section', () => {
    render(<TimeoutSection />);
    expect(screen.getByText(/Temps morts/)).toBeInTheDocument();
  });

  it('affiche la checkbox', () => {
    render(<TimeoutSection />);
    expect(screen.getByText(/Afficher les temps morts/)).toBeInTheDocument();
  });

  it('masque les champs quand désactivé', () => {
    render(<TimeoutSection />);
    expect(screen.queryByText(/Temps morts G/)).not.toBeInTheDocument();
  });

  it('affiche les champs quand activé', async () => {
    const user = userEvent.setup();
    render(<TimeoutSection />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(screen.getByText(/Temps morts G/)).toBeInTheDocument();
    expect(screen.getByText(/Temps morts D/)).toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShootoutSection } from '@/components/editor/ShootoutSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('ShootoutSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section', () => {
    render(<ShootoutSection />);
    expect(screen.getByText(/Tirs au but/)).toBeInTheDocument();
  });

  it('affiche la checkbox', () => {
    render(<ShootoutSection />);
    expect(screen.getByText(/Afficher les tirs au but/)).toBeInTheDocument();
  });

  it('masque les éditeurs quand désactivé', () => {
    render(<ShootoutSection />);
    expect(screen.queryByText(/Ajouter un tir/)).not.toBeInTheDocument();
  });

  it('affiche les éditeurs quand activé', async () => {
    const user = userEvent.setup();
    render(<ShootoutSection />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(screen.getAllByText(/Ajouter un tir/).length).toBe(2);
  });

  it('ajoute un tir au but', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().update('showShootout', true);
    render(<ShootoutSection />);
    const addButtons = screen.getAllByText(/Ajouter un tir/);
    await user.click(addButtons[0]!);
    expect(useScoreboardStore.getState().shootoutLeft).toHaveLength(1);
  });
});

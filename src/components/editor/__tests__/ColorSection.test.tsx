import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorSection } from '@/components/editor/ColorSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

async function expandBgSection(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByText('Couleurs - Arrière-plan'));
}

describe('ColorSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche les boutons de mode fond unie et degradé', async () => {
    const user = userEvent.setup();
    render(<ColorSection />);
    await expandBgSection(user);

    expect(screen.getByText('Couleur unie')).toBeInTheDocument();
    expect(screen.getByText('Dégradé')).toBeInTheDocument();
  });

  it('affiche les 3 pickers en mode dégradé par défaut', async () => {
    const user = userEvent.setup();
    render(<ColorSection />);
    await expandBgSection(user);

    expect(screen.getByText('Haut')).toBeInTheDocument();
    expect(screen.getByText('Milieu')).toBeInTheDocument();
    expect(screen.getByText('Bas')).toBeInTheDocument();
  });

  it('affiche un seul picker en mode couleur unie', async () => {
    const user = userEvent.setup();
    render(<ColorSection />);
    await expandBgSection(user);

    await user.click(screen.getByText('Couleur unie'));

    expect(screen.getByText('Couleur de fond')).toBeInTheDocument();
    expect(screen.queryByText('Haut')).not.toBeInTheDocument();
    expect(screen.queryByText('Milieu')).not.toBeInTheDocument();
    expect(screen.queryByText('Bas')).not.toBeInTheDocument();
  });

  it('passe le bgMode à uniform dans le store quand on clique sur Couleur unie', async () => {
    const user = userEvent.setup();
    render(<ColorSection />);
    await expandBgSection(user);

    await user.click(screen.getByText('Couleur unie'));

    expect(useScoreboardStore.getState().bgMode).toBe('uniform');
  });

  it('revient en mode dégradé quand on clique sur Dégradé', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().update('bgMode', 'uniform');
    render(<ColorSection />);
    await expandBgSection(user);

    await user.click(screen.getByText('Dégradé'));

    expect(useScoreboardStore.getState().bgMode).toBe('gradient');
  });
});

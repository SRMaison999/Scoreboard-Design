import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BackgroundSection } from '@/components/editor/BackgroundSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('BackgroundSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section', () => {
    render(<BackgroundSection />);
    expect(screen.getAllByText(/Arrière-plan/).length).toBeGreaterThanOrEqual(1);
  });

  it('affiche le sélecteur de mode', () => {
    render(<BackgroundSection />);
    expect(screen.getByText('Aucun')).toBeInTheDocument();
    expect(screen.getByText('Image')).toBeInTheDocument();
  });

  it('mode par défaut est none', () => {
    render(<BackgroundSection />);
    const select = screen.getByDisplayValue('Aucun');
    expect(select).toBeInTheDocument();
  });

  it('affiche le champ upload image quand mode est image', async () => {
    const user = userEvent.setup();
    render(<BackgroundSection />);
    const select = screen.getByDisplayValue('Aucun');
    await user.selectOptions(select, 'image');
    expect(useScoreboardStore.getState().backgroundMediaMode).toBe('image');
    expect(screen.getByText('Choisir un fichier')).toBeInTheDocument();
  });

  it('affiche le champ upload vidéo quand mode est video', async () => {
    const user = userEvent.setup();
    render(<BackgroundSection />);
    const select = screen.getByDisplayValue('Aucun');
    await user.selectOptions(select, 'video');
    expect(useScoreboardStore.getState().backgroundMediaMode).toBe('video');
    expect(screen.getByText('Choisir un fichier')).toBeInTheDocument();
  });

  it('vide l\'URL quand on passe en mode none', async () => {
    const user = userEvent.setup();
    useScoreboardStore.getState().update('backgroundMediaMode', 'image');
    useScoreboardStore.getState().update('backgroundMediaUrl', 'data:image/png;base64,test');

    render(<BackgroundSection />);
    const select = screen.getByDisplayValue('Image');
    await user.selectOptions(select, 'none');
    expect(useScoreboardStore.getState().backgroundMediaMode).toBe('none');
    expect(useScoreboardStore.getState().backgroundMediaUrl).toBe('');
  });

  it('n\'affiche pas de zone d\'upload en mode none', () => {
    render(<BackgroundSection />);
    expect(screen.queryByText('Choisir un fichier')).not.toBeInTheDocument();
  });
});

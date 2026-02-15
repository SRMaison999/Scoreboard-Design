import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { PhotoSection } from '@/components/editor/PhotoSection';
import { usePhotoStore } from '@/stores/photoStore';
import { db } from '@/api/db';

describe('PhotoSection', () => {
  beforeEach(async () => {
    await db.playerPhotos.clear();
    usePhotoStore.setState({ photos: [], loading: false });
  });

  it('affiche le titre de section', () => {
    render(<PhotoSection />);
    expect(screen.getByText('Photos des joueurs')).toBeInTheDocument();
  });

  it('affiche le message quand aucune photo', async () => {
    render(<PhotoSection />);
    await waitFor(() => {
      expect(screen.getByText('Aucune photo enregistrée')).toBeInTheDocument();
    });
  });

  it('affiche les champs de formulaire', () => {
    render(<PhotoSection />);
    expect(screen.getByText('Équipe')).toBeInTheDocument();
    expect(screen.getByText('Numéro')).toBeInTheDocument();
    expect(screen.getByText('Nom du joueur')).toBeInTheDocument();
  });

  it('affiche le bouton d ajout', () => {
    render(<PhotoSection />);
    expect(screen.getByText('Ajouter une photo')).toBeInTheDocument();
  });

  it('le bouton est désactivé quand le numéro est vide', () => {
    render(<PhotoSection />);
    const btn = screen.getByText('Ajouter une photo');
    expect(btn).toBeDisabled();
  });

  it('affiche les photos existantes', () => {
    usePhotoStore.setState({
      photos: [
        {
          id: 'CAN-11',
          team: 'CAN',
          number: '11',
          playerName: 'Kopitar',
          dataUrl: 'data:image/webp;base64,abc',
          created: new Date().toISOString(),
        },
      ],
      loading: false,
    });

    render(<PhotoSection />);
    expect(screen.getByText(/CAN #11 Kopitar/)).toBeInTheDocument();
  });

  it('n affiche pas le message vide quand il y a des photos', () => {
    usePhotoStore.setState({
      photos: [
        {
          id: 'CAN-11',
          team: 'CAN',
          number: '11',
          playerName: 'Test',
          dataUrl: 'data:image/webp;base64,abc',
          created: new Date().toISOString(),
        },
      ],
      loading: false,
    });

    render(<PhotoSection />);
    expect(screen.queryByText('Aucune photo enregistrée')).not.toBeInTheDocument();
  });

  it('affiche le chargement', () => {
    usePhotoStore.setState({ photos: [], loading: true });
    render(<PhotoSection />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});

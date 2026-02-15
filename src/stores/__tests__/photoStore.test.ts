import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePhotoStore } from '@/stores/photoStore';
import { db } from '@/api/db';

vi.mock('@/utils/image', () => ({
  processPlayerPhoto: vi.fn((file: File) =>
    Promise.resolve(`data:image/webp;base64,mock_${file.name}`),
  ),
}));

describe('photoStore', () => {
  beforeEach(async () => {
    await db.playerPhotos.clear();
    usePhotoStore.setState({ photos: [], loading: false });
  });

  it('fetchPhotos charge les photos depuis IndexedDB', async () => {
    await db.playerPhotos.add({
      id: 'CAN-11',
      team: 'CAN',
      number: '11',
      playerName: 'Test Player',
      dataUrl: 'data:image/webp;base64,abc',
      created: new Date().toISOString(),
    });

    await usePhotoStore.getState().fetchPhotos();
    const { photos } = usePhotoStore.getState();
    expect(photos).toHaveLength(1);
    expect(photos[0]!.team).toBe('CAN');
    expect(photos[0]!.number).toBe('11');
  });

  it('addPhoto ajoute une photo dans IndexedDB', async () => {
    const file = new File(['content'], 'photo.png', { type: 'image/png' });
    await usePhotoStore.getState().addPhoto('SVK', '88', 'Kopitar', file);

    const { photos } = usePhotoStore.getState();
    expect(photos).toHaveLength(1);
    expect(photos[0]!.id).toBe('SVK-88');
    expect(photos[0]!.playerName).toBe('Kopitar');
  });

  it('addPhoto remplace une photo existante avec le même team-number', async () => {
    const file1 = new File(['content1'], 'photo1.png', { type: 'image/png' });
    const file2 = new File(['content2'], 'photo2.png', { type: 'image/png' });

    await usePhotoStore.getState().addPhoto('CAN', '11', 'Player A', file1);
    await usePhotoStore.getState().addPhoto('CAN', '11', 'Player B', file2);

    const { photos } = usePhotoStore.getState();
    expect(photos).toHaveLength(1);
    expect(photos[0]!.playerName).toBe('Player B');
  });

  it('removePhoto supprime une photo', async () => {
    const file = new File(['content'], 'photo.png', { type: 'image/png' });
    await usePhotoStore.getState().addPhoto('FIN', '16', 'Barkov', file);
    expect(usePhotoStore.getState().photos).toHaveLength(1);

    await usePhotoStore.getState().removePhoto('FIN-16');
    expect(usePhotoStore.getState().photos).toHaveLength(0);
  });

  it('getPhoto retourne le dataUrl d une photo existante', async () => {
    const file = new File(['content'], 'photo.png', { type: 'image/png' });
    await usePhotoStore.getState().addPhoto('CAN', '99', 'Gretzky', file);

    const url = usePhotoStore.getState().getPhoto('CAN', '99');
    expect(url).toContain('data:image/webp;base64,mock_');
  });

  it('getPhoto retourne une chaîne vide si la photo n existe pas', () => {
    const url = usePhotoStore.getState().getPhoto('USA', '1');
    expect(url).toBe('');
  });

  it('fetchPhotos met loading à true puis false', async () => {
    const promise = usePhotoStore.getState().fetchPhotos();
    expect(usePhotoStore.getState().loading).toBe(true);
    await promise;
    expect(usePhotoStore.getState().loading).toBe(false);
  });
});

import { create } from 'zustand';
import { db } from '@/api/db';
import type { PlayerPhoto } from '@/types/playerPhoto';
import { playerPhotoKey } from '@/types/playerPhoto';
import { processPlayerPhoto } from '@/utils/image';

interface PhotoStoreState {
  readonly photos: PlayerPhoto[];
  readonly loading: boolean;
}

interface PhotoStoreActions {
  fetchPhotos: () => Promise<void>;
  addPhoto: (team: string, number: string, playerName: string, file: File) => Promise<void>;
  removePhoto: (id: string) => Promise<void>;
  getPhoto: (team: string, number: string) => string;
}

type PhotoStore = PhotoStoreState & PhotoStoreActions;

export const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],
  loading: false,

  fetchPhotos: async () => {
    set({ loading: true });
    const photos = await db.playerPhotos.toArray();
    set({ photos, loading: false });
  },

  addPhoto: async (team, number, playerName, file) => {
    const dataUrl = await processPlayerPhoto(file);
    const id = playerPhotoKey(team, number);
    const photo: PlayerPhoto = {
      id,
      team,
      number,
      playerName,
      dataUrl,
      created: new Date().toISOString(),
    };

    const existing = await db.playerPhotos.get(id);
    if (existing) {
      await db.playerPhotos.update(id, {
        dataUrl,
        playerName,
        created: photo.created,
      });
    } else {
      await db.playerPhotos.add(photo);
    }

    await get().fetchPhotos();
  },

  removePhoto: async (id) => {
    await db.playerPhotos.delete(id);
    await get().fetchPhotos();
  },

  getPhoto: (team, number) => {
    const id = playerPhotoKey(team, number);
    const found = get().photos.find((p) => p.id === id);
    return found?.dataUrl ?? '';
  },
}));

import { create } from 'zustand';
import { db } from '@/api/db';
import type { LogoEntry, LogoType } from '@/types/logo';
import { logoEntryId } from '@/types/logo';
import { processLogo } from '@/utils/image';

interface LogoStoreState {
  readonly logos: LogoEntry[];
  readonly loading: boolean;
}

interface LogoStoreActions {
  fetchLogos: () => Promise<void>;
  addLogo: (logoType: LogoType, key: string, name: string, file: File) => Promise<void>;
  removeLogo: (id: string) => Promise<void>;
  getLogo: (logoType: LogoType, key: string) => string;
  getLogosByType: (logoType: LogoType) => LogoEntry[];
}

type LogoStore = LogoStoreState & LogoStoreActions;

export const useLogoStore = create<LogoStore>((set, get) => ({
  logos: [],
  loading: false,

  fetchLogos: async () => {
    set({ loading: true });
    const logos = await db.logos.toArray();
    set({ logos, loading: false });
  },

  addLogo: async (logoType, key, name, file) => {
    const dataUrl = await processLogo(file);
    const id = logoEntryId(logoType, key);
    const logo: LogoEntry = {
      id,
      logoType,
      key,
      name,
      dataUrl,
      created: new Date().toISOString(),
    };
    const existing = await db.logos.get(id);
    if (existing) {
      await db.logos.update(id, { dataUrl, name, created: logo.created });
    } else {
      await db.logos.add(logo);
    }
    await get().fetchLogos();
  },

  removeLogo: async (id) => {
    await db.logos.delete(id);
    await get().fetchLogos();
  },

  getLogo: (logoType, key) => {
    const id = logoEntryId(logoType, key);
    const found = get().logos.find((l) => l.id === id);
    return found?.dataUrl ?? '';
  },

  getLogosByType: (logoType) => {
    return get().logos.filter((l) => l.logoType === logoType);
  },
}));

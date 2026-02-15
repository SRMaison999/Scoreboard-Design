import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useLogoStore } from '@/stores/logoStore';
import { db } from '@/api/db';

vi.mock('@/utils/image', () => ({
  processLogo: vi.fn((file: File) =>
    Promise.resolve(`data:image/webp;base64,logo_${file.name}`),
  ),
  processPlayerPhoto: vi.fn((file: File) =>
    Promise.resolve(`data:image/webp;base64,mock_${file.name}`),
  ),
  isValidImageFile: vi.fn(() => true),
  fileToDataUrl: vi.fn(() => Promise.resolve('data:image/png;base64,test')),
  compressImage: vi.fn((url: string) => Promise.resolve(url)),
  compressLogo: vi.fn((url: string) => Promise.resolve(url)),
  compressBackgroundImage: vi.fn((url: string) => Promise.resolve(url)),
  processBackgroundImage: vi.fn((file: File) =>
    Promise.resolve(`data:image/webp;base64,bg_${file.name}`),
  ),
  isValidVideoFile: vi.fn(() => false),
}));

describe('logoStore', () => {
  beforeEach(async () => {
    await db.logos.clear();
    useLogoStore.setState({ logos: [], loading: false });
  });

  it('fetchLogos charge les logos depuis IndexedDB', async () => {
    await db.logos.add({
      id: 'team-CAN',
      logoType: 'team',
      key: 'CAN',
      name: 'Canada',
      dataUrl: 'data:image/webp;base64,abc',
      created: new Date().toISOString(),
    });

    await useLogoStore.getState().fetchLogos();
    const { logos } = useLogoStore.getState();
    expect(logos).toHaveLength(1);
    expect(logos[0]!.logoType).toBe('team');
    expect(logos[0]!.key).toBe('CAN');
  });

  it('addLogo ajoute un logo dans IndexedDB', async () => {
    const file = new File(['content'], 'logo.png', { type: 'image/png' });
    await useLogoStore.getState().addLogo('team', 'USA', 'United States', file);

    const { logos } = useLogoStore.getState();
    expect(logos).toHaveLength(1);
    expect(logos[0]!.id).toBe('team-USA');
    expect(logos[0]!.name).toBe('United States');
  });

  it('addLogo remplace un logo existant avec le même type-key', async () => {
    const file1 = new File(['content1'], 'logo1.png', { type: 'image/png' });
    const file2 = new File(['content2'], 'logo2.png', { type: 'image/png' });

    await useLogoStore.getState().addLogo('team', 'CAN', 'Canada v1', file1);
    await useLogoStore.getState().addLogo('team', 'CAN', 'Canada v2', file2);

    const { logos } = useLogoStore.getState();
    expect(logos).toHaveLength(1);
    expect(logos[0]!.name).toBe('Canada v2');
  });

  it('removeLogo supprime un logo', async () => {
    const file = new File(['content'], 'logo.png', { type: 'image/png' });
    await useLogoStore.getState().addLogo('competition', 'iihf', 'IIHF', file);
    expect(useLogoStore.getState().logos).toHaveLength(1);

    await useLogoStore.getState().removeLogo('competition-iihf');
    expect(useLogoStore.getState().logos).toHaveLength(0);
  });

  it('getLogo retourne le dataUrl d\'un logo existant', async () => {
    const file = new File(['content'], 'logo.png', { type: 'image/png' });
    await useLogoStore.getState().addLogo('sponsor', 'nike', 'Nike', file);

    const url = useLogoStore.getState().getLogo('sponsor', 'nike');
    expect(url).toContain('data:image/webp;base64,logo_');
  });

  it('getLogo retourne une chaîne vide si le logo n\'existe pas', () => {
    const url = useLogoStore.getState().getLogo('team', 'XXX');
    expect(url).toBe('');
  });

  it('getLogosByType filtre par type', async () => {
    const file = new File(['content'], 'logo.png', { type: 'image/png' });
    await useLogoStore.getState().addLogo('team', 'CAN', 'Canada', file);
    await useLogoStore.getState().addLogo('competition', 'iihf', 'IIHF', file);
    await useLogoStore.getState().addLogo('team', 'USA', 'USA', file);

    const teamLogos = useLogoStore.getState().getLogosByType('team');
    expect(teamLogos).toHaveLength(2);

    const compLogos = useLogoStore.getState().getLogosByType('competition');
    expect(compLogos).toHaveLength(1);
  });

  it('fetchLogos met loading à true puis false', async () => {
    const promise = useLogoStore.getState().fetchLogos();
    expect(useLogoStore.getState().loading).toBe(true);
    await promise;
    expect(useLogoStore.getState().loading).toBe(false);
  });
});

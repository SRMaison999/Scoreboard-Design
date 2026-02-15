import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePlayerPhotos } from '@/hooks/usePlayerPhotos';
import { usePhotoStore } from '@/stores/photoStore';
import { db } from '@/api/db';

describe('usePlayerPhotos', () => {
  beforeEach(async () => {
    await db.playerPhotos.clear();
    usePhotoStore.setState({ photos: [], loading: false });
  });

  it('retourne une map vide quand il n y a pas de photos', async () => {
    const { result } = renderHook(() => usePlayerPhotos());
    await waitFor(() => {
      expect(result.current).toEqual({});
    });
  });

  it('retourne une map id -> dataUrl après chargement', async () => {
    await db.playerPhotos.add({
      id: 'CAN-11',
      team: 'CAN',
      number: '11',
      playerName: 'Player',
      dataUrl: 'data:image/webp;base64,abc',
      created: new Date().toISOString(),
    });

    const { result } = renderHook(() => usePlayerPhotos());
    await waitFor(() => {
      expect(result.current).toEqual({
        'CAN-11': 'data:image/webp;base64,abc',
      });
    });
  });

  it('retourne plusieurs photos', async () => {
    await db.playerPhotos.bulkAdd([
      {
        id: 'CAN-11',
        team: 'CAN',
        number: '11',
        playerName: 'A',
        dataUrl: 'data:a',
        created: new Date().toISOString(),
      },
      {
        id: 'FIN-16',
        team: 'FIN',
        number: '16',
        playerName: 'B',
        dataUrl: 'data:b',
        created: new Date().toISOString(),
      },
    ]);

    const { result } = renderHook(() => usePlayerPhotos());
    await waitFor(() => {
      expect(Object.keys(result.current)).toHaveLength(2);
      expect(result.current['CAN-11']).toBe('data:a');
      expect(result.current['FIN-16']).toBe('data:b');
    });
  });
});

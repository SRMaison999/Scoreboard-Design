import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useLogos } from '@/hooks/useLogos';
import { useLogoStore } from '@/stores/logoStore';
import { db } from '@/api/db';

describe('useLogos', () => {
  beforeEach(async () => {
    await db.logos.clear();
    useLogoStore.setState({ logos: [], loading: false });
  });

  it('retourne une map vide quand il n\'y a pas de logos', async () => {
    const { result } = renderHook(() => useLogos());
    await waitFor(() => {
      expect(result.current).toEqual({});
    });
  });

  it('retourne une map id -> dataUrl après chargement', async () => {
    await db.logos.add({
      id: 'team-CAN',
      logoType: 'team',
      key: 'CAN',
      name: 'Canada',
      dataUrl: 'data:image/webp;base64,abc',
      created: new Date().toISOString(),
    });

    const { result } = renderHook(() => useLogos());
    await waitFor(() => {
      expect(result.current).toEqual({
        'team-CAN': 'data:image/webp;base64,abc',
      });
    });
  });

  it('retourne plusieurs logos de types différents', async () => {
    await db.logos.bulkAdd([
      {
        id: 'team-CAN',
        logoType: 'team',
        key: 'CAN',
        name: 'Canada',
        dataUrl: 'data:team',
        created: new Date().toISOString(),
      },
      {
        id: 'competition-iihf',
        logoType: 'competition',
        key: 'iihf',
        name: 'IIHF',
        dataUrl: 'data:comp',
        created: new Date().toISOString(),
      },
      {
        id: 'sponsor-nike',
        logoType: 'sponsor',
        key: 'nike',
        name: 'Nike',
        dataUrl: 'data:sponsor',
        created: new Date().toISOString(),
      },
    ]);

    const { result } = renderHook(() => useLogos());
    await waitFor(() => {
      expect(Object.keys(result.current)).toHaveLength(3);
      expect(result.current['team-CAN']).toBe('data:team');
      expect(result.current['competition-iihf']).toBe('data:comp');
      expect(result.current['sponsor-nike']).toBe('data:sponsor');
    });
  });
});

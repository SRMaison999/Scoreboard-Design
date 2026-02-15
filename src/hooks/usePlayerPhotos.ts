import { useEffect, useMemo } from 'react';
import { usePhotoStore } from '@/stores/photoStore';

/**
 * Retourne une map id -> dataUrl des photos de joueurs.
 * Charge automatiquement les photos depuis IndexedDB au montage.
 */
export function usePlayerPhotos(): Record<string, string> {
  const photos = usePhotoStore((s) => s.photos);
  const fetchPhotos = usePhotoStore((s) => s.fetchPhotos);

  useEffect(() => {
    void fetchPhotos();
  }, [fetchPhotos]);

  return useMemo(() => {
    const map: Record<string, string> = {};
    for (const p of photos) {
      map[p.id] = p.dataUrl;
    }
    return map;
  }, [photos]);
}

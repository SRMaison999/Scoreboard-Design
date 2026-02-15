import { useEffect, useMemo } from 'react';
import { useLogoStore } from '@/stores/logoStore';

/**
 * Retourne une map id -> dataUrl de tous les logos.
 * Charge automatiquement les logos depuis IndexedDB au montage.
 */
export function useLogos(): Record<string, string> {
  const logos = useLogoStore((s) => s.logos);
  const fetchLogos = useLogoStore((s) => s.fetchLogos);

  useEffect(() => {
    void fetchLogos();
  }, [fetchLogos]);

  return useMemo(() => {
    const map: Record<string, string> = {};
    for (const l of logos) {
      map[l.id] = l.dataUrl;
    }
    return map;
  }, [logos]);
}

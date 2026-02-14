import { useState, useEffect, type RefObject } from 'react';

const DEFAULT_W = 1920;
const DEFAULT_H = 1080;

/**
 * Hook qui calcule le facteur de scale pour le canvas scoreboard.
 * Utilise ResizeObserver pour s'adapter au conteneur.
 */
export function useScaling(
  containerRef: RefObject<HTMLDivElement | null>,
  canvasW: number = DEFAULT_W,
  canvasH: number = DEFAULT_H,
): number {
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setScale(Math.min(width / canvasW, height / canvasH));
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef, canvasW, canvasH]);

  return scale;
}

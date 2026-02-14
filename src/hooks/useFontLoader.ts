import { useEffect } from 'react';
import { FONT_LINK } from '@/constants/fonts';

/**
 * Hook qui charge les polices Google Fonts au montage.
 * Ajoute et retire le tag link dans le head.
 */
export function useFontLoader(): void {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = FONT_LINK;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
}

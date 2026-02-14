import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFontLoader } from '@/hooks/useFontLoader';
import { FONT_LINK } from '@/constants/fonts';

describe('useFontLoader', () => {
  it('ajoute un tag link Google Fonts au head', () => {
    const { unmount } = renderHook(() => useFontLoader());

    const links = document.querySelectorAll('link[rel="stylesheet"]');
    const fontLink = Array.from(links).find(
      (l) => (l as HTMLLinkElement).href === FONT_LINK,
    );
    expect(fontLink).toBeTruthy();

    unmount();
  });

  it('retire le tag link au demontage', () => {
    const { unmount } = renderHook(() => useFontLoader());
    unmount();

    const links = document.querySelectorAll('link[rel="stylesheet"]');
    const fontLink = Array.from(links).find(
      (l) => (l as HTMLLinkElement).href === FONT_LINK,
    );
    expect(fontLink).toBeFalsy();
  });
});

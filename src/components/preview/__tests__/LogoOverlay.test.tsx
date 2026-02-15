import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LogoOverlay } from '@/components/preview/LogoOverlay';
import type { LogoPosition } from '@/types/logo';

describe('LogoOverlay', () => {
  it('ne rend rien si dataUrl est vide', () => {
    const { container } = render(
      <LogoOverlay dataUrl="" position="top-right" size={80} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('affiche une image quand dataUrl est fourni', () => {
    const { container } = render(
      <LogoOverlay dataUrl="data:image/webp;base64,abc" position="top-right" size={80} />,
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'data:image/webp;base64,abc');
  });

  it('applique la taille maximale via style', () => {
    const { container } = render(
      <LogoOverlay dataUrl="data:image/webp;base64,abc" position="top-left" size={120} />,
    );
    const img = container.querySelector('img') as HTMLElement;
    expect(img.style.maxWidth).toBe('120px');
    expect(img.style.maxHeight).toBe('120px');
  });

  it('applique le positionnement correct pour chaque position', () => {
    const positions: LogoPosition[] = [
      'top-left', 'top-right', 'top-center',
      'bottom-left', 'bottom-right', 'bottom-center',
    ];

    for (const pos of positions) {
      const { container, unmount } = render(
        <LogoOverlay dataUrl="data:image/webp;base64,test" position={pos} size={60} />,
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.position).toBe('absolute');
      expect(wrapper.style.zIndex).toBe('10');
      unmount();
    }
  });

  it('positionne en haut à droite correctement', () => {
    const { container } = render(
      <LogoOverlay dataUrl="data:image/webp;base64,test" position="top-right" size={80} />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.top).toBe('12px');
    expect(wrapper.style.right).toBe('12px');
  });

  it('positionne en bas au centre correctement', () => {
    const { container } = render(
      <LogoOverlay dataUrl="data:image/webp;base64,test" position="bottom-center" size={80} />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.bottom).toBe('12px');
    expect(wrapper.style.left).toBe('50%');
  });
});

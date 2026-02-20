import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SmartGuideOverlay } from '../SmartGuideOverlay';
import type { GuideLine } from '@/hooks/useSmartGuides';

describe('SmartGuideOverlay', () => {
  it('ne rend rien quand aucun guide', () => {
    const { container } = render(<SmartGuideOverlay guides={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('rend un guide vertical', () => {
    const guides: GuideLine[] = [
      { orientation: 'vertical', position: 200, start: 0, end: 500 },
    ];
    render(<SmartGuideOverlay guides={guides} />);
    const overlay = screen.getByTestId('smart-guide-overlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay.children).toHaveLength(1);
  });

  it('rend un guide horizontal', () => {
    const guides: GuideLine[] = [
      { orientation: 'horizontal', position: 300, start: 0, end: 800 },
    ];
    render(<SmartGuideOverlay guides={guides} />);
    const overlay = screen.getByTestId('smart-guide-overlay');
    expect(overlay.children).toHaveLength(1);
  });

  it('rend plusieurs guides', () => {
    const guides: GuideLine[] = [
      { orientation: 'vertical', position: 200, start: 0, end: 500 },
      { orientation: 'horizontal', position: 300, start: 0, end: 800 },
      { orientation: 'vertical', position: 400, start: 100, end: 600 },
    ];
    render(<SmartGuideOverlay guides={guides} />);
    const overlay = screen.getByTestId('smart-guide-overlay');
    expect(overlay.children).toHaveLength(3);
  });
});

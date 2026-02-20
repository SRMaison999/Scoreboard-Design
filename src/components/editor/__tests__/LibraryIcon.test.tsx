import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LibraryIcon } from '../LibraryIcon';

describe('LibraryIcon', () => {
  it('rend une ic\u00f4ne connue en SVG', () => {
    const { container } = render(<LibraryIcon name="hash" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('rend un fallback pour un nom inconnu', () => {
    const { container } = render(<LibraryIcon name="unknown-icon" />);
    expect(container.querySelector('svg')).toBeFalsy();
    expect(container.textContent).toBe('+');
  });

  it('rend l\'ic\u00f4ne clock', () => {
    const { container } = render(<LibraryIcon name="clock" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });
});

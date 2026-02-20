import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CursorCoordinates } from '../CursorCoordinates';

describe('CursorCoordinates', () => {
  it('affiche les coordonn\u00e9es quand visible', () => {
    render(<CursorCoordinates x={100} y={200} visible />);
    const el = screen.getByTestId('cursor-coordinates');
    expect(el).toBeInTheDocument();
    expect(el.textContent).toContain('100');
    expect(el.textContent).toContain('200');
    expect(el.textContent).toContain('px');
  });

  it('ne rend rien quand non visible', () => {
    render(<CursorCoordinates x={0} y={0} visible={false} />);
    expect(screen.queryByTestId('cursor-coordinates')).not.toBeInTheDocument();
  });
});

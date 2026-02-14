import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ColorPicker } from '@/components/ui/ColorPicker';

describe('ColorPicker', () => {
  it('affiche le label et la valeur hex', () => {
    render(<ColorPicker label="Fond" value="#ff0000" onChange={() => {}} />);
    expect(screen.getByText('Fond')).toBeInTheDocument();
    const inputs = screen.getAllByDisplayValue('#ff0000');
    expect(inputs.length).toBe(2);
  });

  it('affiche le slider opacite quand onOpacityChange est fourni', () => {
    const onOpacity = vi.fn();
    render(
      <ColorPicker
        label="Fond"
        value="#ff0000"
        onChange={() => {}}
        opacity={50}
        onOpacityChange={onOpacity}
      />,
    );
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('ne montre pas le slider sans onOpacityChange', () => {
    render(<ColorPicker label="Fond" value="#ff0000" onChange={() => {}} />);
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });
});

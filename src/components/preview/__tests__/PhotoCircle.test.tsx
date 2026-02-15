import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PhotoCircle } from '@/components/preview/PhotoCircle';

const baseProps = {
  photo: '',
  fallbackText: '99',
  size: 120,
  fontSize: 48,
  color: '#ffffff',
  fontFamily: 'sans-serif',
};

describe('PhotoCircle', () => {
  it('affiche le texte de fallback quand pas de photo', () => {
    render(<PhotoCircle {...baseProps} />);
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('affiche l\'image quand une photo est fournie', () => {
    const { container } = render(<PhotoCircle {...baseProps} photo="data:image/png;base64,abc" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'data:image/png;base64,abc');
  });

  it('n\'affiche pas le texte de fallback quand une photo est fournie', () => {
    render(<PhotoCircle {...baseProps} photo="data:image/png;base64,abc" />);
    expect(screen.queryByText('99')).not.toBeInTheDocument();
  });

  it('applique la taille correcte au cercle', () => {
    const { container } = render(<PhotoCircle {...baseProps} />);
    const circle = container.firstElementChild as HTMLElement;
    expect(circle.style.width).toBe('120px');
    expect(circle.style.height).toBe('120px');
  });

  it('applique le style arrondi', () => {
    const { container } = render(<PhotoCircle {...baseProps} />);
    const circle = container.firstElementChild as HTMLElement;
    expect(circle.style.borderRadius).toBe('50%');
  });

  it('affiche le fallback avec la bonne police et couleur', () => {
    render(<PhotoCircle {...baseProps} />);
    const span = screen.getByText('99');
    expect(span.style.fontFamily).toBe('sans-serif');
    expect(span.style.color).toBe('rgb(255, 255, 255)');
    expect(span.style.fontSize).toBe('48px');
  });
});

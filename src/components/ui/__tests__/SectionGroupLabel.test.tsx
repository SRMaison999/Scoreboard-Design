import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionGroupLabel } from '@/components/ui/SectionGroupLabel';

describe('SectionGroupLabel', () => {
  it('affiche le label fourni', () => {
    render(<SectionGroupLabel label="Contenu" />);
    expect(screen.getByText('Contenu')).toBeInTheDocument();
  });

  it('utilise les classes de style attendues', () => {
    render(<SectionGroupLabel label="Apparence" />);
    const element = screen.getByText('Apparence');
    expect(element).toHaveClass('text-[10px]', 'uppercase', 'border-t', 'border-gray-700');
  });
});

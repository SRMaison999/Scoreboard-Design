import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Section } from '@/components/ui/Section';

describe('Section', () => {
  it('affiche le titre et le contenu quand ouvert par defaut', () => {
    render(
      <Section title="Test"><p>Contenu</p></Section>,
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Contenu')).toBeInTheDocument();
  });

  it('masque le contenu quand defaultOpen=false', () => {
    render(
      <Section title="Test" defaultOpen={false}><p>Contenu</p></Section>,
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.queryByText('Contenu')).not.toBeInTheDocument();
  });

  it('bascule le contenu au clic', async () => {
    const user = userEvent.setup();
    render(
      <Section title="Test"><p>Contenu</p></Section>,
    );
    expect(screen.getByText('Contenu')).toBeInTheDocument();
    await user.click(screen.getByRole('button'));
    expect(screen.queryByText('Contenu')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Contenu')).toBeInTheDocument();
  });
});

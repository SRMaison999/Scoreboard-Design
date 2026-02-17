import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconRail } from '@/components/ui/IconRail';
import { FileText, Palette, Clock } from 'lucide-react';
import type { IconRailItem } from '@/types/editor';

const ITEMS: readonly IconRailItem[] = [
  { id: 'content', icon: FileText, label: 'Contenu' },
  { id: 'appearance', icon: Palette, label: 'Apparence' },
  { id: 'clock', icon: Clock, label: 'Horloge' },
];

describe('IconRail', () => {
  it('affiche tous les boutons de navigation', () => {
    render(<IconRail items={ITEMS} activeId="content" onSelect={() => {}} />);
    expect(screen.getByLabelText('Contenu')).toBeInTheDocument();
    expect(screen.getByLabelText('Apparence')).toBeInTheDocument();
    expect(screen.getByLabelText('Horloge')).toBeInTheDocument();
  });

  it('marque l\u2019onglet actif avec aria-current', () => {
    render(<IconRail items={ITEMS} activeId="appearance" onSelect={() => {}} />);
    expect(screen.getByLabelText('Apparence')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByLabelText('Contenu')).not.toHaveAttribute('aria-current');
  });

  it('appelle onSelect au clic', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<IconRail items={ITEMS} activeId="content" onSelect={onSelect} />);

    await user.click(screen.getByLabelText('Horloge'));
    expect(onSelect).toHaveBeenCalledWith('clock');
  });

  it('affiche le tooltip au survol', async () => {
    const user = userEvent.setup();
    render(<IconRail items={ITEMS} activeId="content" onSelect={() => {}} />);

    await user.hover(screen.getByLabelText('Apparence'));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Apparence');
  });
});

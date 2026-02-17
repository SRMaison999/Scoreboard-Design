import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubTabs } from '@/components/ui/SubTabs';
import type { SubTabItem } from '@/types/editor';

const TABS: readonly SubTabItem[] = [
  { id: 'style', label: 'Style' },
  { id: 'fonts', label: 'Polices' },
  { id: 'colors', label: 'Couleurs' },
];

describe('SubTabs', () => {
  it('affiche tous les onglets', () => {
    render(<SubTabs tabs={TABS} activeId="style" onSelect={() => {}} />);
    expect(screen.getByRole('tab', { name: 'Style' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Polices' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Couleurs' })).toBeInTheDocument();
  });

  it('marque l\u2019onglet actif avec aria-selected', () => {
    render(<SubTabs tabs={TABS} activeId="fonts" onSelect={() => {}} />);
    expect(screen.getByRole('tab', { name: 'Polices' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Style' })).toHaveAttribute('aria-selected', 'false');
  });

  it('appelle onSelect au clic', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<SubTabs tabs={TABS} activeId="style" onSelect={onSelect} />);

    await user.click(screen.getByRole('tab', { name: 'Couleurs' }));
    expect(onSelect).toHaveBeenCalledWith('colors');
  });

  it('ne rend rien si un seul onglet', () => {
    const { container } = render(
      <SubTabs tabs={[{ id: 'only', label: 'Seul' }]} activeId="only" onSelect={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('affiche le tablist', () => {
    render(<SubTabs tabs={TABS} activeId="style" onSelect={() => {}} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpectatorsSection } from '@/components/editor/SpectatorsSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('SpectatorsSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section', () => {
    render(<SpectatorsSection />);
    expect(screen.getByText('Spectateurs')).toBeInTheDocument();
  });

  it('affiche le champ nombre de spectateurs', () => {
    render(<SpectatorsSection />);
    expect(screen.getByDisplayValue('8 247')).toBeInTheDocument();
  });

  it('affiche les checkboxes lieu et capacit\u00e9', () => {
    render(<SpectatorsSection />);
    expect(screen.getByText('Afficher le lieu')).toBeInTheDocument();
    expect(screen.getByText(/Afficher la capacit\u00e9/)).toBeInTheDocument();
  });

  it('bascule la visibilit\u00e9 du lieu', async () => {
    const user = userEvent.setup();
    render(<SpectatorsSection />);
    expect(useScoreboardStore.getState().spectatorsData.showVenue).toBe(true);
    const venueCheckbox = screen.getByText('Afficher le lieu').closest('label')?.querySelector('input');
    if (venueCheckbox) {
      await user.click(venueCheckbox);
    }
    expect(useScoreboardStore.getState().spectatorsData.showVenue).toBe(false);
  });

  it('modifie le nombre de spectateurs', async () => {
    const user = userEvent.setup();
    render(<SpectatorsSection />);
    const countInput = screen.getByDisplayValue('8 247');
    await user.clear(countInput);
    await user.type(countInput, '10 500');
    expect(useScoreboardStore.getState().spectatorsData.count).toBe('10 500');
  });
});

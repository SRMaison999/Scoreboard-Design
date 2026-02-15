import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FontSizeSection } from '@/components/editor/FontSizeSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('FontSizeSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  async function openSection() {
    const user = userEvent.setup();
    const title = screen.getByText(/Tailles de police/);
    await user.click(title);
  }

  it('affiche le titre de section', () => {
    render(<FontSizeSection />);
    expect(screen.getByText(/Tailles de police/)).toBeInTheDocument();
  });

  it('affiche les groupes de tailles', async () => {
    render(<FontSizeSection />);
    await openSection();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getAllByText('Horloge').length).toBeGreaterThanOrEqual(1);
  });

  it('affiche les sliders avec les valeurs par défaut', async () => {
    render(<FontSizeSection />);
    await openSection();
    expect(screen.getAllByText('80px').length).toBeGreaterThanOrEqual(1);
  });

  it('affiche Auto pour les tailles à zéro', async () => {
    render(<FontSizeSection />);
    await openSection();
    expect(screen.getAllByText('Auto').length).toBe(2);
  });

  it('met à jour une taille de police via slider', async () => {
    render(<FontSizeSection />);
    await openSection();
    const sliders = screen.getAllByRole('slider');
    const teamNameSlider = sliders[0]!;
    fireEvent.change(teamNameSlider, { target: { value: '60' } });
    expect(useScoreboardStore.getState().fontSizes.teamName).toBe(60);
  });
});

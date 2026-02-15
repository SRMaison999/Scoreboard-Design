import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FreeTextSection } from '@/components/editor/FreeTextSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('FreeTextSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section avec le compte', () => {
    render(<FreeTextSection />);
    expect(screen.getByText(/Texte libre/)).toBeInTheDocument();
    expect(screen.getByText(/3\/10/)).toBeInTheDocument();
  });

  it('affiche les lignes existantes', () => {
    render(<FreeTextSection />);
    expect(screen.getByDisplayValue('BIENVENUE')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2026')).toBeInTheDocument();
  });

  it('ajoute une ligne', async () => {
    const user = userEvent.setup();
    render(<FreeTextSection />);
    const addBtn = screen.getByText(/Ajouter une ligne/);
    await user.click(addBtn);
    expect(useScoreboardStore.getState().freeTextData.lines).toHaveLength(4);
  });

  it('supprime une ligne', async () => {
    const user = userEvent.setup();
    render(<FreeTextSection />);
    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]!);
    expect(useScoreboardStore.getState().freeTextData.lines).toHaveLength(2);
  });

  it('affiche les sélecteurs alignement', () => {
    render(<FreeTextSection />);
    expect(screen.getAllByText('Centre').length).toBeGreaterThanOrEqual(1);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TemplateSizeSection } from '@/components/editor/TemplateSizeSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('TemplateSizeSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de section', () => {
    render(<TemplateSizeSection />);
    expect(screen.getByText(/Dimensions du template/)).toBeInTheDocument();
  });

  it('affiche les dimensions par défaut', () => {
    render(<TemplateSizeSection />);
    expect(screen.getByDisplayValue('1920')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1080')).toBeInTheDocument();
  });

  it('affiche le sélecteur de preset', () => {
    render(<TemplateSizeSection />);
    expect(screen.getByDisplayValue('Full HD (1920x1080)')).toBeInTheDocument();
  });

  it('change les dimensions quand on sélectionne un preset', async () => {
    const user = userEvent.setup();
    render(<TemplateSizeSection />);
    const select = screen.getByDisplayValue('Full HD (1920x1080)');
    await user.selectOptions(select, 'HD 720p (1280x720)');
    expect(useScoreboardStore.getState().templateWidth).toBe(1280);
    expect(useScoreboardStore.getState().templateHeight).toBe(720);
  });

  it('met à jour la largeur manuellement', () => {
    render(<TemplateSizeSection />);
    const input = screen.getByDisplayValue('1920');
    fireEvent.change(input, { target: { value: '2560' } });
    expect(useScoreboardStore.getState().templateWidth).toBe(2560);
  });
});

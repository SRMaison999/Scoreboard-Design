import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AnimationSection } from '../AnimationSection';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';

function renderAndOpen() {
  render(<AnimationSection />);
  /* La section est fermée par défaut, on clique sur le titre pour l'ouvrir */
  const title = screen.getByText(EDITOR_LABELS.sectionAnimations);
  fireEvent.click(title);
}

describe('AnimationSection', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de la section', () => {
    render(<AnimationSection />);
    expect(screen.getByText(EDITOR_LABELS.sectionAnimations)).toBeInTheDocument();
  });

  it('affiche le bouton masquer quand le scoreboard est visible', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.animHideScoreboard)).toBeInTheDocument();
  });

  it('bascule la visibilite du scoreboard', () => {
    renderAndOpen();
    const btn = screen.getByText(EDITOR_LABELS.animHideScoreboard);
    fireEvent.click(btn);
    expect(useScoreboardStore.getState().scoreboardVisible).toBe(false);
  });

  it('affiche le selecteur d animation d entree', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.animEntryAnimation)).toBeInTheDocument();
  });

  it('affiche le selecteur d animation de sortie', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.animExitAnimation)).toBeInTheDocument();
  });

  it('affiche la checkbox du score pop', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.animScorePop)).toBeInTheDocument();
  });

  it('affiche la checkbox du penalty flash', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.animPenaltyFlash)).toBeInTheDocument();
  });

  it('affiche la checkbox du clock pulse', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.animClockPulse)).toBeInTheDocument();
  });

  it('desactive le score pop via la checkbox', () => {
    renderAndOpen();
    const checkboxes = screen.getAllByRole('checkbox');
    const scorePopCheckbox = checkboxes[0]!;
    fireEvent.click(scorePopCheckbox);
    expect(useScoreboardStore.getState().animationConfig.scorePopEnabled).toBe(false);
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModesPanel } from '../ModesPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { BODY_TYPES } from '@/constants/bodyTypes';
import { EDITOR_LABELS } from '@/constants/labels';

describe('ModesPanel', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de la section', () => {
    render(<ModesPanel />);
    expect(screen.getByText(EDITOR_LABELS.sectionModes)).toBeInTheDocument();
  });

  it('affiche un bouton pour chaque body type', () => {
    render(<ModesPanel />);
    for (const bt of BODY_TYPES) {
      expect(screen.getByTestId(`mode-btn-${bt.id}`)).toBeInTheDocument();
    }
  });

  it('le Layout libre est le premier bouton affiché', () => {
    render(<ModesPanel />);
    const firstButton = screen.getByTestId(`mode-btn-${BODY_TYPES[0].id}`);
    expect(firstButton).toHaveTextContent(BODY_TYPES[0].label);
    expect(BODY_TYPES[0].id).toBe(14);
  });

  it('change le bodyType au clic sur un bouton', () => {
    render(<ModesPanel />);
    fireEvent.click(screen.getByTestId('mode-btn-4'));
    expect(useScoreboardStore.getState().bodyType).toBe(4);
  });

  it('met en surbrillance le bouton du mode actif', () => {
    useScoreboardStore.getState().update('bodyType', 6);
    render(<ModesPanel />);
    const activeBtn = screen.getByTestId('mode-btn-6');
    expect(activeBtn.className).toContain('bg-sky-950');
  });
});

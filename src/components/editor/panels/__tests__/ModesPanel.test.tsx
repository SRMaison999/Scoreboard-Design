import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModesPanel } from '../ModesPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { BODY_TYPES, BODY_TYPE_CATEGORY_LABELS } from '@/constants/bodyTypes';
import { EDITOR_LABELS } from '@/constants/labels';

describe('ModesPanel', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de la section', () => {
    render(<ModesPanel />);
    expect(screen.getByText(EDITOR_LABELS.sectionModes)).toBeInTheDocument();
  });

  it('affiche les titres de cat\u00e9gories', () => {
    render(<ModesPanel />);
    expect(screen.getByText(BODY_TYPE_CATEGORY_LABELS.custom)).toBeInTheDocument();
    expect(screen.getByText(BODY_TYPE_CATEGORY_LABELS.stats)).toBeInTheDocument();
    expect(screen.getByText(BODY_TYPE_CATEGORY_LABELS.match)).toBeInTheDocument();
    expect(screen.getByText(BODY_TYPE_CATEGORY_LABELS.info)).toBeInTheDocument();
  });

  it('affiche un bouton pour chaque body type avec sa description', () => {
    render(<ModesPanel />);
    for (const bt of BODY_TYPES) {
      const btn = screen.getByTestId(`mode-btn-${bt.id}`);
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveTextContent(bt.label);
      expect(btn).toHaveTextContent(bt.description);
    }
  });

  it('le Layout libre est le premier body type d\u00e9fini', () => {
    expect(BODY_TYPES.length).toBeGreaterThan(0);
    expect(BODY_TYPES[0]!.id).toBe(14);
    expect(BODY_TYPES[0]!.label).toBe('Layout libre');
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

  it('les boutons inactifs ont le style par d\u00e9faut', () => {
    useScoreboardStore.getState().update('bodyType', 1);
    render(<ModesPanel />);
    const inactiveBtn = screen.getByTestId('mode-btn-6');
    expect(inactiveBtn.className).toContain('bg-gray-900');
    expect(inactiveBtn.className).not.toContain('bg-sky-950');
  });
});

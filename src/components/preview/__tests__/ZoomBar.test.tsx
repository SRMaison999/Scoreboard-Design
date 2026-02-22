/**
 * Tests pour le composant ZoomBar.
 * Barre de contrôle du zoom en mode Layout libre.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ZoomBar } from '@/components/preview/ZoomBar';
import { useCanvasViewStore } from '@/stores/canvasViewStore';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

describe('ZoomBar', () => {
  beforeEach(() => {
    useCanvasViewStore.setState({ zoom: 1, panX: 0, panY: 0, baseScale: 1 });
    useScoreboardStore.getState().resetState();
  });

  it('affiche le pourcentage effectif (zoom * baseScale * 100)', () => {
    render(<ZoomBar />);
    const percentage = screen.getByTestId('zoom-percentage');
    expect(percentage).toHaveTextContent('100');
  });

  it('affiche le pourcentage effectif quand baseScale = 0.5', () => {
    useCanvasViewStore.setState({ zoom: 1, baseScale: 0.5 });
    render(<ZoomBar />);
    const percentage = screen.getByTestId('zoom-percentage');
    expect(percentage).toHaveTextContent('50');
  });

  it('affiche 100% quand zoom compense le baseScale', () => {
    useCanvasViewStore.setState({ zoom: 2, baseScale: 0.5 });
    render(<ZoomBar />);
    const percentage = screen.getByTestId('zoom-percentage');
    expect(percentage).toHaveTextContent('100');
  });

  it('affiche le pourcentage de zoom arrondi', () => {
    useCanvasViewStore.setState({ zoom: 0.333, baseScale: 1 });
    render(<ZoomBar />);
    const percentage = screen.getByTestId('zoom-percentage');
    expect(percentage).toHaveTextContent('33');
  });

  it('le bouton zoom avant appelle zoomIn', () => {
    render(<ZoomBar />);
    const btn = screen.getByTitle(CUSTOM_FIELD_LABELS.zoomIn);
    fireEvent.click(btn);
    const zoom = useCanvasViewStore.getState().zoom;
    expect(zoom).toBeCloseTo(1.2, 5);
  });

  it('le bouton zoom arrière appelle zoomOut', () => {
    render(<ZoomBar />);
    const btn = screen.getByTitle(CUSTOM_FIELD_LABELS.zoomOut);
    fireEvent.click(btn);
    const zoom = useCanvasViewStore.getState().zoom;
    expect(zoom).toBeCloseTo(1 / 1.2, 5);
  });

  it('le bouton ajuster à l\'écran réinitialise le zoom et le pan', () => {
    useCanvasViewStore.setState({ zoom: 2, panX: 100, panY: -50, baseScale: 0.5 });
    render(<ZoomBar />);
    const btn = screen.getByTitle(/Ajuster.*cran \(Ctrl\+0\)/);
    fireEvent.click(btn);
    const state = useCanvasViewStore.getState();
    expect(state.zoom).toBe(1);
    expect(state.panX).toBe(0);
    expect(state.panY).toBe(0);
  });

  it('le bouton 100% calcule le zoom réel basé sur baseScale', () => {
    useCanvasViewStore.setState({ zoom: 1, panX: -200, panY: 300, baseScale: 0.5 });
    render(<ZoomBar />);
    const btn = screen.getByTitle(/Zoom 100.*% \(Ctrl\+1\)/);
    fireEvent.click(btn);
    const state = useCanvasViewStore.getState();
    expect(state.zoom).toBe(2);
    expect(state.panX).toBe(0);
    expect(state.panY).toBe(0);
  });

  it('contient le data-testid zoom-bar', () => {
    render(<ZoomBar />);
    expect(screen.getByTestId('zoom-bar')).toBeInTheDocument();
  });

  it('les boutons contiennent des icônes Lucide (sans layout libre)', () => {
    const { container } = render(<ZoomBar />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(4);
  });

  it('affiche les boutons undo/redo en mode layout libre', () => {
    useScoreboardStore.getState().update('bodyType', 14);
    render(<ZoomBar />);
    expect(screen.getByTitle(/Annuler/)).toBeInTheDocument();
    expect(screen.getByTitle(/Rétablir/)).toBeInTheDocument();
  });

  it('les boutons undo/redo sont désactivés sans historique', () => {
    useScoreboardStore.getState().update('bodyType', 14);
    render(<ZoomBar />);
    const undoBtn = screen.getByTitle(/Annuler/);
    const redoBtn = screen.getByTitle(/Rétablir/);
    expect(undoBtn).toBeDisabled();
    expect(redoBtn).toBeDisabled();
  });

  it('ne montre pas les boutons undo/redo hors layout libre', () => {
    useScoreboardStore.getState().update('bodyType', 1);
    render(<ZoomBar />);
    expect(screen.queryByTitle(/Annuler/)).not.toBeInTheDocument();
    expect(screen.queryByTitle(/Rétablir/)).not.toBeInTheDocument();
  });
});

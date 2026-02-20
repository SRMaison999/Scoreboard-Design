import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CanvasRulers } from '../CanvasRulers';

const DEFAULT_PROPS = {
  canvasWidth: 1920,
  canvasHeight: 1080,
  scale: 1,
  panX: 0,
  panY: 0,
} as const;

describe('CanvasRulers', () => {
  it('rend le conteneur principal', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('canvas-rulers')).toBeInTheDocument();
  });

  it('rend la regle horizontale', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('ruler-horizontal')).toBeInTheDocument();
  });

  it('rend la regle verticale', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('ruler-vertical')).toBeInTheDocument();
  });

  it('rend le carre de coin', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    expect(screen.getByTestId('ruler-corner')).toBeInTheDocument();
  });

  it('affiche les labels de graduation avec unite px pour la regle horizontale', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    const horizontal = screen.getByTestId('ruler-horizontal');
    /* A scale 1 (> 0.5), intervalle majeur = 50px */
    expect(horizontal.textContent).toContain('0px');
    expect(horizontal.textContent).toContain('50px');
    expect(horizontal.textContent).toContain('100px');
  });

  it('affiche les labels de graduation avec unite px pour la regle verticale', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    const vertical = screen.getByTestId('ruler-vertical');
    expect(vertical.textContent).toContain('0px');
    expect(vertical.textContent).toContain('50px');
    expect(vertical.textContent).toContain('100px');
  });

  it('utilise un intervalle de 50px quand le scale est superieur a 0.5', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} scale={0.8} />);
    const horizontal = screen.getByTestId('ruler-horizontal');
    expect(horizontal.textContent).toContain('50px');
    expect(horizontal.textContent).toContain('100px');
  });

  it('utilise un intervalle de 100px quand le scale est entre 0.25 et 0.5', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} scale={0.4} />);
    const horizontal = screen.getByTestId('ruler-horizontal');
    /* A scale 0.4, intervalle majeur = 100px, donc pas de label a 50 */
    expect(horizontal.textContent).toContain('0px');
    expect(horizontal.textContent).toContain('100px');
    expect(horizontal.textContent).not.toContain('50px');
  });

  it('utilise un intervalle de 200px quand le scale est inferieur ou egal a 0.25', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} scale={0.2} />);
    const horizontal = screen.getByTestId('ruler-horizontal');
    expect(horizontal.textContent).toContain('0px');
    expect(horizontal.textContent).toContain('200px');
    expect(horizontal.textContent).not.toContain('100px');
    expect(horizontal.textContent).not.toContain('50px');
  });

  it('le conteneur principal est non interactif (pointer-events-none)', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    const rulers = screen.getByTestId('canvas-rulers');
    expect(rulers.className).toContain('pointer-events-none');
  });

  it('les regles ont un fond bg-gray-900', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    const horizontal = screen.getByTestId('ruler-horizontal');
    const vertical = screen.getByTestId('ruler-vertical');
    expect(horizontal.className).toContain('bg-gray-900');
    expect(vertical.className).toContain('bg-gray-900');
  });

  it('le carre de coin a un fond bg-gray-900', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    const corner = screen.getByTestId('ruler-corner');
    expect(corner.className).toContain('bg-gray-900');
  });

  it('gere correctement un canvas de petite taille', () => {
    render(<CanvasRulers canvasWidth={100} canvasHeight={100} scale={1} panX={0} panY={0} />);
    const horizontal = screen.getByTestId('ruler-horizontal');
    expect(horizontal.textContent).toContain('0px');
    expect(horizontal.textContent).toContain('50px');
    expect(horizontal.textContent).toContain('100px');
  });

  it('gere un decalage de pan non nul', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} panX={-100} panY={-50} />);
    const horizontal = screen.getByTestId('ruler-horizontal');
    const vertical = screen.getByTestId('ruler-vertical');
    /* Les labels doivent toujours etre presents meme avec un pan */
    expect(horizontal.textContent).toContain('0px');
    expect(vertical.textContent).toContain('0px');
  });

  it('la regle horizontale commence apres le carre de coin', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    const horizontal = screen.getByTestId('ruler-horizontal');
    expect(horizontal.style.left).toBe('20px');
  });

  it('la regle verticale commence apres le carre de coin', () => {
    render(<CanvasRulers {...DEFAULT_PROPS} />);
    const vertical = screen.getByTestId('ruler-vertical');
    expect(vertical.style.top).toBe('20px');
  });
});

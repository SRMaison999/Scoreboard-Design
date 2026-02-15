import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OperatorPanel } from '@/components/operator/OperatorPanel';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('OperatorPanel', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre du mode opérateur', () => {
    render(<OperatorPanel />);
    expect(screen.getByText(/Mode opérateur/)).toBeInTheDocument();
  });

  it('affiche les contrôles de score', () => {
    render(<OperatorPanel />);
    expect(screen.getByTestId('score1-plus')).toBeInTheDocument();
    expect(screen.getByTestId('score2-plus')).toBeInTheDocument();
  });

  it('affiche les contrôles de timer', () => {
    render(<OperatorPanel />);
    expect(screen.getByTestId('clock-start')).toBeInTheDocument();
    expect(screen.getByTestId('clock-reset')).toBeInTheDocument();
  });

  it('affiche les raccourcis clavier', () => {
    render(<OperatorPanel />);
    expect(screen.getByText(/Raccourcis/)).toBeInTheDocument();
  });

  it('affiche la prévisualisation du scoreboard', () => {
    render(<OperatorPanel />);
    expect(screen.getByTestId('scoreboard-canvas')).toBeInTheDocument();
  });
});

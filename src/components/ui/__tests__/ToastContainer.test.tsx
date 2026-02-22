import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastContainer } from '../ToastContainer';
import { useToastStore } from '@/stores/toastStore';

describe('ToastContainer', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it('ne rend rien sans toasts', () => {
    const { container } = render(<ToastContainer />);
    expect(container.innerHTML).toBe('');
  });

  it('affiche un toast quand il est ajouté', () => {
    useToastStore.setState({
      toasts: [{ id: 't1', message: 'Test réussi', variant: 'success' }],
    });
    render(<ToastContainer />);
    expect(screen.getByText('Test réussi')).toBeInTheDocument();
  });

  it('affiche plusieurs toasts empilés', () => {
    useToastStore.setState({
      toasts: [
        { id: 't1', message: 'Premier', variant: 'success' },
        { id: 't2', message: 'Second', variant: 'error' },
      ],
    });
    render(<ToastContainer />);
    expect(screen.getByText('Premier')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('ferme un toast avec le bouton X', () => {
    useToastStore.setState({
      toasts: [{ id: 't1', message: 'Fermer', variant: 'info' }],
    });
    render(<ToastContainer />);
    const items = screen.getAllByTestId('toast-item');
    const closeBtn = items[0]!.querySelector('button');
    fireEvent.click(closeBtn!);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('contient le data-testid toast-container', () => {
    useToastStore.setState({
      toasts: [{ id: 't1', message: 'Test', variant: 'success' }],
    });
    render(<ToastContainer />);
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });
});

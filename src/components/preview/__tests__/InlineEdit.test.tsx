import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InlineEdit } from '../InlineEdit';

describe('InlineEdit', () => {
  const style = { fontSize: 40, color: '#fff' };

  it('affiche la valeur en mode lecture', () => {
    render(<InlineEdit value="SUI" onCommit={vi.fn()} style={style} testId="test" />);
    expect(screen.getByTestId('test')).toHaveTextContent('SUI');
  });

  it('passe en mode \u00e9dition au double-clic', async () => {
    const user = userEvent.setup();
    render(<InlineEdit value="SUI" onCommit={vi.fn()} style={style} testId="test" />);

    await user.dblClick(screen.getByTestId('test'));
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
    expect(screen.getByTestId('test-input')).toHaveValue('SUI');
  });

  it('valide avec Enter et appelle onCommit', async () => {
    const onCommit = vi.fn();
    const user = userEvent.setup();
    render(<InlineEdit value="SUI" onCommit={onCommit} style={style} testId="test" />);

    await user.dblClick(screen.getByTestId('test'));
    const input = screen.getByTestId('test-input');
    await user.clear(input);
    await user.type(input, 'CAN{Enter}');
    expect(onCommit).toHaveBeenCalledWith('CAN');
  });

  it('annule avec Escape sans appeler onCommit', async () => {
    const onCommit = vi.fn();
    const user = userEvent.setup();
    render(<InlineEdit value="SUI" onCommit={onCommit} style={style} testId="test" />);

    await user.dblClick(screen.getByTestId('test'));
    const input = screen.getByTestId('test-input');
    await user.clear(input);
    await user.type(input, 'CAN{Escape}');
    expect(onCommit).not.toHaveBeenCalled();
    expect(screen.getByTestId('test')).toHaveTextContent('SUI');
  });

  it('valide au blur', () => {
    const onCommit = vi.fn();
    render(<InlineEdit value="SUI" onCommit={onCommit} style={style} testId="test" />);

    fireEvent.doubleClick(screen.getByTestId('test'));
    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'FIN' } });
    fireEvent.blur(input);
    expect(onCommit).toHaveBeenCalledWith('FIN');
  });

  it('ne notifie pas si la valeur n\u2019a pas chang\u00e9', () => {
    const onCommit = vi.fn();
    render(<InlineEdit value="SUI" onCommit={onCommit} style={style} testId="test" />);

    fireEvent.doubleClick(screen.getByTestId('test'));
    fireEvent.blur(screen.getByTestId('test-input'));
    expect(onCommit).not.toHaveBeenCalled();
  });
});

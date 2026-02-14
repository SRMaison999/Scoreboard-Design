import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputField } from '@/components/ui/InputField';

describe('InputField', () => {
  it('affiche le label et la valeur', () => {
    render(<InputField label="Score" value="3" onChange={() => {}} />);
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  });

  it('appelle onChange quand on tape', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputField label="Score" value="" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'A');
    expect(onChange).toHaveBeenCalledWith('A');
  });
});

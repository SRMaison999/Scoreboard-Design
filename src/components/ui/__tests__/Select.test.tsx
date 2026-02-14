import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '@/components/ui/Select';

describe('Select', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ];

  it('affiche le label et les options', () => {
    render(<Select label="Choix" options={options} value="a" onChange={() => {}} />);
    expect(screen.getByText('Choix')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('appelle onChange au changement', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} value="a" onChange={onChange} />);
    await user.selectOptions(screen.getByRole('combobox'), 'b');
    expect(onChange).toHaveBeenCalledWith('b');
  });
});

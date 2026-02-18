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

  it('affiche les options dans des optgroup quand groups est fourni', () => {
    const groups = [
      { label: 'Groupe 1', options: [{ value: 'x', label: 'Option X' }] },
      { label: 'Groupe 2', options: [{ value: 'y', label: 'Option Y' }] },
    ];
    render(<Select options={[]} groups={groups} value="x" onChange={() => {}} />);
    const optgroups = document.querySelectorAll('optgroup');
    expect(optgroups).toHaveLength(2);
    expect(optgroups[0]).toHaveAttribute('label', 'Groupe 1');
    expect(optgroups[1]).toHaveAttribute('label', 'Groupe 2');
    expect(screen.getByText('Option X')).toBeInTheDocument();
    expect(screen.getByText('Option Y')).toBeInTheDocument();
  });

  it('utilise options plates quand groups est absent', () => {
    render(<Select options={options} value="a" onChange={() => {}} />);
    const optgroups = document.querySelectorAll('optgroup');
    expect(optgroups).toHaveLength(0);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });
});

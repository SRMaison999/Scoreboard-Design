import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '@/components/ui/Tooltip';

describe('Tooltip', () => {
  it('affiche le contenu enfant', () => {
    render(
      <Tooltip text="Info">
        <button type="button">Bouton</button>
      </Tooltip>,
    );
    expect(screen.getByText('Bouton')).toBeInTheDocument();
  });

  it('n\u2019affiche pas le tooltip par d\u00e9faut', () => {
    render(
      <Tooltip text="Info">
        <button type="button">Bouton</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('affiche le tooltip au survol', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip text="Info bulle">
        <button type="button">Bouton</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText('Bouton'));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Info bulle');
  });

  it('masque le tooltip quand la souris quitte', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip text="Info bulle">
        <button type="button">Bouton</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText('Bouton'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await user.unhover(screen.getByText('Bouton'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

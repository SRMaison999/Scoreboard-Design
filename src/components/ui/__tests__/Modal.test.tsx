import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';

describe('Modal', () => {
  it('ne rend rien quand open=false', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <p>Contenu</p>
      </Modal>,
    );
    expect(screen.queryByText('Contenu')).not.toBeInTheDocument();
  });

  it('rend le contenu quand open=true', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <ModalHeader>Titre</ModalHeader>
        <ModalBody>Corps</ModalBody>
        <ModalFooter>Pied</ModalFooter>
      </Modal>,
    );
    expect(screen.getByText('Titre')).toBeInTheDocument();
    expect(screen.getByText('Corps')).toBeInTheDocument();
    expect(screen.getByText('Pied')).toBeInTheDocument();
  });

  it('appelle onClose sur Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <p>Contenu</p>
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });
});

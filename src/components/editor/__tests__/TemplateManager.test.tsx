import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TemplateManager } from '@/components/editor/TemplateManager';
import { useTemplateStore } from '@/stores/templateStore';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { db } from '@/api/db';
import { DEFAULT_STATE } from '@/data/defaultState';

describe('TemplateManager', () => {
  beforeEach(async () => {
    await db.templates.clear();
    useTemplateStore.setState({ templates: [], loading: false });
    useScoreboardStore.getState().resetState();
  });

  it('affiche les boutons de gestion des templates', () => {
    render(<TemplateManager />);
    expect(screen.getByText('Sauvegarder')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
    expect(screen.getByText('Importer')).toBeInTheDocument();
  });

  it('ouvre la modale de sauvegarde et sauvegarde un template', async () => {
    const user = userEvent.setup();
    render(<TemplateManager />);

    await user.click(screen.getByText('Sauvegarder'));
    expect(screen.getByText('Sauvegarder le template')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Nom du template');
    await user.type(input, 'Mon template');
    await user.click(screen.getAllByText('Sauvegarder').find((el) => el.closest('[role="dialog"]'))!);

    await waitFor(() => {
      const { templates } = useTemplateStore.getState();
      expect(templates).toHaveLength(1);
      expect(templates[0]!.name).toBe('Mon template');
    });
  });

  it('ouvre la modale de liste avec les templates prédéfinis', async () => {
    const user = userEvent.setup();
    render(<TemplateManager />);

    await user.click(screen.getByText('Templates'));
    expect(screen.getByText('Templates prédéfinis')).toBeInTheDocument();
    expect(screen.getByText('Jeux Olympiques')).toBeInTheDocument();
    expect(screen.getByText('Minimal')).toBeInTheDocument();
  });

  it('charge un template prédéfini', async () => {
    const user = userEvent.setup();
    render(<TemplateManager />);

    await user.click(screen.getByText('Templates'));
    await user.click(screen.getByText('Jeux Olympiques'));
    expect(useScoreboardStore.getState().team1).toBe('CAN');
  });

  it('charge un template sauvegardé', async () => {
    const store = useTemplateStore.getState();
    const modified = { ...structuredClone(DEFAULT_STATE), team1: 'RUS', team2: 'USA' };
    await store.saveTemplate('Custom', modified);

    const user = userEvent.setup();
    render(<TemplateManager />);

    await user.click(screen.getByText('Templates'));
    await user.click(screen.getByText('Custom'));
    expect(useScoreboardStore.getState().team1).toBe('RUS');
  });

  it('affiche le message vide quand aucun template sauvegardé', async () => {
    const user = userEvent.setup();
    render(<TemplateManager />);

    await user.click(screen.getByText('Templates'));
    expect(screen.getByText(/Aucun template sauvegardé/)).toBeInTheDocument();
  });
});

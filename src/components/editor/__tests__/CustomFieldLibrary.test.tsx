import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomFieldLibrary } from '../CustomFieldLibrary';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS, LIBRARY_ELEMENTS, LIBRARY_CATEGORY_LABELS } from '@/constants/customFields';

describe('CustomFieldLibrary', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('rend le titre de la bibliothèque', () => {
    render(<CustomFieldLibrary />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.libraryTitle)).toBeInTheDocument();
  });

  it('affiche le champ de recherche', () => {
    render(<CustomFieldLibrary />);
    expect(screen.getByPlaceholderText(CUSTOM_FIELD_LABELS.librarySearch)).toBeInTheDocument();
  });

  it('affiche les catégories', () => {
    render(<CustomFieldLibrary />);
    for (const label of Object.values(LIBRARY_CATEGORY_LABELS)) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('affiche les éléments de la bibliothèque', () => {
    render(<CustomFieldLibrary />);
    const firstElement = LIBRARY_ELEMENTS[0];
    if (firstElement) {
      expect(screen.getByText(firstElement.label)).toBeInTheDocument();
    }
  });

  it('filtre les éléments par recherche', async () => {
    const user = userEvent.setup();
    render(<CustomFieldLibrary />);

    const searchInput = screen.getByPlaceholderText(CUSTOM_FIELD_LABELS.librarySearch);
    await user.type(searchInput, 'Score');

    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.queryByText('Séparateur')).not.toBeInTheDocument();
  });

  it('affiche un message quand la recherche ne retourne rien', async () => {
    const user = userEvent.setup();
    render(<CustomFieldLibrary />);

    const searchInput = screen.getByPlaceholderText(CUSTOM_FIELD_LABELS.librarySearch);
    await user.type(searchInput, 'zzzzzzz');

    expect(screen.getByText(CUSTOM_FIELD_LABELS.libraryEmpty)).toBeInTheDocument();
  });

  it('ajoute un champ au clic sur un élément', async () => {
    const user = userEvent.setup();
    render(<CustomFieldLibrary />);

    const firstElement = LIBRARY_ELEMENTS[0];
    if (firstElement) {
      const button = screen.getByText(firstElement.label);
      await user.click(button);

      expect(useScoreboardStore.getState().customFieldsData.fields.length).toBe(1);
    }
  });
});

/**
 * Hook pour la gestion de l'edition inline des blocs de texte.
 * Gere l'etat d'edition (quel champ est en cours d'edition)
 * et la sauvegarde du contenu via le store.
 */

import { useCallback, useState } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { FieldElementConfig, TextBlockConfig } from '@/types/customField';

interface InlineEditState {
  /** ID du champ en cours d'edition, ou null si aucun */
  readonly editingFieldId: string | null;
  /** Contenu original avant edition (pour annulation via Escape) */
  readonly originalContent: string;
}

interface UseInlineEditReturn {
  /** ID du champ en cours d'edition */
  readonly editingFieldId: string | null;
  /** Contenu original (pour annulation) */
  readonly originalContent: string;
  /** Demarre l'edition d'un champ text-block */
  readonly startEditing: (fieldId: string) => void;
  /** Sauvegarde le contenu et quitte le mode edition */
  readonly commitEdit: (newContent: string) => void;
  /** Annule l'edition et restaure le contenu original */
  readonly cancelEdit: () => void;
}

export function useInlineEdit(): UseInlineEditReturn {
  const [editState, setEditState] = useState<InlineEditState>({
    editingFieldId: null,
    originalContent: '',
  });

  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);

  const startEditing = useCallback(
    (fieldId: string) => {
      const field = fields.find((f) => f.id === fieldId);
      if (!field) return;
      if (field.element.type !== 'text-block') return;

      const config = field.element.config as TextBlockConfig;
      setEditState({
        editingFieldId: fieldId,
        originalContent: config.content,
      });
    },
    [fields],
  );

  const commitEdit = useCallback(
    (newContent: string) => {
      const fieldId = editState.editingFieldId;
      if (!fieldId) return;

      const field = fields.find((f) => f.id === fieldId);
      if (!field || field.element.type !== 'text-block') {
        setEditState({ editingFieldId: null, originalContent: '' });
        return;
      }

      const currentConfig = field.element.config as TextBlockConfig;
      const updatedElement: FieldElementConfig = {
        type: 'text-block',
        config: { ...currentConfig, content: newContent },
      };

      updateElement(fieldId, updatedElement);
      setEditState({ editingFieldId: null, originalContent: '' });
    },
    [editState.editingFieldId, fields, updateElement],
  );

  const cancelEdit = useCallback(() => {
    setEditState({ editingFieldId: null, originalContent: '' });
  }, []);

  return {
    editingFieldId: editState.editingFieldId,
    originalContent: editState.originalContent,
    startEditing,
    commitEdit,
    cancelEdit,
  };
}

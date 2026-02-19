/**
 * Hook pour manipuler la taille de police d'un champ sélectionné.
 * Gère les boutons +/- de la barre flottante et Ctrl+molette sur le canvas.
 */

import { useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { updateFieldElementConfig } from '@/utils/fieldConfig';
import type { FieldElementConfig } from '@/types/customField';

const FONT_STEP = 1;
const FONT_STEP_SHIFT = 4;
const FONT_MIN = 8;
const FONT_MAX = 300;

type FontSizeInfo = {
  readonly value: number;
  readonly isGlobal: boolean;
};

/** Types d'éléments qui supportent fontSizeOverride */
const OVERRIDE_TYPES = new Set([
  'score-display', 'clock-display', 'period-display', 'team-name',
]);

/** Vérifie si un type d'élément supporte le contrôle de taille de police */
export function hasEditableFontSize(type: string): boolean {
  return type === 'text-block' || OVERRIDE_TYPES.has(type);
}

/** Résout la taille de police actuelle d'un élément */
function resolveFontSize(element: FieldElementConfig, state: {
  readonly fontSizes: { readonly score: number; readonly clockTime: number; readonly teamName: number };
}): FontSizeInfo {
  if (element.type === 'text-block') {
    return { value: element.config.fontSize, isGlobal: false };
  }

  if (OVERRIDE_TYPES.has(element.type)) {
    const config = element.config as { fontSizeOverride?: number };
    const override = config.fontSizeOverride ?? 0;
    if (override > 0) {
      return { value: override, isGlobal: false };
    }
    /* Retourne la valeur globale selon le type */
    switch (element.type) {
      case 'score-display':
        return { value: state.fontSizes.score, isGlobal: true };
      case 'clock-display':
      case 'period-display':
        return { value: state.fontSizes.clockTime, isGlobal: true };
      case 'team-name':
        return { value: state.fontSizes.teamName, isGlobal: true };
      default:
        return { value: 24, isGlobal: true };
    }
  }

  return { value: 0, isGlobal: true };
}

export function useFieldFontSize() {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const selectedFieldId = useScoreboardStore(
    (s) => s.customFieldsData.selectedFieldId,
  );
  const selectedField = useScoreboardStore(
    (s) => s.customFieldsData.fields.find(
      (f) => f.id === s.customFieldsData.selectedFieldId,
    ),
  );
  const fontSizes = useScoreboardStore((s) => s.fontSizes);

  const fontInfo = selectedField
    ? resolveFontSize(selectedField.element, { fontSizes })
    : null;

  const adjustFontSize = useCallback((delta: number) => {
    if (!selectedField || !selectedFieldId) return;
    const element = selectedField.element;

    if (element.type === 'text-block') {
      const newSize = Math.max(FONT_MIN, Math.min(FONT_MAX, element.config.fontSize + delta));
      updateFieldElementConfig(updateElement, selectedFieldId, element, { fontSize: newSize });
      return;
    }

    if (OVERRIDE_TYPES.has(element.type)) {
      const config = element.config as { fontSizeOverride?: number };
      const current = config.fontSizeOverride ?? 0;
      const baseValue = current > 0 ? current : resolveFontSize(element, { fontSizes }).value;
      const newSize = Math.max(FONT_MIN, Math.min(FONT_MAX, baseValue + delta));
      updateFieldElementConfig(updateElement, selectedFieldId, element, { fontSizeOverride: newSize });
    }
  }, [selectedField, selectedFieldId, updateElement, fontSizes]);

  const increase = useCallback((shift?: boolean) => {
    adjustFontSize(shift ? FONT_STEP_SHIFT : FONT_STEP);
  }, [adjustFontSize]);

  const decrease = useCallback((shift?: boolean) => {
    adjustFontSize(shift ? -FONT_STEP_SHIFT : -FONT_STEP);
  }, [adjustFontSize]);

  const hasFontControl = selectedField
    ? hasEditableFontSize(selectedField.element.type)
    : false;

  return {
    fontInfo,
    hasFontControl,
    increase,
    decrease,
    adjustFontSize,
  };
}

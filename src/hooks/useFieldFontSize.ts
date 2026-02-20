/**
 * Hook pour manipuler la taille de police d'un champ sélectionné.
 * Gère les boutons +/- (avec répétition), la saisie directe et la molette.
 */

import { useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { updateFieldElementConfig } from '@/utils/fieldConfig';
import type { FieldElementConfig } from '@/types/customField';

const FONT_STEP = 1;
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

function clampFontSize(value: number): number {
  return Math.max(FONT_MIN, Math.min(FONT_MAX, value));
}

/** Facteur d'échelle du contenu lorsque scaleContent est actif */
function getContentScale(field: { scaleContent: boolean; initialHeight: number; height: number }): number {
  if (!field.scaleContent || field.initialHeight <= 0) return 1;
  return field.height / field.initialHeight;
}

export function useFieldFontSize() {
  const updateElement = useScoreboardStore((s) => s.updateCustomFieldElement);
  const selectedFieldId = useScoreboardStore(
    (s) => {
      const ids = s.customFieldsData?.selectedFieldIds;
      return ids?.length === 1 ? ids[0] ?? null : null;
    },
  );
  const selectedField = useScoreboardStore(
    (s) => {
      const ids = s.customFieldsData?.selectedFieldIds;
      if (!ids || ids.length !== 1) return undefined;
      return s.customFieldsData.fields.find((f) => f.id === ids[0]);
    },
  );
  const fontSizes = useScoreboardStore((s) => s.fontSizes);

  const contentScale = selectedField ? getContentScale(selectedField) : 1;

  /* fontInfo affiche la taille visuelle (raw × contentScale) */
  const fontInfo = selectedField
    ? (() => {
        const raw = resolveFontSize(selectedField.element, { fontSizes });
        return { value: raw.value * contentScale, isGlobal: raw.isGlobal };
      })()
    : null;

  /** Ajuste la taille de police d'un delta (+/-) en espace brut */
  const adjustFontSize = useCallback((delta: number) => {
    if (!selectedField || !selectedFieldId) return;
    const element = selectedField.element;

    if (element.type === 'text-block') {
      const newSize = clampFontSize(element.config.fontSize + delta);
      updateFieldElementConfig(updateElement, selectedFieldId, element, { fontSize: newSize });
      return;
    }

    if (OVERRIDE_TYPES.has(element.type)) {
      const config = element.config as { fontSizeOverride?: number };
      const current = config.fontSizeOverride ?? 0;
      const baseValue = current > 0 ? current : resolveFontSize(element, { fontSizes }).value;
      const newSize = clampFontSize(baseValue + delta);
      updateFieldElementConfig(updateElement, selectedFieldId, element, { fontSizeOverride: newSize });
    }
  }, [selectedField, selectedFieldId, updateElement, fontSizes]);

  /** Définit une taille de police exacte (saisie = taille visuelle) */
  const setFontSize = useCallback((visualSize: number) => {
    if (!selectedField || !selectedFieldId) return;
    const element = selectedField.element;
    const scale = getContentScale(selectedField);
    const rawSize = clampFontSize(Math.round(visualSize / scale));

    if (element.type === 'text-block') {
      updateFieldElementConfig(updateElement, selectedFieldId, element, { fontSize: rawSize });
      return;
    }

    if (OVERRIDE_TYPES.has(element.type)) {
      updateFieldElementConfig(updateElement, selectedFieldId, element, { fontSizeOverride: rawSize });
    }
  }, [selectedField, selectedFieldId, updateElement]);

  const increase = useCallback(() => {
    adjustFontSize(FONT_STEP);
  }, [adjustFontSize]);

  const decrease = useCallback(() => {
    adjustFontSize(-FONT_STEP);
  }, [adjustFontSize]);

  const hasFontControl = selectedField
    ? hasEditableFontSize(selectedField.element.type)
    : false;

  return {
    fontInfo,
    hasFontControl,
    increase,
    decrease,
    setFontSize,
    adjustFontSize,
  };
}

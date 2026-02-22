/**
 * Helper partage pour la configuration d'elements de champ personnalise.
 * Contient la logique de creation de config par defaut et la mise a jour.
 */

import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldElementConfig, LibraryElement, CustomField } from '@/types/customField';

export function updateFieldElementConfig(
  updateElement: (id: string, el: FieldElementConfig) => void,
  fieldId: string,
  element: FieldElementConfig,
  patch: Record<string, unknown>,
) {
  const newConfig = { ...element.config, ...patch };
  updateElement(fieldId, { ...element, config: newConfig } as FieldElementConfig);
}

/** Types d'elements qui dependent du cote (equipe 1 / equipe 2) */
export const SIDE_ELEMENT_TYPES = new Set([
  'score-display',
  'team-name',
  'flag-display',
  'penalty-column',
]);

/**
 * Cree la configuration par defaut pour un element de la bibliotheque.
 */
export function createDefaultFieldConfig(el: LibraryElement): FieldElementConfig {
  switch (el.type) {
    case 'text-block':
      return { type: 'text-block', config: { content: 'Texte', fontSize: 30, fontWeight: 600, fontFamily: '', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2, textColor: '#ffffff' } };
    case 'score-display':
      return { type: 'score-display', config: { side: 'left', showLabel: false, fontSizeOverride: 0 } };
    case 'clock-display':
      return { type: 'clock-display', config: { showPeriod: true, showBox: false, fontSizeOverride: 0 } };
    case 'period-display':
      return { type: 'period-display', config: { fontSizeOverride: 0 } };
    case 'team-name':
      return { type: 'team-name', config: { side: 'left', showFlag: true, fontSizeOverride: 0 } };
    case 'flag-display':
      return { type: 'flag-display', config: { side: 'left' } };
    case 'timeout-display':
      return { type: 'timeout-display', config: {} };
    case 'shootout-display':
      return { type: 'shootout-display', config: {} };
    case 'stat-line':
      return { type: 'stat-line', config: { statIndex: 0 } };
    case 'bar-compare':
      return { type: 'bar-compare', config: { barIndex: 0 } };
    case 'player-photo':
      return { type: 'player-photo', config: { photoKey: '', shape: 'circle' } };
    case 'image-block':
      return { type: 'image-block', config: { src: '', objectFit: 'cover' } };
    case 'shape-block':
      return { type: 'shape-block', config: { shape: 'rectangle', fillColor: '#ffffff', fillOpacity: 80, borderColor: '', borderWidth: 0, borderRadius: 0 } };
    case 'separator-line':
      return { type: 'separator-line', config: { orientation: 'horizontal', thickness: 2, lineColor: '#ffffff', lineOpacity: 50 } };
    case 'header-block':
      return { type: 'header-block', config: { showClock: true } };
    case 'penalty-column':
      return { type: 'penalty-column', config: { side: 'left' } };
    default: {
      const bodyMatch = el.type.match(/^body-type-(\d+)$/);
      if (bodyMatch?.[1]) {
        const id = parseInt(bodyMatch[1], 10);
        return { type: el.type, config: { bodyTypeId: id } } as FieldElementConfig;
      }
      return { type: 'text-block', config: { content: 'Texte', fontSize: 30, fontWeight: 600, fontFamily: '', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2, textColor: '#ffffff' } };
    }
  }
}

interface PreparedFieldInfo {
  readonly config: FieldElementConfig;
  readonly label: string;
}

/**
 * Prepare la configuration et le label pour un element de la bibliotheque.
 * Detecte automatiquement le cote (gauche/droite) en fonction des champs existants.
 */
export function prepareFieldForAdd(
  el: LibraryElement,
  existingFields: readonly CustomField[],
): PreparedFieldInfo {
  const config = createDefaultFieldConfig(el);

  if (SIDE_ELEMENT_TYPES.has(el.type)) {
    const hasLeft = existingFields.some(
      (f) => f.element.type === el.type && (f.element.config as { side?: string }).side === 'left',
    );
    const side = hasLeft ? 'right' : 'left';
    (config as { config: { side: string } }).config.side = side;
  }

  const sideLabel = SIDE_ELEMENT_TYPES.has(el.type)
    ? ` (${(config as { config: { side: string } }).config.side === 'left' ? CUSTOM_FIELD_LABELS.configSideLeft : CUSTOM_FIELD_LABELS.configSideRight})`
    : '';

  return {
    config,
    label: `${el.label}${sideLabel}`,
  };
}

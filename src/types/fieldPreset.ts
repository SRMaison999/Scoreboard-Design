/**
 * Types pour les presets de champs personnalisés.
 * Permet de sauvegarder et charger des constructions réutilisables.
 */

import type { CustomField, CustomFieldsData } from './customField';

/** Portée du preset : un champ unique ou un écran complet */
export type PresetScope = 'field' | 'layout';

/**
 * Preset sauvegardé par l'utilisateur.
 * - scope 'field' : un seul champ (CustomField) sauvegardé,
 *   avec optionnellement des champs enfants contenus visuellement
 * - scope 'layout' : l'écran complet (tous les champs + options)
 */
export interface FieldPreset {
  readonly id: string;
  readonly name: string;
  readonly scope: PresetScope;
  readonly created: string;
  readonly modified: string;
  /** Champ unique (quand scope = 'field') */
  readonly field?: CustomField;
  /** Champs enfants contenus dans le champ parent (positions relatives) */
  readonly children?: readonly CustomField[];
  /** Layout complet (quand scope = 'layout') */
  readonly layout?: CustomFieldsData;
}

/** Format d'export JSON d'un preset */
export interface PresetFileFormat {
  readonly version: string;
  readonly name: string;
  readonly scope: PresetScope;
  readonly created: string;
  readonly modified: string;
  readonly field?: CustomField;
  readonly children?: readonly CustomField[];
  readonly layout?: CustomFieldsData;
}

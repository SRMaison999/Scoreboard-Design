import type { FontId } from '@/types/fonts';

/** Transformation de texte applicable aux éléments */
export type TextTransformValue = 'none' | 'uppercase' | 'lowercase';

/**
 * Surcharge de style par élément.
 * Chaque propriété est optionnelle : si absente, la valeur par défaut
 * du composant (hardcodée ou globale) est conservée.
 */
export interface ElementStyleOverride {
  /** Taille de police en pixels (remplace la valeur de base avant bodyScale) */
  fontSize?: number;
  /** Graisse de police (100-900) */
  fontWeight?: number;
  /** Police spécifique (remplace fontBody global) */
  fontFamily?: FontId;
  /** Espacement des lettres en pixels */
  letterSpacing?: number;
  /** Transformation du texte */
  textTransform?: TextTransformValue;
  /** Couleur hexadécimale (remplace la couleur du ColorMap global) */
  color?: string;
  /** Opacité 0-100 (0 = opaque, 100 = transparent), remplace l'opacité hardcodée */
  opacity?: number;
}

/** Rôles d'éléments pour le type 15 (Arbitres) */
export type RefereesStyleRole =
  | 'title'
  | 'name'
  | 'number'
  | 'noc'
  | 'role'
  | 'categoryTitle';

/** Rôles d'éléments pour le type 16 (Spectateurs) */
export type SpectatorsStyleRole =
  | 'title'
  | 'count'
  | 'label'
  | 'venue'
  | 'capacity';

/** Map de surcharges de style, indexée par rôle d'élément */
export type StyleOverrideMap<R extends string> = Partial<Record<R, ElementStyleOverride>>;

/** Surcharges de style du type 15 */
export type RefereesStyleOverrides = StyleOverrideMap<RefereesStyleRole>;

/** Surcharges de style du type 16 */
export type SpectatorsStyleOverrides = StyleOverrideMap<SpectatorsStyleRole>;

/** Valeurs par défaut d'un ElementStyleOverride (tout undefined = aucune surcharge) */
export const EMPTY_STYLE_OVERRIDE: ElementStyleOverride = {};

/** Plages et pas pour les contrôles de l'éditeur */
export const STYLE_OVERRIDE_RANGES = {
  fontSize: { min: 8, max: 120, step: 1 },
  fontWeight: { options: [400, 500, 600, 700, 800, 900] },
  letterSpacing: { min: 0, max: 20, step: 0.5 },
  opacity: { min: 0, max: 100, step: 1 },
} as const;

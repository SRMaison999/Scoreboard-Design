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

/** Rôles d'éléments pour le type 2 (Stats G/D) */
export type StatsStyleRole = 'title' | 'statValue' | 'statLabel';

/** Rôles d'éléments pour le type 3 (Stats Joueur) */
export type PlayerStatsStyleRole = 'title' | 'statLabel' | 'playerName' | 'value';

/** Rôles d'éléments pour le type 4 (But) */
export type GoalStyleRole = 'goalText' | 'teamName' | 'scorerName' | 'assist' | 'assistSecondary' | 'timePeriod';

/** Rôles d'éléments pour le type 5 (Fiche Joueur) */
export type PlayerCardStyleRole = 'title' | 'subtitle' | 'playerName' | 'teamName' | 'statValue' | 'statLabel';

/** Rôles d'éléments pour le type 6 (Classement) */
export type StandingsStyleRole = 'title' | 'header' | 'rank' | 'teamName' | 'cellValue';

/** Rôles d'éléments pour le type 7 (Score Final) */
export type FinalScoreStyleRole = 'title' | 'teamName' | 'score' | 'periodScores' | 'overtimeNote' | 'gwg';

/** Rôles d'éléments pour le type 8 (Texte Libre) */
export type FreeTextStyleRole = 'line';

/** Rôles d'éléments pour le type 9 (Face-à-face) */
export type HeadToHeadStyleRole = 'title' | 'playerName' | 'playerInfo' | 'statValue' | 'statLabel';

/** Rôles d'éléments pour le type 10 (Chronologie) */
export type TimelineStyleRole = 'title' | 'time' | 'team' | 'description' | 'period' | 'symbol';

/** Rôles d'éléments pour le type 11 (Barres comparatives) */
export type BarChartStyleRole = 'title' | 'teamName' | 'rowLabel' | 'rowValue';

/** Rôles d'éléments pour le type 12 (Composition) */
export type RosterStyleRole = 'title' | 'coach' | 'playerNumber' | 'playerName' | 'position';

/** Rôles d'éléments pour le type 13 (Calendrier) */
export type ScheduleStyleRole = 'title' | 'date' | 'time' | 'teamName' | 'score' | 'status' | 'venue';

/** Rôles d'éléments pour le type 15 (Arbitres) */
export type RefereesStyleRole = 'title' | 'name' | 'number' | 'noc' | 'role' | 'categoryTitle';

/** Rôles d'éléments pour le type 16 (Spectateurs) */
export type SpectatorsStyleRole = 'title' | 'count' | 'label' | 'venue' | 'capacity';

/** Map de surcharges de style, indexée par rôle d'élément */
export type StyleOverrideMap<R extends string> = Partial<Record<R, ElementStyleOverride>>;

/** Surcharges de style du type 2 */
export type StatsStyleOverrides = StyleOverrideMap<StatsStyleRole>;
/** Surcharges de style du type 3 */
export type PlayerStatsStyleOverrides = StyleOverrideMap<PlayerStatsStyleRole>;
/** Surcharges de style du type 4 */
export type GoalStyleOverrides = StyleOverrideMap<GoalStyleRole>;
/** Surcharges de style du type 5 */
export type PlayerCardStyleOverrides = StyleOverrideMap<PlayerCardStyleRole>;
/** Surcharges de style du type 6 */
export type StandingsStyleOverrides = StyleOverrideMap<StandingsStyleRole>;
/** Surcharges de style du type 7 */
export type FinalScoreStyleOverrides = StyleOverrideMap<FinalScoreStyleRole>;
/** Surcharges de style du type 8 */
export type FreeTextStyleOverrides = StyleOverrideMap<FreeTextStyleRole>;
/** Surcharges de style du type 9 */
export type HeadToHeadStyleOverrides = StyleOverrideMap<HeadToHeadStyleRole>;
/** Surcharges de style du type 10 */
export type TimelineStyleOverrides = StyleOverrideMap<TimelineStyleRole>;
/** Surcharges de style du type 11 */
export type BarChartStyleOverrides = StyleOverrideMap<BarChartStyleRole>;
/** Surcharges de style du type 12 */
export type RosterStyleOverrides = StyleOverrideMap<RosterStyleRole>;
/** Surcharges de style du type 13 */
export type ScheduleStyleOverrides = StyleOverrideMap<ScheduleStyleRole>;
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

/**
 * Configuration des tailles de police individuelles.
 * La valeur 0 signifie "automatique" (basé sur FONT_SIZES et le nombre de lignes).
 */
export interface FontSizeConfig {
  teamName: number;
  score: number;
  clockTime: number;
  period: number;
  title: number;
  statValue: number;
  statLabel: number;
  penaltyTime: number;
  penaltyNumber: number;
}

export type FontSizeKey = keyof FontSizeConfig;

export interface FontSizeRange {
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly defaultVal: number;
}

export const FONT_SIZE_RANGES: Readonly<Record<FontSizeKey, FontSizeRange>> = {
  teamName:      { min: 24, max: 120, step: 2, defaultVal: 80 },
  score:         { min: 40, max: 120, step: 2, defaultVal: 80 },
  clockTime:     { min: 40, max: 120, step: 2, defaultVal: 80 },
  period:        { min: 12, max: 40, step: 1, defaultVal: 22 },
  title:         { min: 16, max: 60, step: 1, defaultVal: 30 },
  statValue:     { min: 0, max: 120, step: 2, defaultVal: 0 },
  statLabel:     { min: 0, max: 60, step: 1, defaultVal: 0 },
  penaltyTime:   { min: 30, max: 80, step: 2, defaultVal: 60 },
  penaltyNumber: { min: 30, max: 80, step: 2, defaultVal: 60 },
};

export const DEFAULT_FONT_SIZES: FontSizeConfig = {
  teamName: 80,
  score: 80,
  clockTime: 80,
  period: 22,
  title: 30,
  statValue: 0,
  statLabel: 0,
  penaltyTime: 60,
  penaltyNumber: 60,
};

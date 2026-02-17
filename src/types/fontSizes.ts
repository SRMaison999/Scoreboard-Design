/**
 * Configuration des tailles de police individuelles.
 * La valeur 0 signifie "automatique" (basé sur FONT_SIZES et le nombre de lignes).
 * Les clés bodyScale1..13 sont des pourcentages (100 = taille par défaut).
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
  bodyScale1: number;
  bodyScale2: number;
  bodyScale3: number;
  bodyScale4: number;
  bodyScale5: number;
  bodyScale6: number;
  bodyScale7: number;
  bodyScale8: number;
  bodyScale9: number;
  bodyScale10: number;
  bodyScale11: number;
  bodyScale12: number;
  bodyScale13: number;
}

export type FontSizeKey = keyof FontSizeConfig;

export interface FontSizeRange {
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly defaultVal: number;
  /** Unité affichée dans le slider (défaut : 'px'). */
  readonly unit?: string;
}

const BODY_SCALE_RANGE: FontSizeRange = { min: 50, max: 200, step: 5, defaultVal: 100, unit: '%' };

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
  bodyScale1:  BODY_SCALE_RANGE,
  bodyScale2:  BODY_SCALE_RANGE,
  bodyScale3:  BODY_SCALE_RANGE,
  bodyScale4:  BODY_SCALE_RANGE,
  bodyScale5:  BODY_SCALE_RANGE,
  bodyScale6:  BODY_SCALE_RANGE,
  bodyScale7:  BODY_SCALE_RANGE,
  bodyScale8:  BODY_SCALE_RANGE,
  bodyScale9:  BODY_SCALE_RANGE,
  bodyScale10: BODY_SCALE_RANGE,
  bodyScale11: BODY_SCALE_RANGE,
  bodyScale12: BODY_SCALE_RANGE,
  bodyScale13: BODY_SCALE_RANGE,
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
  bodyScale1: 100,
  bodyScale2: 100,
  bodyScale3: 100,
  bodyScale4: 100,
  bodyScale5: 100,
  bodyScale6: 100,
  bodyScale7: 100,
  bodyScale8: 100,
  bodyScale9: 100,
  bodyScale10: 100,
  bodyScale11: 100,
  bodyScale12: 100,
  bodyScale13: 100,
};

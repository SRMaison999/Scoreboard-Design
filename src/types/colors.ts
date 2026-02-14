export type ColorKey =
  | 'bgTop'
  | 'bgMid'
  | 'bgBot'
  | 'teamName'
  | 'score'
  | 'scoreBox'
  | 'time'
  | 'clockBox'
  | 'period'
  | 'titleText'
  | 'statVal'
  | 'statLabel'
  | 'penaltyTime'
  | 'penaltyNumber';

export type ColorMap = Record<ColorKey, string>;

export type OpacityMap = Record<ColorKey, number>;

export interface ColorPreset {
  readonly label: string;
  readonly colors: ColorMap;
}

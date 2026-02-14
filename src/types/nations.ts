export interface HockeyNation {
  readonly noc: string;
  readonly iso: string;
  readonly name: string;
}

export interface FlagCrossStyle {
  readonly color: string;
  readonly border?: string;
}

export interface FlagOverlay {
  readonly top: number | string;
  readonly left: number | string;
  readonly width: number | string;
  readonly height: number | string;
  readonly borderTop?: string;
  readonly borderBottom?: string;
  readonly borderLeft?: string;
  readonly background?: string;
}

export interface FlagStyle {
  readonly bg: string;
  readonly overlay?: FlagOverlay;
  readonly cross?: FlagCrossStyle;
}

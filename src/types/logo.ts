export type LogoType = 'team' | 'competition' | 'sponsor';

export type LogoPosition =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

export type LogoMode = 'flag' | 'logo' | 'both';

export interface LogoEntry {
  readonly id: string;
  readonly logoType: LogoType;
  readonly key: string;
  readonly name: string;
  readonly dataUrl: string;
  readonly created: string;
}

export const MAX_LOGO_DIMENSION = 300;

/**
 * Génère un ID unique pour un logo.
 * Format : "{type}-{key}" (ex: "team-CAN", "competition-olympics", "sponsor-nike")
 */
export function logoEntryId(logoType: LogoType, key: string): string {
  return `${logoType}-${key}`;
}

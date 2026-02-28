import type { RefereesStyleOverrides } from '@/types/elementStyleOverride';

/** Rôle d'un arbitre IIHF */
export type RefereeRole = 'referee' | 'linesman';

/** Preset d'affichage des arbitres */
export type RefereesPreset =
  | 'all'
  | 'one-by-one'
  | 'refs-vs-linesmen-columns'
  | 'refs-vs-linesmen-rows'
  | 'free';

/** Données d'un arbitre individuel */
export interface RefereeEntry {
  name: string;
  number: string;
  nationality: string;
  role: RefereeRole;
  showFlag: boolean;
  showNoc: boolean;
  showRole: boolean;
}

/** Données du body type Arbitres */
export interface RefereesData {
  title: string;
  preset: RefereesPreset;
  /** Index de l'arbitre affiché en mode "one-by-one" (0-based) */
  activeIndex: number;
  showFlags: boolean;
  showNocs: boolean;
  showRoles: boolean;
  referees: RefereeEntry[];
  /** Surcharges de style par rôle d'élément */
  styleOverrides: RefereesStyleOverrides;
}

export const DEFAULT_REFEREES_DATA: RefereesData = {
  title: 'REFEREES',
  preset: 'all',
  activeIndex: 0,
  showFlags: true,
  showNocs: true,
  showRoles: true,
  referees: [
    { name: 'ANSONS', number: '15', nationality: 'LAT', role: 'referee', showFlag: true, showNoc: true, showRole: true },
    { name: 'ROMASKO', number: '23', nationality: 'RUS', role: 'referee', showFlag: true, showNoc: true, showRole: true },
    { name: 'GOFMAN', number: '44', nationality: 'RUS', role: 'linesman', showFlag: true, showNoc: true, showRole: true },
    { name: 'ONDRACEK', number: '82', nationality: 'CZE', role: 'linesman', showFlag: true, showNoc: true, showRole: true },
  ],
  styleOverrides: {},
};

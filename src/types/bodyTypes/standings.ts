export interface StandingsColumn {
  id: string;
  label: string;
}

export interface StandingsRow {
  team: string;
  values: Record<string, string>;
  highlighted: boolean;
}

export interface StandingsData {
  title: string;
  columns: StandingsColumn[];
  rows: StandingsRow[];
}

const DEFAULT_COLUMNS: StandingsColumn[] = [
  { id: 'gp', label: 'PJ' },
  { id: 'w', label: 'V' },
  { id: 'l', label: 'D' },
  { id: 'otw', label: 'VP' },
  { id: 'otl', label: 'DP' },
  { id: 'gf', label: 'BP' },
  { id: 'ga', label: 'BC' },
  { id: 'pts', label: 'PTS' },
];

const DEFAULT_ROWS: StandingsRow[] = [
  { team: 'CAN', values: { gp: '3', w: '3', l: '0', otw: '0', otl: '0', gf: '12', ga: '3', pts: '9' }, highlighted: false },
  { team: 'USA', values: { gp: '3', w: '2', l: '0', otw: '1', otl: '0', gf: '8', ga: '5', pts: '7' }, highlighted: false },
  { team: 'SUI', values: { gp: '3', w: '0', l: '1', otw: '0', otl: '2', gf: '4', ga: '8', pts: '2' }, highlighted: false },
  { team: 'GER', values: { gp: '3', w: '0', l: '2', otw: '0', otl: '1', gf: '3', ga: '11', pts: '1' }, highlighted: false },
];

export const DEFAULT_STANDINGS_DATA: StandingsData = {
  title: 'GROUPE A - CLASSEMENT',
  columns: DEFAULT_COLUMNS,
  rows: DEFAULT_ROWS,
};

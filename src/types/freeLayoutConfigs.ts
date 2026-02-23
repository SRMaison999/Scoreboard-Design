/**
 * Interfaces de configuration pour les nouveaux elements atomiques
 * du mode Layout libre (Body Type 14).
 * Permet la composition libre de rosters, buts, staff et tableaux.
 */

/* --- Sous-types partages --- */

export interface PlayerListEntry {
  readonly name: string;
  readonly number: string;
  readonly position: string;
}

export interface StaffListEntry {
  readonly role: string;
  readonly name: string;
}

export interface DataTableColumn {
  readonly id: string;
  readonly label: string;
  readonly align: 'left' | 'center' | 'right';
}

export interface DataTableRow {
  readonly values: Record<string, string>;
  readonly highlighted: boolean;
}

/* --- Configs : Joueurs --- */

export interface PlayerRowConfig {
  readonly playerName: string;
  readonly playerNumber: string;
  readonly position: string;
  readonly showNumber: boolean;
  readonly showPosition: boolean;
  readonly fontSize: number;
  readonly textColor: string;
}

export interface PlayerListConfig {
  readonly title: string;
  readonly players: PlayerListEntry[];
  readonly showNumbers: boolean;
  readonly showPositions: boolean;
  readonly fontSize: number;
  readonly textColor: string;
  readonly titleColor: string;
}

/* --- Configs : But --- */

export interface GoalScorerConfig {
  readonly scorerName: string;
  readonly scorerNumber: string;
  readonly scorerPhoto: string;
  readonly showPhoto: boolean;
  readonly showNumber: boolean;
  readonly fontSize: number;
  readonly textColor: string;
}

export interface GoalAssistsConfig {
  readonly assist1Name: string;
  readonly assist1Number: string;
  readonly assist2Name: string;
  readonly assist2Number: string;
  readonly showNumbers: boolean;
  readonly fontSize: number;
  readonly textColor: string;
}

export interface GoalDetailsConfig {
  readonly goalTime: string;
  readonly goalPeriod: string;
  readonly goalCountMatch: string;
  readonly goalCountTournament: string;
  readonly showPeriod: boolean;
  readonly showCount: boolean;
  readonly fontSize: number;
  readonly textColor: string;
}

/* --- Configs : Equipe --- */

export interface StaffRowConfig {
  readonly role: string;
  readonly name: string;
  readonly fontSize: number;
  readonly textColor: string;
}

export interface StaffListConfig {
  readonly title: string;
  readonly members: StaffListEntry[];
  readonly fontSize: number;
  readonly textColor: string;
  readonly titleColor: string;
}

/* --- Config : Tableau de donnees --- */

export interface DataTableConfig {
  readonly title: string;
  readonly columns: DataTableColumn[];
  readonly rows: DataTableRow[];
  readonly showHeader: boolean;
  readonly fontSize: number;
  readonly headerColor: string;
  readonly textColor: string;
}

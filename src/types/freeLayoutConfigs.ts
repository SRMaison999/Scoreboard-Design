/**
 * Interfaces de configuration pour les nouveaux elements atomiques
 * du mode Layout libre (Body Type 1).
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

/* --- Configs : Evenement / Chronologie --- */

export type TimelineEventKind = 'goal' | 'penalty' | 'timeout' | 'period';

export interface TimelineEventEntry {
  readonly period: string;
  readonly time: string;
  readonly kind: TimelineEventKind;
  readonly description: string;
  readonly team: string;
}

export interface TimelineEventConfig {
  readonly period: string;
  readonly time: string;
  readonly kind: TimelineEventKind;
  readonly description: string;
  readonly team: string;
  readonly fontSize: number;
  readonly textColor: string;
}

export interface TimelineListConfig {
  readonly title: string;
  readonly events: TimelineEventEntry[];
  readonly fontSize: number;
  readonly textColor: string;
  readonly titleColor: string;
}

/* --- Configs : Calendrier / Schedule --- */

export type ScheduleMatchStatus = 'upcoming' | 'live' | 'finished';

export interface ScheduleMatchEntry {
  readonly date: string;
  readonly time: string;
  readonly teamLeft: string;
  readonly teamRight: string;
  readonly scoreLeft: string;
  readonly scoreRight: string;
  readonly status: ScheduleMatchStatus;
  readonly venue: string;
}

export interface ScheduleMatchConfig {
  readonly date: string;
  readonly time: string;
  readonly teamLeft: string;
  readonly teamRight: string;
  readonly scoreLeft: string;
  readonly scoreRight: string;
  readonly status: ScheduleMatchStatus;
  readonly venue: string;
  readonly fontSize: number;
  readonly textColor: string;
}

export interface ScheduleListConfig {
  readonly title: string;
  readonly matches: ScheduleMatchEntry[];
  readonly fontSize: number;
  readonly textColor: string;
  readonly titleColor: string;
}

/* --- Configs : Fiche joueur --- */

export interface PlayerCardStatEntry {
  readonly label: string;
  readonly value: string;
}

export interface PlayerCardConfig {
  readonly title: string;
  readonly subtitle: string;
  readonly playerName: string;
  readonly playerNumber: string;
  readonly playerTeam: string;
  readonly playerPhoto: string;
  readonly stats: PlayerCardStatEntry[];
  readonly fontSize: number;
  readonly textColor: string;
  readonly titleColor: string;
}

/* --- Config : Score par periode --- */

export interface PeriodScoreEntry {
  readonly period: string;
  readonly scoreLeft: string;
  readonly scoreRight: string;
}

export interface PeriodScoreRowConfig {
  readonly periods: PeriodScoreEntry[];
  readonly fontSize: number;
  readonly headerColor: string;
  readonly textColor: string;
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

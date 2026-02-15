export type TimelineEventType = 'goal' | 'penalty' | 'timeout' | 'period';

export interface TimelineEvent {
  period: string;
  time: string;
  type: TimelineEventType;
  description: string;
  team: string;
}

export interface TimelineData {
  title: string;
  events: TimelineEvent[];
}

export const DEFAULT_TIMELINE_DATA: TimelineData = {
  title: 'MATCH EVENTS',
  events: [
    { period: '1st', time: '04:22', type: 'goal', description: 'KOPITAR (HOSSA, GABORIK)', team: 'SVK' },
    { period: '1st', time: '12:05', type: 'penalty', description: 'BARKOV - Hooking 2:00', team: 'FIN' },
    { period: '2nd', time: '08:17', type: 'goal', description: 'LAINE (BARKOV)', team: 'FIN' },
    { period: '2nd', time: '15:30', type: 'timeout', description: 'Temps mort', team: 'SVK' },
  ],
};

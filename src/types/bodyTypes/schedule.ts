export type MatchStatus = 'upcoming' | 'live' | 'finished';

export interface ScheduleMatch {
  date: string;
  time: string;
  teamLeft: string;
  teamRight: string;
  scoreLeft: string;
  scoreRight: string;
  status: MatchStatus;
  venue: string;
}

export interface ScheduleData {
  title: string;
  matches: ScheduleMatch[];
}

export const DEFAULT_SCHEDULE_DATA: ScheduleData = {
  title: 'UPCOMING MATCHES',
  matches: [
    { date: '15/02', time: '16:00', teamLeft: 'CAN', teamRight: 'SWE', scoreLeft: '', scoreRight: '', status: 'upcoming', venue: 'Arena Milano' },
    { date: '15/02', time: '20:00', teamLeft: 'FIN', teamRight: 'USA', scoreLeft: '', scoreRight: '', status: 'upcoming', venue: 'Arena Milano' },
    { date: '16/02', time: '16:00', teamLeft: 'SVK', teamRight: 'CZE', scoreLeft: '', scoreRight: '', status: 'upcoming', venue: 'Arena Cortina' },
  ],
};

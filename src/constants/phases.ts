import type { PeriodOption } from '@/types/scoreboard';

export const DEFAULT_PERIOD_OPTIONS: readonly PeriodOption[] = [
  { label: 'TO WARM UP', next: 'WARM UP', duration: '10:00' },
  { label: 'WARM UP', next: 'TO GAME', duration: '20:00' },
  { label: 'TO GAME', next: '1st PERIOD', duration: '5:00' },
  { label: '1st PERIOD', next: '1st INTERMISSION', duration: '20:00' },
  { label: '1st INTERMISSION', next: '2nd PERIOD', duration: '15:00' },
  { label: '2nd PERIOD', next: '2nd INTERMISSION', duration: '20:00' },
  { label: '2nd INTERMISSION', next: '3rd PERIOD', duration: '15:00' },
  { label: '3rd PERIOD', next: '3rd INTERMISSION', duration: '20:00' },
  { label: '3rd INTERMISSION', next: '', duration: '15:00' },
  { label: 'OVERTIME', next: '', duration: '5:00' },
  { label: 'OVERTIME 2', next: '', duration: '5:00' },
];

export type ShootoutResult = 'scored' | 'missed' | 'pending';

export interface ShootoutAttempt {
  result: ShootoutResult;
}

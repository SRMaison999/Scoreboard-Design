import { describe, it, expect } from 'vitest';
import { mapLiveDataToState } from '@/api/liveData/liveDataMapper';
import type { LiveMatchData } from '@/types/liveData';

describe('mapLiveDataToState', () => {
  const fullData: LiveMatchData = {
    matchId: 'M001',
    teamLeft: 'CAN',
    teamRight: 'USA',
    scoreLeft: 3,
    scoreRight: 2,
    period: '2nd PERIOD',
    time: '12:45.0',
    clockRunning: true,
    penaltiesLeft: [{ playerNumber: '7', time: '1:30.0' }],
    penaltiesRight: [],
  };

  it('mappe les \u00e9quipes et les scores', () => {
    const result = mapLiveDataToState(fullData);
    expect(result.team1).toBe('CAN');
    expect(result.team2).toBe('USA');
    expect(result.score1).toBe('3');
    expect(result.score2).toBe('2');
  });

  it('mappe la p\u00e9riode et le temps', () => {
    const result = mapLiveDataToState(fullData);
    expect(result.period).toBe('2nd PERIOD');
    expect(result.time).toBe('12:45.0');
  });

  it('mappe les p\u00e9nalit\u00e9s', () => {
    const result = mapLiveDataToState(fullData);
    expect(result.penaltiesLeft).toHaveLength(1);
    expect(result.penaltiesLeft?.[0]).toEqual({ number: '7', time: '1:30.0' });
    expect(result.penaltiesRight).toHaveLength(0);
  });

  it('ignore les champs vides', () => {
    const partial: LiveMatchData = {
      matchId: '',
      teamLeft: '',
      teamRight: '',
      scoreLeft: 1,
      scoreRight: 0,
      period: '',
      time: '',
      clockRunning: false,
      penaltiesLeft: [],
      penaltiesRight: [],
    };
    const result = mapLiveDataToState(partial);
    expect(result.team1).toBeUndefined();
    expect(result.score1).toBe('1');
  });
});

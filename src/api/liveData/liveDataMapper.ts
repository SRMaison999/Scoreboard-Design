import type { LiveMatchData } from '@/types/liveData';
import type { ScoreboardState } from '@/types/scoreboard';

/**
 * Mappe les donn\u00e9es en direct vers les champs du ScoreboardState.
 * Retourne un partial avec uniquement les champs \u00e0 mettre \u00e0 jour.
 */
export function mapLiveDataToState(
  data: LiveMatchData,
): Partial<ScoreboardState> {
  const updates: Record<string, unknown> = {};

  if (data.teamLeft) updates['team1'] = data.teamLeft;
  if (data.teamRight) updates['team2'] = data.teamRight;
  if (data.scoreLeft != null) updates['score1'] = String(data.scoreLeft);
  if (data.scoreRight != null) updates['score2'] = String(data.scoreRight);
  if (data.period) updates['period'] = data.period;
  if (data.time) updates['time'] = data.time;

  if (data.penaltiesLeft) {
    updates['penaltiesLeft'] = data.penaltiesLeft.map((p) => ({
      number: p.playerNumber,
      time: p.time,
    }));
  }

  if (data.penaltiesRight) {
    updates['penaltiesRight'] = data.penaltiesRight.map((p) => ({
      number: p.playerNumber,
      time: p.time,
    }));
  }

  return updates as Partial<ScoreboardState>;
}

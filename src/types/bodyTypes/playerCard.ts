export interface PlayerCardStat {
  label: string;
  value: string;
}

export interface PlayerCardData {
  title: string;
  subtitle: string;
  playerName: string;
  playerNumber: string;
  playerTeam: string;
  playerPhoto: string;
  stats: PlayerCardStat[];
}

export const DEFAULT_PLAYER_CARD_DATA: PlayerCardData = {
  title: 'JOUEUR DU MATCH',
  subtitle: '',
  playerName: 'KOPITAR',
  playerNumber: '11',
  playerTeam: 'SVK',
  playerPhoto: '',
  stats: [
    { label: 'BUTS', value: '2' },
    { label: 'ASSISTS', value: '3' },
    { label: 'POINTS', value: '5' },
    { label: '+/-', value: '+4' },
  ],
};

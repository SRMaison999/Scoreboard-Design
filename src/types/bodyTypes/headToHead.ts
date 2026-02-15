export interface HeadToHeadPlayer {
  name: string;
  number: string;
  team: string;
}

export interface HeadToHeadStat {
  label: string;
  valueLeft: string;
  valueRight: string;
}

export interface HeadToHeadData {
  title: string;
  playerLeft: HeadToHeadPlayer;
  playerRight: HeadToHeadPlayer;
  stats: HeadToHeadStat[];
}

export const DEFAULT_HEAD_TO_HEAD_DATA: HeadToHeadData = {
  title: 'HEAD TO HEAD',
  playerLeft: { name: 'KOPITAR', number: '11', team: 'SVK' },
  playerRight: { name: 'BARKOV', number: '16', team: 'FIN' },
  stats: [
    { label: 'GOALS', valueLeft: '12', valueRight: '9' },
    { label: 'ASSISTS', valueLeft: '8', valueRight: '14' },
    { label: 'POINTS', valueLeft: '20', valueRight: '23' },
    { label: '+/-', valueLeft: '+6', valueRight: '+8' },
  ],
};

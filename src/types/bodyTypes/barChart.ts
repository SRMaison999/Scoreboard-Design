export interface BarChartRow {
  label: string;
  valueLeft: number;
  valueRight: number;
  format: 'percent' | 'absolute';
}

export interface BarChartData {
  title: string;
  rows: BarChartRow[];
}

export const DEFAULT_BAR_CHART_DATA: BarChartData = {
  title: 'TEAM COMPARISON',
  rows: [
    { label: 'SHOTS ON GOAL', valueLeft: 32, valueRight: 28, format: 'absolute' },
    { label: 'POWER PLAY', valueLeft: 75, valueRight: 80, format: 'percent' },
    { label: 'FACE-OFF %', valueLeft: 52, valueRight: 48, format: 'percent' },
    { label: 'HITS', valueLeft: 18, valueRight: 22, format: 'absolute' },
  ],
};

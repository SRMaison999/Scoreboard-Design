import type { ColorMap, ColorPreset, OpacityMap } from '@/types/colors';

export const DEFAULT_COLORS: ColorMap = {
  bgTop: '#0b2550',
  bgMid: '#1565c0',
  bgBot: '#0a2d65',
  teamName: '#ffffff',
  score: '#ffffff',
  scoreBox: '',
  time: '#ffffff',
  clockBox: '#cc0000',
  period: '#ffffff',
  titleText: '#ffffff',
  statVal: '#ffffff',
  statLabel: '#ffffff',
  penaltyTime: '#ff5252',
  penaltyNumber: '#ffffff',
};

export const DEFAULT_OPACITIES: OpacityMap = {
  bgTop: 0,
  bgMid: 0,
  bgBot: 0,
  teamName: 0,
  score: 0,
  scoreBox: 0,
  time: 0,
  clockBox: 0,
  period: 0,
  titleText: 0,
  statVal: 0,
  statLabel: 0,
  penaltyTime: 0,
  penaltyNumber: 0,
};

export const COLOR_PRESETS: readonly ColorPreset[] = [
  {
    label: 'OMEGA Blue (défaut)',
    colors: { ...DEFAULT_COLORS },
  },
  {
    label: 'Dark Mode',
    colors: {
      ...DEFAULT_COLORS,
      bgTop: '#0a0a0a',
      bgMid: '#1a1a2e',
      bgBot: '#0a0a0a',
      statVal: '#00e5ff',
      penaltyTime: '#ff4444',
    },
  },
  {
    label: 'Ice White',
    colors: {
      ...DEFAULT_COLORS,
      bgTop: '#e3f2fd',
      bgMid: '#bbdefb',
      bgBot: '#90caf9',
      teamName: '#0d47a1',
      score: '#0d47a1',
      time: '#1565c0',
      period: '#1565c0',
      titleText: '#0d47a1',
      statVal: '#01579b',
      statLabel: '#1565c0',
      penaltyTime: '#c62828',
      penaltyNumber: '#0d47a1',
    },
  },
  {
    label: 'Hockey Red',
    colors: {
      ...DEFAULT_COLORS,
      bgTop: '#4a0000',
      bgMid: '#b71c1c',
      bgBot: '#4a0000',
      statVal: '#ffcdd2',
      penaltyTime: '#ffeb3b',
    },
  },
  {
    label: 'Arena Green',
    colors: {
      ...DEFAULT_COLORS,
      bgTop: '#003300',
      bgMid: '#1b5e20',
      bgBot: '#003300',
      statVal: '#69f0ae',
      penaltyTime: '#ff5252',
    },
  },
];

export type TextAlign = 'left' | 'center' | 'right';

export interface FreeTextLine {
  text: string;
  fontSize: number;
  align: TextAlign;
  bold: boolean;
}

export interface FreeTextData {
  lines: FreeTextLine[];
}

export const DEFAULT_FREE_TEXT_DATA: FreeTextData = {
  lines: [
    { text: 'BIENVENUE', fontSize: 60, align: 'center', bold: true },
    { text: 'Championnat du monde de hockey sur glace', fontSize: 30, align: 'center', bold: false },
    { text: '2026', fontSize: 40, align: 'center', bold: true },
  ],
};

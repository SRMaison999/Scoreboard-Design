/**
 * Fonctions utilitaires pour construire des CustomField
 * destin\u00e9s aux presets de layouts (bodyType 14).
 */

import type { CustomField, FieldStyle } from '@/types/customField';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';

const baseStyle: FieldStyle = { ...DEFAULT_FIELD_STYLE };

interface TextFieldOptions {
  readonly fontWeight?: number;
  readonly textAlign?: 'left' | 'center' | 'right';
  readonly textTransform?: 'none' | 'uppercase';
  readonly letterSpacing?: number;
  readonly zIndex?: number;
}

export function makeTextField(
  id: string,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  content: string,
  fontSize: number,
  options?: TextFieldOptions,
): CustomField {
  return {
    id,
    label,
    x,
    y,
    width,
    height,
    rotation: 0,
    zIndex: options?.zIndex ?? 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: false,
    initialWidth: width,
    initialHeight: height,
    element: {
      type: 'text-block',
      config: {
        content,
        fontSize,
        fontWeight: options?.fontWeight ?? 700,
        fontFamily: '',
        textAlign: options?.textAlign ?? 'center',
        textTransform: options?.textTransform ?? 'uppercase',
        letterSpacing: options?.letterSpacing ?? 0,
        textColor: '#ffffff',
      },
    },
    style: { ...baseStyle },
  };
}

export function makeTeamNameField(
  id: string,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  side: 'left' | 'right',
  zIndex?: number,
): CustomField {
  return {
    id,
    label,
    x,
    y,
    width,
    height,
    rotation: 0,
    zIndex: zIndex ?? 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: false,
    initialWidth: width,
    initialHeight: height,
    element: {
      type: 'team-name',
      config: { side, showFlag: false, fontSizeOverride: 0 },
    },
    style: { ...baseStyle },
  };
}

export function makeScoreField(
  id: string,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  side: 'left' | 'right',
  zIndex?: number,
): CustomField {
  return {
    id,
    label,
    x,
    y,
    width,
    height,
    rotation: 0,
    zIndex: zIndex ?? 2,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: false,
    initialWidth: width,
    initialHeight: height,
    element: {
      type: 'score-display',
      config: { side, showLabel: false, fontSizeOverride: 0 },
    },
    style: { ...baseStyle },
  };
}

export function makeClockField(
  id: string,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  zIndex?: number,
): CustomField {
  return {
    id,
    label,
    x,
    y,
    width,
    height,
    rotation: 0,
    zIndex: zIndex ?? 3,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: false,
    initialWidth: width,
    initialHeight: height,
    element: {
      type: 'clock-display',
      config: { showPeriod: false, showBox: false, fontSizeOverride: 0 },
    },
    style: { ...baseStyle },
  };
}

export function makePeriodField(
  id: string,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  zIndex?: number,
): CustomField {
  return {
    id,
    label,
    x,
    y,
    width,
    height,
    rotation: 0,
    zIndex: zIndex ?? 3,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: false,
    initialWidth: width,
    initialHeight: height,
    element: {
      type: 'period-display',
      config: { fontSizeOverride: 0 },
    },
    style: { ...baseStyle },
  };
}

export function makePenaltyColumn(
  id: string,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  side: 'left' | 'right',
  zIndex?: number,
): CustomField {
  return {
    id,
    label,
    x,
    y,
    width,
    height,
    rotation: 0,
    zIndex: zIndex ?? 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: false,
    initialWidth: width,
    initialHeight: height,
    element: {
      type: 'penalty-column',
      config: { side },
    },
    style: { ...baseStyle },
  };
}

export function makeStatLine(
  id: string,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  statIndex: number,
  zIndex?: number,
): CustomField {
  return {
    id,
    label,
    x,
    y,
    width,
    height,
    rotation: 0,
    zIndex: zIndex ?? 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: false,
    initialWidth: width,
    initialHeight: height,
    element: {
      type: 'stat-line',
      config: { statIndex },
    },
    style: { ...baseStyle },
  };
}

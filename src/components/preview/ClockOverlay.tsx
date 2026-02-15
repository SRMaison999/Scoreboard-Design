import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { displayTime } from '@/utils/time';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId, } from '@/types/fonts';
import type { ClockBoxMode } from '@/types/scoreboard';

interface ClockOverlayProps {
  readonly time: string;
  readonly period: string;
  readonly showClock: boolean;
  readonly clockBoxMode: ClockBoxMode;
  readonly demoRunning: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontClock: FontId;
  readonly fontSizeClockTime?: number;
  readonly fontSizePeriod?: number;
  readonly clockPulse?: boolean;
}

export function ClockOverlay({
  time,
  period,
  showClock,
  clockBoxMode,
  demoRunning,
  colors,
  opacities,
  fontClock,
  fontSizeClockTime = 80,
  fontSizePeriod = 22,
  clockPulse = false,
}: ClockOverlayProps) {
  if (!showClock) return null;

  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);

  const showClockBox =
    clockBoxMode === 'always' ||
    (clockBoxMode === 'stopped' && !demoRunning) ||
    (clockBoxMode === 'running' && demoRunning);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'auto',
          ...(showClockBox
            ? {
                background: col('clockBox'),
                borderRadius: 8,
                padding: '4px 28px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }
            : {}),
        }}
      >
        <span
          style={{
            fontSize: fontSizeClockTime,
            fontWeight: 600,
            fontFamily: ff(fontClock),
            color: col('time'),
            ...(clockPulse ? { animation: 'sb-clock-pulse 1s ease-in-out infinite' } : {}),
          }}
        >
          {displayTime(time)}
        </span>
        {period && (
          <span
            style={{
              fontSize: fontSizePeriod,
              fontWeight: 600,
              letterSpacing: 3,
              fontFamily: ff(fontClock),
              textTransform: 'uppercase',
              marginTop: -8,
              color: col('period'),
            }}
          >
            {period}
          </span>
        )}
      </div>
    </div>
  );
}

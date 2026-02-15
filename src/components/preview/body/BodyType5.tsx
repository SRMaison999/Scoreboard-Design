import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import type { PlayerCardData } from '@/types/bodyTypes/playerCard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface BodyType5Props {
  readonly playerCardData: PlayerCardData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
}

export function BodyType5({
  playerCardData,
  showPenalties,
  colors,
  opacities,
  fontBody,
}: BodyType5Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, subtitle, playerName, playerNumber, playerTeam, stats } = playerCardData;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `20px ${pad + 20}px`,
        gap: 14,
        fontFamily: ff(fontBody),
      }}
    >
      {/* Titre */}
      <div
        style={{
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: col('titleText'),
        }}
      >
        {title}
      </div>

      {subtitle && (
        <div style={{ fontSize: 20, color: col('statLabel'), letterSpacing: 3, opacity: 0.7 }}>
          {subtitle}
        </div>
      )}

      {/* Photo placeholder */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          border: '3px solid rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8,
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: col('statVal'),
            fontFamily: ff(fontBody),
          }}
        >
          {playerNumber}
        </span>
      </div>

      {/* Nom + equipe */}
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: col('statVal'),
        }}
      >
        {playerName}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Flag code={playerTeam} w={50} h={32} />
        <span style={{ fontSize: 22, letterSpacing: 4, color: col('statLabel') }}>
          {playerTeam}
        </span>
      </div>

      {/* Stats en ligne */}
      {stats.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 16,
            padding: '16px 30px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {stats.map((s, i) => (
            <div key={`st-${i}`} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: col('statVal'),
                  fontVariantNumeric: 'tabular-nums',
                  textShadow: `0 0 12px ${col('statVal')}5a`,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: col('statLabel'),
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

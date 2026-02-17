import { hexToRgba } from '@/utils/color';
import { ff, scaleFontSize } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import { PhotoCircle } from '@/components/preview/PhotoCircle';
import type { PlayerCardData } from '@/types/bodyTypes/playerCard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType5Props {
  readonly playerCardData: PlayerCardData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
  readonly flagOverrides?: Record<string, string>;
}

export function BodyType5({
  playerCardData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  flagOverrides,
}: BodyType5Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const sc = fontSizes?.bodyScale5 ?? 100;
  const pad = showPenalties ? 10 : 40;
  const { title, subtitle, playerName, playerNumber, playerTeam, playerPhoto, stats } = playerCardData;

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
          fontSize: scaleFontSize(30, sc),
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: col('titleText'),
        }}
      >
        {title}
      </div>

      {subtitle && (
        <div style={{ fontSize: scaleFontSize(20, sc), color: col('statLabel'), letterSpacing: 3, opacity: 0.7 }}>
          {subtitle}
        </div>
      )}

      {/* Photo du joueur */}
      <div style={{ marginTop: 8 }}>
        <PhotoCircle
          photo={playerPhoto}
          fallbackText={playerNumber}
          size={scaleFontSize(180, sc)}
          fontSize={scaleFontSize(56, sc)}
          color={col('statVal')}
          fontFamily={ff(fontBody)}
        />
      </div>

      {/* Nom + equipe */}
      <div
        style={{
          fontSize: scaleFontSize(40, sc),
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: col('statVal'),
        }}
      >
        {playerName}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Flag code={playerTeam} w={50} h={32} flagOverrides={flagOverrides} />
        <span style={{ fontSize: scaleFontSize(22, sc), letterSpacing: 4, color: col('statLabel') }}>
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
                  fontSize: scaleFontSize(36, sc),
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
                  fontSize: scaleFontSize(14, sc),
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

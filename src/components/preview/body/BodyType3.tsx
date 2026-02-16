import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { computeStatGap } from '@/utils/fontScale';
import { FONT_SIZES } from '@/constants/fontSizes';
import { PhotoCircle } from '@/components/preview/PhotoCircle';
import type { PlayerStat } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType3Props {
  readonly playerStats: readonly PlayerStat[];
  readonly titleCenter: string;
  readonly showPlayerPhoto: boolean;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
  readonly playerPhotos?: Record<string, string>;
}

/**
 * Cherche la photo d'un joueur par numero dans la map des photos.
 * Les cles sont au format "TEAM-NUMBER" (ex: "CAN-11").
 */
function findPhotoByNumber(
  playerPhotos: Record<string, string>,
  playerNumber: string,
): string {
  for (const [key, url] of Object.entries(playerPhotos)) {
    if (key.endsWith(`-${playerNumber}`)) {
      return url;
    }
  }
  return '';
}

export function BodyType3({
  playerStats,
  titleCenter,
  showPlayerPhoto,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  playerPhotos = {},
}: BodyType3Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const n = playerStats.length;
  const autoFs = FONT_SIZES[Math.min(Math.max(n, 1), 8)] ?? FONT_SIZES[1]!;
  const fsVal = fontSizes?.statValue || autoFs.val;
  const fsLabel = fontSizes?.statLabel || autoFs.label;
  const fsTitle = fontSizes?.title || 30;
  const contentPad = showPenalties ? 10 : 40;
  const rowFs = fsVal * 0.55;
  const rowLabelFs = fsLabel * 0.55;
  const gridGap = computeStatGap(rowFs, rowLabelFs);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: `40px ${contentPad + 20}px`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontSize: fsTitle,
          fontWeight: 600,
          letterSpacing: 5,
          fontFamily: ff(fontBody),
          textTransform: 'uppercase',
          color: col('titleText'),
          whiteSpace: 'nowrap',
          paddingBottom: 40,
          flexShrink: 0,
        }}
      >
        {titleCenter}
      </div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: showPlayerPhoto
            ? 'auto auto auto auto'
            : 'auto auto auto',
          gridTemplateRows: `repeat(${playerStats.length}, 1fr)`,
          gap: `0 ${gridGap}px`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {playerStats.map((s, i) => {
          const nodes: React.ReactNode[] = [];

          nodes.push(
            <div
              key={`lb-${i}`}
              style={{
                fontSize: rowLabelFs,
                fontWeight: 500,
                letterSpacing: 3,
                textTransform: 'uppercase',
                fontFamily: ff(fontBody),
                color: col('statLabel'),
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {s.label}
            </div>,
          );

          if (showPlayerPhoto) {
            const photo = findPhotoByNumber(playerPhotos, s.playerNumber);
            nodes.push(
              <div
                key={`ph-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PhotoCircle
                  photo={photo}
                  fallbackText={s.playerNumber}
                  size={rowFs * 1.3}
                  fontSize={rowFs * 0.5}
                  color={col('statVal')}
                  fontFamily={ff(fontBody)}
                />
              </div>,
            );
          }

          nodes.push(
            <div
              key={`nm-${i}`}
              style={{
                fontSize: rowFs,
                fontWeight: 500,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontFamily: ff(fontBody),
                color: col('statVal'),
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {s.playerName}
            </div>,
          );

          nodes.push(
            <div
              key={`vr-${i}`}
              style={{
                fontSize: rowFs,
                fontWeight: 700,
                textAlign: 'right',
                fontFamily: ff(fontBody),
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: 2,
                color: col('statVal'),
                textShadow: `0 0 16px ${col('statVal')}5a`,
              }}
            >
              {s.value}
            </div>,
          );

          return nodes;
        })}
      </div>
    </div>
  );
}

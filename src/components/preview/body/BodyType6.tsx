import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import type { StandingsData } from '@/types/bodyTypes/standings';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

interface BodyType6Props {
  readonly standingsData: StandingsData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
}

const RANK_W = 40;
const FLAG_COL_W = 70;
const TEAM_W = 80;
const COL_W = 55;

export function BodyType6({
  standingsData,
  showPenalties,
  colors,
  opacities,
  fontBody,
}: BodyType6Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, columns, rows } = standingsData;
  const rowCount = rows.length;
  const rowFs = rowCount <= 4 ? 30 : rowCount <= 6 ? 26 : rowCount <= 8 ? 22 : 18;
  const rowH = rowCount <= 4 ? 60 : rowCount <= 6 ? 48 : rowCount <= 8 ? 40 : 34;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: `30px ${pad + 20}px`,
        fontFamily: ff(fontBody),
      }}
    >
      {/* Titre */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: col('titleText'),
          paddingBottom: 24,
          flexShrink: 0,
        }}
      >
        {title}
      </div>

      {/* En-tete colonnes */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 32,
          borderBottom: '1px solid rgba(255,255,255,0.15)',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 2,
          color: col('statLabel'),
          opacity: 0.6,
          textTransform: 'uppercase',
          flexShrink: 0,
        }}
      >
        <div style={{ width: RANK_W, textAlign: 'center' }}>#</div>
        <div style={{ width: FLAG_COL_W }} />
        <div style={{ width: TEAM_W }}>NOC</div>
        {columns.map((c) => (
          <div key={c.id} style={{ width: COL_W, textAlign: 'center' }}>{c.label}</div>
        ))}
      </div>

      {/* Lignes */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        {rows.map((row, i) => (
          <div
            key={`row-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: rowH,
              fontSize: rowFs,
              fontWeight: 500,
              color: col('statVal'),
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: row.highlighted ? 'rgba(76,175,80,0.12)' : 'transparent',
            }}
          >
            <div
              style={{
                width: RANK_W,
                textAlign: 'center',
                fontWeight: 700,
                color: col('statLabel'),
              }}
            >
              {i + 1}
            </div>
            <div style={{ width: FLAG_COL_W, display: 'flex', justifyContent: 'center' }}>
              <Flag code={row.team} w={42} h={27} />
            </div>
            <div
              style={{
                width: TEAM_W,
                fontWeight: 700,
                letterSpacing: 3,
              }}
            >
              {row.team}
            </div>
            {columns.map((c) => (
              <div
                key={c.id}
                style={{
                  width: COL_W,
                  textAlign: 'center',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {row.values[c.id] ?? ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

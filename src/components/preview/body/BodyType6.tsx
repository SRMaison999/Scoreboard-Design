import { resolveElementStyle } from '@/utils/elementStyle';
import { ff, scaleFontSize } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import type { StandingsData } from '@/types/bodyTypes/standings';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';

interface BodyType6Props {
  readonly standingsData: StandingsData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
  readonly flagOverrides?: Record<string, string>;
}

const RANK_W = 40;
const FLAG_COL_W = 70;
const TEAM_W = 80;
const COL_W = 55;

const DEFAULTS_TITLE: ElementDefaults = {
  fontSize: 26, fontWeight: 600, letterSpacing: 5,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_HEADER: ElementDefaults = {
  fontSize: 13, fontWeight: 600, letterSpacing: 2,
  textTransform: 'uppercase', colorKey: 'statLabel', hardcodedOpacity: 0.6,
};

const DEFAULTS_RANK: ElementDefaults = {
  fontSize: 20, fontWeight: 700, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statLabel',
};

const DEFAULTS_TEAM_NAME: ElementDefaults = {
  fontSize: 18, fontWeight: 700, letterSpacing: 3,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_CELL_VALUE: ElementDefaults = {
  fontSize: 16, fontWeight: 500, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statVal',
};

export function BodyType6({
  standingsData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  flagOverrides,
}: BodyType6Props) {
  const sc = fontSizes?.bodyScale6 ?? 100;
  const pad = showPenalties ? 10 : 40;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const { title, columns, rows, styleOverrides } = standingsData;
  const ov = styleOverrides ?? {};
  const rowCount = rows.length;
  const rowFs = scaleFontSize(rowCount <= 4 ? 30 : rowCount <= 6 ? 26 : rowCount <= 8 ? 22 : 18, sc);
  const rowH = rowCount <= 4 ? 60 : rowCount <= 6 ? 48 : rowCount <= 8 ? 40 : 34;

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);
  const headerStyle = resolveElementStyle(DEFAULTS_HEADER, ctx, ov.header);
  const rankStyle = resolveElementStyle(DEFAULTS_RANK, ctx, ov.rank);
  const teamNameStyle = resolveElementStyle(DEFAULTS_TEAM_NAME, ctx, ov.teamName);
  const cellValueStyle = resolveElementStyle(DEFAULTS_CELL_VALUE, ctx, ov.cellValue);

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
          paddingBottom: 24,
          flexShrink: 0,
          ...titleStyle,
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
          flexShrink: 0,
          ...headerStyle,
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
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: row.highlighted ? 'rgba(76,175,80,0.12)' : 'transparent',
            }}
          >
            <div
              style={{
                width: RANK_W,
                textAlign: 'center',
                ...rankStyle,
                fontSize: rowFs,
              }}
            >
              {i + 1}
            </div>
            <div style={{ width: FLAG_COL_W, display: 'flex', justifyContent: 'center' }}>
              <Flag code={row.team} w={42} h={27} flagOverrides={flagOverrides} />
            </div>
            <div
              style={{
                width: TEAM_W,
                lineHeight: 1,
                ...teamNameStyle,
                fontSize: rowFs,
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
                  ...cellValueStyle,
                  fontSize: rowFs,
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

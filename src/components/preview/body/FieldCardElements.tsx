/**
 * Renderers canvas pour les elements fiche joueur et score par periode.
 * Inline styles uniquement (canvas capturable en image).
 */

import type { FieldElementConfig } from '@/types/customField';

/* --- Player Card (fiche joueur) --- */

interface PlayerCardElementProps {
  readonly element: Extract<FieldElementConfig, { type: 'player-card' }>;
  readonly height: number;
}

export function PlayerCardElement({ element, height }: PlayerCardElementProps) {
  const c = element.config;
  const photoSize = Math.min(Math.round(height * 0.35), 160);
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 8, fontFamily: c.fontFamily || 'inherit', overflow: 'hidden', padding: 12,
    }}>
      {c.title && (
        <div style={{
          fontSize: Math.round(c.fontSize * 1.2), fontWeight: 600,
          letterSpacing: 5, textTransform: 'uppercase',
          color: c.titleColor,
        }}>
          {c.title}
        </div>
      )}
      {c.subtitle && (
        <div style={{ fontSize: Math.round(c.fontSize * 0.75), color: c.textColor, opacity: 0.6, letterSpacing: 3 }}>
          {c.subtitle}
        </div>
      )}
      {c.playerPhoto ? (
        <img src={c.playerPhoto} alt="" style={{
          width: photoSize, height: photoSize,
          borderRadius: '50%', objectFit: 'cover',
          border: '3px solid rgba(255,255,255,0.2)',
        }} />
      ) : (
        <div style={{
          width: photoSize, height: photoSize, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: Math.round(photoSize * 0.35), fontWeight: 700,
          color: c.textColor, border: '3px solid rgba(255,255,255,0.15)',
        }}>
          {c.playerNumber || '?'}
        </div>
      )}
      <div style={{
        fontSize: Math.round(c.fontSize * 1.5), fontWeight: 700,
        letterSpacing: 4, textTransform: 'uppercase', color: c.textColor,
      }}>
        {c.playerName}
      </div>
      {c.playerTeam && (
        <div style={{
          fontSize: Math.round(c.fontSize * 0.85), letterSpacing: 4,
          color: c.textColor, opacity: 0.6, textTransform: 'uppercase',
        }}>
          {c.playerTeam}
        </div>
      )}
      {c.stats.length > 0 && (
        <div style={{
          display: 'flex', gap: 32, marginTop: 8,
          padding: '10px 20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          {c.stats.map((s, i) => (
            <div key={`st-${i}`} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: Math.round(c.fontSize * 1.3), fontWeight: 700,
                color: c.textColor, fontVariantNumeric: 'tabular-nums',
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: Math.round(c.fontSize * 0.6), fontWeight: 500,
                letterSpacing: 2, textTransform: 'uppercase',
                color: c.textColor, opacity: 0.6, marginTop: 2,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* --- Period Score Row (score par periode) --- */

interface PeriodScoreRowElementProps {
  readonly element: Extract<FieldElementConfig, { type: 'period-score-row' }>;
}

export function PeriodScoreRowElement({ element }: PeriodScoreRowElementProps) {
  const c = element.config;
  if (c.periods.length === 0) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.4)', fontSize: c.fontSize,
      }}>
        -
      </div>
    );
  }
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: c.fontFamily || 'inherit', overflow: 'hidden',
    }}>
      <table style={{ borderCollapse: 'collapse', fontSize: c.fontSize }}>
        <thead>
          <tr>
            {c.periods.map((p, i) => (
              <th key={`h-${i}`} style={{
                padding: '2px 12px', fontWeight: 600,
                color: c.headerColor, textTransform: 'uppercase',
                letterSpacing: 1, fontSize: Math.round(c.fontSize * 0.78),
                borderBottom: '1px solid rgba(255,255,255,0.15)',
              }}>
                {p.period}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {c.periods.map((p, i) => (
              <td key={`l-${i}`} style={{
                padding: '3px 12px', fontWeight: 700,
                color: c.textColor, textAlign: 'center',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {p.scoreLeft}
              </td>
            ))}
          </tr>
          <tr>
            {c.periods.map((p, i) => (
              <td key={`r-${i}`} style={{
                padding: '3px 12px', fontWeight: 700,
                color: c.textColor, textAlign: 'center',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {p.scoreRight}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

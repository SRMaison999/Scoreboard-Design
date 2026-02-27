/**
 * Renderers canvas pour les elements calendrier/schedule du Layout libre.
 * Inline styles uniquement (canvas capturable en image).
 */

import type { FieldElementConfig } from '@/types/customField';
import type { ScheduleMatchStatus } from '@/types/freeLayoutConfigs';

function statusColor(status: ScheduleMatchStatus): string {
  switch (status) {
    case 'live': return 'rgba(255,60,60,0.9)';
    case 'finished': return 'rgba(255,255,255,0.35)';
    default: return 'rgba(255,255,255,0.6)';
  }
}

const STATUS_LABELS: Record<ScheduleMatchStatus, string> = {
  upcoming: '\u00c0 VEN.',
  live: 'LIVE',
  finished: 'FIN',
};

/* --- Schedule Match (un seul match) --- */

interface ScheduleMatchElementProps {
  readonly element: Extract<FieldElementConfig, { type: 'schedule-match' }>;
}

export function ScheduleMatchElement({ element }: ScheduleMatchElementProps) {
  const c = element.config;
  const hasScore = c.status === 'finished' || c.status === 'live';
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '0 10px', fontFamily: c.fontFamily || 'inherit', overflow: 'hidden',
    }}>
      <div style={{ width: 50, fontSize: Math.round(c.fontSize * 0.78), color: c.textColor, opacity: 0.6, flexShrink: 0 }}>
        {c.date}
      </div>
      <div style={{
        width: 46, fontSize: c.fontSize, fontWeight: 600,
        fontVariantNumeric: 'tabular-nums', color: c.textColor, flexShrink: 0,
      }}>
        {c.time}
      </div>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        fontSize: Math.round(c.fontSize * 1.1), fontWeight: 700,
        letterSpacing: 2, textTransform: 'uppercase', color: c.textColor,
      }}>
        <span>{c.teamLeft}</span>
        {hasScore ? (
          <span style={{ fontSize: c.fontSize, fontVariantNumeric: 'tabular-nums' }}>
            {c.scoreLeft} - {c.scoreRight}
          </span>
        ) : (
          <span style={{ fontSize: Math.round(c.fontSize * 0.78), opacity: 0.6 }}>vs</span>
        )}
        <span>{c.teamRight}</span>
      </div>
      <div style={{
        width: 50, fontSize: Math.round(c.fontSize * 0.67), fontWeight: 700,
        textAlign: 'center', color: statusColor(c.status),
        letterSpacing: 1, flexShrink: 0,
      }}>
        {STATUS_LABELS[c.status]}
      </div>
      {c.venue && (
        <div style={{
          width: 110, fontSize: Math.round(c.fontSize * 0.67),
          color: c.textColor, opacity: 0.6, textAlign: 'right',
          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', flexShrink: 0,
        }}>
          {c.venue}
        </div>
      )}
    </div>
  );
}

/* --- Schedule List (liste de matchs) --- */

interface ScheduleListElementProps {
  readonly element: Extract<FieldElementConfig, { type: 'schedule-list' }>;
}

export function ScheduleListElement({ element }: ScheduleListElementProps) {
  const c = element.config;
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: c.fontFamily || 'inherit',
    }}>
      {c.title && (
        <div style={{
          fontSize: Math.round(c.fontSize * 1.4), fontWeight: 600,
          letterSpacing: 5, textTransform: 'uppercase',
          color: c.titleColor, textAlign: 'center',
          padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          {c.title}
        </div>
      )}
      {c.matches.map((m, i) => {
        const hasScore = m.status === 'finished' || m.status === 'live';
        return (
          <div key={`sch-${i}`} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '6px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ width: 50, fontSize: Math.round(c.fontSize * 0.78), color: c.textColor, opacity: 0.6, flexShrink: 0 }}>
              {m.date}
            </div>
            <div style={{
              width: 46, fontSize: c.fontSize, fontWeight: 600,
              fontVariantNumeric: 'tabular-nums', color: c.textColor, flexShrink: 0,
            }}>
              {m.time}
            </div>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              fontSize: Math.round(c.fontSize * 1.1), fontWeight: 700,
              letterSpacing: 2, textTransform: 'uppercase', color: c.textColor,
            }}>
              <span>{m.teamLeft}</span>
              {hasScore ? (
                <span style={{ fontSize: c.fontSize, fontVariantNumeric: 'tabular-nums' }}>
                  {m.scoreLeft} - {m.scoreRight}
                </span>
              ) : (
                <span style={{ fontSize: Math.round(c.fontSize * 0.78), opacity: 0.6 }}>vs</span>
              )}
              <span>{m.teamRight}</span>
            </div>
            <div style={{
              width: 50, fontSize: Math.round(c.fontSize * 0.67), fontWeight: 700,
              textAlign: 'center', color: statusColor(m.status),
              letterSpacing: 1, flexShrink: 0,
            }}>
              {STATUS_LABELS[m.status]}
            </div>
            {m.venue && (
              <div style={{
                width: 100, fontSize: Math.round(c.fontSize * 0.67),
                color: c.textColor, opacity: 0.6, textAlign: 'right',
                overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', flexShrink: 0,
              }}>
                {m.venue}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

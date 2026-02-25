/**
 * Renderers canvas pour les elements evenement/chronologie du Layout libre.
 * Inline styles uniquement (canvas capturable en image).
 */

import type { FieldElementConfig } from '@/types/customField';
import type { TimelineEventKind } from '@/types/freeLayoutConfigs';

const EVENT_SYMBOLS: Record<TimelineEventKind, string> = {
  goal: 'G',
  penalty: 'P',
  timeout: 'T',
  period: '-',
};

function eventBg(kind: TimelineEventKind): string {
  return kind === 'goal' ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.08)';
}

/* --- Timeline Event (un seul evenement) --- */

interface TimelineEventElementProps {
  readonly element: Extract<FieldElementConfig, { type: 'timeline-event' }>;
}

export function TimelineEventElement({ element }: TimelineEventElementProps) {
  const c = element.config;
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', gap: 14, padding: '0 10px',
      fontFamily: 'inherit', overflow: 'hidden',
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%',
        background: eventBg(c.kind),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(c.fontSize * 0.78), fontWeight: 700,
        color: c.textColor, flexShrink: 0,
      }}>
        {EVENT_SYMBOLS[c.kind]}
      </div>
      <div style={{ fontSize: Math.round(c.fontSize * 0.78), color: c.textColor, opacity: 0.6, width: 40, flexShrink: 0 }}>
        {c.period}
      </div>
      <div style={{
        fontSize: c.fontSize, fontWeight: 600,
        fontVariantNumeric: 'tabular-nums', color: c.textColor,
        width: 60, flexShrink: 0,
      }}>
        {c.time}
      </div>
      <div style={{
        fontSize: Math.round(c.fontSize * 0.78), fontWeight: 500,
        letterSpacing: 2, color: c.textColor, opacity: 0.6,
        width: 50, flexShrink: 0, textTransform: 'uppercase',
      }}>
        {c.team}
      </div>
      <div style={{
        flex: 1, fontSize: Math.round(c.fontSize * 0.89), color: c.textColor,
        textTransform: 'uppercase', letterSpacing: 1,
        overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
      }}>
        {c.description}
      </div>
    </div>
  );
}

/* --- Timeline List (liste chronologique) --- */

interface TimelineListElementProps {
  readonly element: Extract<FieldElementConfig, { type: 'timeline-list' }>;
}

export function TimelineListElement({ element }: TimelineListElementProps) {
  const c = element.config;
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: 'inherit',
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
      {c.events.map((ev, i) => (
        <div key={`ev-${i}`} style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '5px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: eventBg(ev.kind),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: Math.round(c.fontSize * 0.75), fontWeight: 700,
            color: c.textColor, flexShrink: 0,
          }}>
            {EVENT_SYMBOLS[ev.kind]}
          </div>
          <div style={{ fontSize: Math.round(c.fontSize * 0.78), color: c.textColor, opacity: 0.6, width: 36, flexShrink: 0 }}>
            {ev.period}
          </div>
          <div style={{
            fontSize: c.fontSize, fontWeight: 600,
            fontVariantNumeric: 'tabular-nums', color: c.textColor,
            width: 55, flexShrink: 0,
          }}>
            {ev.time}
          </div>
          <div style={{
            fontSize: Math.round(c.fontSize * 0.78), fontWeight: 500,
            letterSpacing: 2, color: c.textColor, opacity: 0.6,
            width: 45, flexShrink: 0, textTransform: 'uppercase',
          }}>
            {ev.team}
          </div>
          <div style={{
            flex: 1, fontSize: Math.round(c.fontSize * 0.89), color: c.textColor,
            textTransform: 'uppercase', letterSpacing: 1,
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          }}>
            {ev.description}
          </div>
        </div>
      ))}
    </div>
  );
}

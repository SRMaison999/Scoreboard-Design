/**
 * Renderers pour les elements "but" des champs personnalises :
 * goal-scorer, goal-assists, goal-details.
 * Rendus sur le canvas (inline styles autorises).
 */

import type { GoalScorerConfig, GoalAssistsConfig, GoalDetailsConfig } from '@/types/customField';

export function GoalScorerElement({ element, height }: {
  readonly element: { readonly config: GoalScorerConfig };
  readonly height: number;
}) {
  const c = element.config;

  if (!c.scorerName && !c.scorerNumber) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 14,
      }}>
        Buteur
      </div>
    );
  }

  const photoSize = Math.min(height - 16, 80);
  const hasPhoto = c.showPhoto && c.scorerPhoto;

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', gap: 16,
      fontFamily: c.fontFamily || 'inherit',
      padding: '8px 16px', overflow: 'hidden',
    }}>
      {hasPhoto && (
        <div style={{
          width: photoSize, height: photoSize, borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.08)',
          border: '2px solid rgba(255,255,255,0.2)',
          overflow: 'hidden', flexShrink: 0,
        }}>
          <img
            src={c.scorerPhoto}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 2,
        color: c.textColor || '#ffffff', overflow: 'hidden',
      }}>
        <span style={{
          fontSize: c.fontSize, fontWeight: 800,
          textTransform: 'uppercase', letterSpacing: 1,
          whiteSpace: 'nowrap',
        }}>
          {c.showNumber && c.scorerNumber ? `#${c.scorerNumber} ` : ''}{c.scorerName}
        </span>
      </div>
    </div>
  );
}

export function GoalAssistsElement({ element }: {
  readonly element: { readonly config: GoalAssistsConfig };
}) {
  const c = element.config;
  const hasA1 = !!c.assist1Name;
  const hasA2 = !!c.assist2Name;

  if (!hasA1 && !hasA2) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 14,
      }}>
        Assistants
      </div>
    );
  }

  const formatAssist = (name: string, number: string): string => {
    if (c.showNumbers && number) return `#${number} ${name}`;
    return name;
  };

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', gap: 16,
      fontSize: c.fontSize, fontWeight: 600,
      fontFamily: c.fontFamily || 'inherit',
      color: c.textColor || '#ffffff',
      textTransform: 'uppercase', letterSpacing: 1,
      padding: '0 16px', overflow: 'hidden', whiteSpace: 'nowrap',
    }}>
      {hasA1 && <span>{formatAssist(c.assist1Name, c.assist1Number)}</span>}
      {hasA1 && hasA2 && (
        <span style={{ opacity: 0.4, fontSize: c.fontSize * 0.7 }}>/</span>
      )}
      {hasA2 && <span>{formatAssist(c.assist2Name, c.assist2Number)}</span>}
    </div>
  );
}

export function GoalDetailsElement({ element }: {
  readonly element: { readonly config: GoalDetailsConfig };
}) {
  const c = element.config;

  if (!c.goalTime && !c.goalPeriod && !c.goalCountMatch) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 14,
      }}>
        Détails du but
      </div>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', gap: 16,
      fontSize: c.fontSize, fontWeight: 600,
      fontFamily: c.fontFamily || 'inherit',
      color: c.textColor || '#ffffff',
      padding: '0 16px', overflow: 'hidden', whiteSpace: 'nowrap',
    }}>
      {c.goalTime && (
        <span style={{ fontWeight: 700 }}>{c.goalTime}</span>
      )}
      {c.showPeriod && c.goalPeriod && (
        <span style={{
          textTransform: 'uppercase', letterSpacing: 1,
          fontSize: c.fontSize * 0.85, opacity: 0.8,
        }}>
          {c.goalPeriod}
        </span>
      )}
      {c.showCount && (c.goalCountMatch || c.goalCountTournament) && (
        <span style={{ fontSize: c.fontSize * 0.8, opacity: 0.7 }}>
          {c.goalCountMatch && `(${c.goalCountMatch})`}
          {c.goalCountTournament && ` [${c.goalCountTournament}]`}
        </span>
      )}
    </div>
  );
}

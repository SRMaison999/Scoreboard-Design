/**
 * Renderers pour les elements "joueurs" des champs personnalises :
 * player-row, player-list.
 * Rendus sur le canvas (inline styles autorises).
 */

import type { PlayerRowConfig, PlayerListConfig, PlayerListEntry } from '@/types/customField';

function playerLabel(name: string, number: string, showNumber: boolean): string {
  if (!name && !number) return '';
  if (showNumber && number) return `#${number} ${name}`;
  return name;
}

export function PlayerRowElement({ element }: {
  readonly element: { readonly config: PlayerRowConfig };
}) {
  const c = element.config;
  const display = playerLabel(c.playerName, c.playerNumber, c.showNumber);

  if (!display && !c.position) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 14,
      }}>
        Joueur
      </div>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', gap: 12,
      fontSize: c.fontSize, fontWeight: 700,
      color: c.textColor || '#ffffff',
      textTransform: 'uppercase', letterSpacing: 1,
      padding: '0 12px', overflow: 'hidden', whiteSpace: 'nowrap',
    }}>
      <span>{display}</span>
      {c.showPosition && c.position && (
        <span style={{ fontSize: c.fontSize * 0.7, fontWeight: 500, opacity: 0.7 }}>
          {c.position}
        </span>
      )}
    </div>
  );
}

function PlayerRow({ player, showNumber, showPosition, fontSize, textColor }: {
  readonly player: PlayerListEntry;
  readonly showNumber: boolean;
  readonly showPosition: boolean;
  readonly fontSize: number;
  readonly textColor: string;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize, fontWeight: 600,
      color: textColor || '#ffffff',
      textTransform: 'uppercase', letterSpacing: 0.5,
      padding: '2px 0', overflow: 'hidden', whiteSpace: 'nowrap',
    }}>
      {showNumber && player.number && (
        <span style={{ minWidth: fontSize * 2, textAlign: 'right', fontWeight: 700 }}>
          #{player.number}
        </span>
      )}
      <span style={{ flex: 1 }}>{player.name}</span>
      {showPosition && player.position && (
        <span style={{ fontSize: fontSize * 0.75, opacity: 0.7 }}>{player.position}</span>
      )}
    </div>
  );
}

export function PlayerListElement({ element }: {
  readonly element: { readonly config: PlayerListConfig };
}) {
  const c = element.config;

  if (c.players.length === 0 && !c.title) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 14,
      }}>
        Liste de joueurs
      </div>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      padding: '8px 12px', overflow: 'hidden',
    }}>
      {c.title && (
        <div style={{
          fontSize: c.fontSize * 1.1, fontWeight: 800,
          color: c.titleColor || '#ffffff',
          textTransform: 'uppercase', letterSpacing: 2,
          marginBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.2)',
          paddingBottom: 4,
        }}>
          {c.title}
        </div>
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {c.players.map((player, idx) => (
          <PlayerRow
            key={idx}
            player={player}
            showNumber={c.showNumbers}
            showPosition={c.showPositions}
            fontSize={c.fontSize}
            textColor={c.textColor}
          />
        ))}
      </div>
    </div>
  );
}

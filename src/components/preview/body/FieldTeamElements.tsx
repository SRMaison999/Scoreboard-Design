/**
 * Renderers pour les elements "equipe" et "tableau" des champs personnalises :
 * staff-row, staff-list, data-table.
 * Rendus sur le canvas (inline styles autorises).
 */

import type { StaffRowConfig, StaffListConfig, StaffListEntry, DataTableConfig } from '@/types/customField';

export function StaffRowElement({ element }: {
  readonly element: { readonly config: StaffRowConfig };
}) {
  const c = element.config;

  if (!c.name && !c.role) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 14,
      }}>
        Membre du staff
      </div>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', gap: 12,
      fontSize: c.fontSize, fontFamily: c.fontFamily || 'inherit',
      color: c.textColor || '#ffffff',
      padding: '0 12px', overflow: 'hidden', whiteSpace: 'nowrap',
    }}>
      {c.role && (
        <span style={{ fontWeight: 500, opacity: 0.7, textTransform: 'uppercase', fontSize: c.fontSize * 0.8, letterSpacing: 1 }}>
          {c.role}
        </span>
      )}
      <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>{c.name}</span>
    </div>
  );
}

function StaffMemberRow({ member, fontSize, textColor }: {
  readonly member: StaffListEntry;
  readonly fontSize: number;
  readonly textColor: string;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize, color: textColor || '#ffffff',
      padding: '2px 0', overflow: 'hidden', whiteSpace: 'nowrap',
    }}>
      {member.role && (
        <span style={{ fontWeight: 500, opacity: 0.7, textTransform: 'uppercase', fontSize: fontSize * 0.8, letterSpacing: 1, minWidth: '30%' }}>
          {member.role}
        </span>
      )}
      <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>{member.name}</span>
    </div>
  );
}

export function StaffListElement({ element }: {
  readonly element: { readonly config: StaffListConfig };
}) {
  const c = element.config;

  if (c.members.length === 0 && !c.title) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 14,
      }}>
        Liste du staff
      </div>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      fontFamily: c.fontFamily || 'inherit',
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
        {c.members.map((member, idx) => (
          <StaffMemberRow key={idx} member={member} fontSize={c.fontSize} textColor={c.textColor} />
        ))}
      </div>
    </div>
  );
}

export function DataTableElement({ element }: {
  readonly element: { readonly config: DataTableConfig };
}) {
  const c = element.config;

  if (c.columns.length === 0) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.3)', fontSize: 14,
      }}>
        Tableau de données
      </div>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      fontFamily: c.fontFamily || 'inherit',
      padding: '8px', overflow: 'hidden',
    }}>
      {c.title && (
        <div style={{
          fontSize: c.fontSize * 1.2, fontWeight: 800,
          color: c.headerColor || '#ffffff',
          textTransform: 'uppercase', letterSpacing: 2,
          textAlign: 'center', marginBottom: 8,
        }}>
          {c.title}
        </div>
      )}
      <table style={{
        width: '100%', borderCollapse: 'collapse',
        fontSize: c.fontSize, color: c.textColor || '#ffffff',
      }}>
        {c.showHeader && (
          <thead>
            <tr>
              {c.columns.map((col) => (
                <th key={col.id} style={{
                  fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1,
                  fontSize: c.fontSize * 0.85, color: c.headerColor || '#ffffff',
                  textAlign: col.align, padding: '4px 8px',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {c.rows.map((row, rIdx) => (
            <tr key={rIdx} style={{
              backgroundColor: row.highlighted ? 'rgba(255,255,255,0.08)' : 'transparent',
            }}>
              {c.columns.map((col) => (
                <td key={col.id} style={{
                  textAlign: col.align, padding: '3px 8px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {row.values[col.id] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Panneau de surcharges de style par rôle d'élément.
 * Affiche une liste de rôles, chacun avec un toggle et un éditeur.
 */

import { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ElementStyleFields } from '@/components/editor/ElementStyleFields';
import { useStyleOverrideEditor } from '@/hooks/useStyleOverrideEditor';
import { EDITOR_LABELS } from '@/constants/labels';
import type { ElementStyleOverride } from '@/types/elementStyleOverride';

interface RoleConfig {
  readonly role: string;
  readonly label: string;
}

interface StyleOverridePanelProps {
  readonly roles: readonly RoleConfig[];
  readonly overrides: Partial<Record<string, ElementStyleOverride>>;
  readonly onUpdate: (role: string, override: ElementStyleOverride | undefined) => void;
}

function RoleEditor({
  label,
  override,
  onUpdate,
}: {
  readonly label: string;
  readonly override: ElementStyleOverride | undefined;
  readonly onUpdate: (override: ElementStyleOverride | undefined) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const editor = useStyleOverrideEditor(override, onUpdate);
  const hasValues = override !== undefined && Object.keys(override).length > 0;

  const handleToggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const Icon = expanded ? ChevronDown : ChevronRight;

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-1.5 text-left w-full group"
      >
        <Icon className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
        <span className="text-[12px] text-gray-300 flex-1">{label}</span>
        {hasValues && (
          <span className="text-[9px] bg-sky-900 text-sky-300 px-1.5 py-0.5 rounded">
            {EDITOR_LABELS.styleOverrideEnabled}
          </span>
        )}
      </button>
      {expanded && (
        <div className="ml-1 mb-1">
          <ElementStyleFields
            override={override}
            onSetFontSize={editor.setFontSize}
            onSetFontWeight={editor.setFontWeight}
            onSetFontFamily={editor.setFontFamily}
            onSetLetterSpacing={editor.setLetterSpacing}
            onSetTextTransform={editor.setTextTransform}
            onSetColor={editor.setColor}
            onSetOpacity={editor.setOpacity}
            onClearField={editor.clearField}
          />
          {hasValues && (
            <button
              type="button"
              onClick={editor.reset}
              className="mt-1 text-[10px] text-red-400 hover:text-red-300"
            >
              {EDITOR_LABELS.styleOverrideReset}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function StyleOverridePanel({
  roles,
  overrides,
  onUpdate,
}: StyleOverridePanelProps) {
  return (
    <Section title={EDITOR_LABELS.styleOverridesSection}>
      <div className="flex flex-col gap-0.5">
        {roles.map((r) => (
          <RoleEditor
            key={r.role}
            label={r.label}
            override={overrides[r.role]}
            onUpdate={(ov) => onUpdate(r.role, ov)}
          />
        ))}
      </div>
    </Section>
  );
}

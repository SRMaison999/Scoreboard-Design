/**
 * Modale de sauvegarde d'un preset de champ ou de layout.
 */

import { useMemo, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { usePresetStore } from '@/stores/presetStore';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { getContainedFields, toRelativePositions } from '@/utils/fieldContainment';
import type { PresetScope } from '@/types/fieldPreset';
import type { CustomField } from '@/types/customField';

interface SavePresetModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly defaultScope: PresetScope;
  /** Champs capturés par sélection de zone (force le mode layout) */
  readonly zoneFields?: readonly CustomField[];
}

export function SavePresetModal({ open, onClose, defaultScope, zoneFields }: SavePresetModalProps) {
  const [name, setName] = useState('');
  const [scope, setScope] = useState<PresetScope>(defaultScope);
  const [saving, setSaving] = useState(false);

  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const selectedFieldId = useScoreboardStore((s) => s.customFieldsData.selectedFieldId);
  const customFieldsData = useScoreboardStore((s) => s.customFieldsData);
  const saveFieldPreset = usePresetStore((s) => s.saveFieldPreset);
  const saveLayoutPreset = usePresetStore((s) => s.saveLayoutPreset);

  const isZoneMode = !!zoneFields && zoneFields.length > 0;
  const effectiveScope: PresetScope = isZoneMode ? 'layout' : scope;
  const effectiveFields = isZoneMode ? zoneFields : fields;

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  const containedFields = useMemo(
    () => (selectedField ? getContainedFields(selectedField, fields) : []),
    [selectedField, fields],
  );

  const canSaveField = effectiveScope === 'field' && !!selectedField;
  const canSaveLayout = effectiveScope === 'layout' && effectiveFields.length > 0;
  const canSave = name.trim().length > 0 && (canSaveField || canSaveLayout);

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      if (effectiveScope === 'field' && selectedField) {
        const relativeChildren = containedFields.length > 0
          ? toRelativePositions(selectedField, containedFields)
          : undefined;
        await saveFieldPreset(name.trim(), selectedField, relativeChildren);
      } else {
        const layoutData = isZoneMode
          ? { ...customFieldsData, fields: [...zoneFields] as CustomField[] }
          : customFieldsData;
        await saveLayoutPreset(name.trim(), layoutData);
      }
      setName('');
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalHeader>{CUSTOM_FIELD_LABELS.presetSaveTitle}</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-3">
          {!isZoneMode && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setScope('field')}
                className={`flex-1 rounded-md px-3 py-2 text-sm border ${
                  scope === 'field'
                    ? 'border-sky-500 bg-sky-950 text-sky-300'
                    : 'border-gray-700 bg-gray-800 text-gray-400'
                }`}
              >
                {CUSTOM_FIELD_LABELS.presetScopeField}
              </button>
              <button
                type="button"
                onClick={() => setScope('layout')}
                className={`flex-1 rounded-md px-3 py-2 text-sm border ${
                  scope === 'layout'
                    ? 'border-sky-500 bg-sky-950 text-sky-300'
                    : 'border-gray-700 bg-gray-800 text-gray-400'
                }`}
              >
                {CUSTOM_FIELD_LABELS.presetScopeLayout}
              </button>
            </div>
          )}

          {effectiveScope === 'field' && !selectedField && (
            <p className="text-[12px] text-amber-400">
              {CUSTOM_FIELD_LABELS.presetNoFieldSelected}
            </p>
          )}
          {effectiveScope === 'layout' && effectiveFields.length === 0 && (
            <p className="text-[12px] text-amber-400">
              {CUSTOM_FIELD_LABELS.presetNoFields}
            </p>
          )}

          {effectiveScope === 'field' && selectedField && (
            <p className="text-[12px] text-gray-400">
              {selectedField.label} ({selectedField.element.type})
              {containedFields.length > 0 && (
                <span className="ml-1 text-sky-400">
                  + {containedFields.length} {CUSTOM_FIELD_LABELS.presetChildrenCount}
                </span>
              )}
            </p>
          )}
          {effectiveScope === 'layout' && effectiveFields.length > 0 && (
            <p className="text-[12px] text-gray-400">
              {isZoneMode && (
                <span className="text-sky-400 mr-1">{CUSTOM_FIELD_LABELS.zoneSelectStart}:</span>
              )}
              {effectiveFields.length} {CUSTOM_FIELD_LABELS.presetFieldCount}
            </p>
          )}

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={CUSTOM_FIELD_LABELS.presetNamePlaceholder}
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-md px-3 py-2 text-sm"
            autoFocus
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" onClick={handleClose}>
          {CUSTOM_FIELD_LABELS.presetCancel}
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!canSave || saving}
        >
          {CUSTOM_FIELD_LABELS.presetSave}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

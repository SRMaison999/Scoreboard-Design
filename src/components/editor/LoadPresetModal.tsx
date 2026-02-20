/**
 * Modale de chargement d'un preset de champ ou de layout.
 * Permet de charger, supprimer, exporter et importer des presets.
 */

import { useState, useEffect, useRef } from 'react';
import { Trash2, Download, Upload } from 'lucide-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { usePresetStore } from '@/stores/presetStore';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { FIELD_MAX_FIELDS } from '@/types/customField';
import { toAbsolutePositions } from '@/utils/fieldContainment';
import type { FieldPreset } from '@/types/fieldPreset';

interface LoadPresetModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

type LoadMode = 'replace' | 'merge';

function PresetRow({
  preset,
  onLoad,
  onDelete,
  onExport,
}: {
  readonly preset: FieldPreset;
  readonly onLoad: (p: FieldPreset) => void;
  readonly onDelete: (id: string) => void;
  readonly onExport: (id: string) => void;
}) {
  const scopeLabel = preset.scope === 'field'
    ? CUSTOM_FIELD_LABELS.presetScopeField
    : CUSTOM_FIELD_LABELS.presetScopeLayout;

  const childCount = preset.children?.length ?? 0;
  const fieldDetail = childCount > 0
    ? `${preset.field?.element.type ?? ''} + ${childCount} ${CUSTOM_FIELD_LABELS.presetChildrenCount}`
    : preset.field?.element.type ?? '';
  const detail = preset.scope === 'layout' && preset.layout
    ? `${preset.layout.fields.length} ${CUSTOM_FIELD_LABELS.presetFieldCount}`
    : fieldDetail;

  return (
    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-800 group">
      <button
        type="button"
        onClick={() => onLoad(preset)}
        className="flex-1 text-left cursor-pointer"
      >
        <div className="text-[13px] text-gray-200">{preset.name}</div>
        <div className="text-[11px] text-gray-500">
          {scopeLabel} - {detail}
        </div>
      </button>
      <button
        type="button"
        onClick={() => onExport(preset.id)}
        className="p-1 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-sky-300 cursor-pointer"
        title={CUSTOM_FIELD_LABELS.presetExport}
      >
        <Download size={14} className="flex-shrink-0" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(preset.id)}
        className="p-1 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 cursor-pointer"
        title={CUSTOM_FIELD_LABELS.presetDelete}
      >
        <Trash2 size={14} className="flex-shrink-0" />
      </button>
    </div>
  );
}

export function LoadPresetModal({ open, onClose }: LoadPresetModalProps) {
  const presets = usePresetStore((s) => s.presets);
  const fetchPresets = usePresetStore((s) => s.fetchPresets);
  const deletePreset = usePresetStore((s) => s.deletePreset);
  const exportPreset = usePresetStore((s) => s.exportPreset);
  const importPreset = usePresetStore((s) => s.importPreset);

  const fields = useScoreboardStore((s) => s.customFieldsData.fields);
  const customFieldsData = useScoreboardStore((s) => s.customFieldsData);
  const addField = useScoreboardStore((s) => s.addCustomField);
  const update = useScoreboardStore((s) => s.update);

  const [loadMode, setLoadMode] = useState<LoadMode>('replace');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      void fetchPresets();
    }
  }, [open, fetchPresets]);

  const handleLoadField = (preset: FieldPreset) => {
    if (!preset.field) return;
    if (fields.length >= FIELD_MAX_FIELDS) return;
    const f = preset.field;
    addField(f.element, f.x, f.y, f.width, f.height, f.label);

    if (preset.children && preset.children.length > 0) {
      const absoluteChildren = toAbsolutePositions(f, preset.children);
      const remaining = FIELD_MAX_FIELDS - fields.length - 1;
      const toAdd = absoluteChildren.slice(0, remaining);
      for (const child of toAdd) {
        addField(child.element, child.x, child.y, child.width, child.height, child.label);
      }
    }

    onClose();
  };

  const handleLoadLayout = (preset: FieldPreset) => {
    if (!preset.layout) return;
    if (loadMode === 'replace') {
      update('customFieldsData', structuredClone(preset.layout));
    } else {
      const merged = structuredClone(customFieldsData);
      const remaining = FIELD_MAX_FIELDS - merged.fields.length;
      const toAdd = preset.layout.fields.slice(0, remaining);
      const maxZ = merged.fields.reduce((m, f) => Math.max(m, f.zIndex), 0);
      toAdd.forEach((f, i) => {
        merged.fields.push({
          ...f,
          id: `field-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          zIndex: maxZ + i + 1,
        });
      });
      update('customFieldsData', merged);
    }
    onClose();
  };

  const handleLoad = (preset: FieldPreset) => {
    if (preset.scope === 'field') {
      handleLoadField(preset);
    } else {
      handleLoadLayout(preset);
    }
  };

  const handleDelete = async (id: string) => {
    await deletePreset(id);
  };

  const handleExport = async (id: string) => {
    await exportPreset(id);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importPreset(file);
    } catch {
      /* erreur gérée silencieusement */
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fieldPresets = presets.filter((p) => p.scope === 'field');
  const layoutPresets = presets.filter((p) => p.scope === 'layout');

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>{CUSTOM_FIELD_LABELS.presetLoadTitle}</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLoadMode('replace')}
              className={`flex-1 rounded-md px-3 py-1.5 text-[12px] border ${
                loadMode === 'replace'
                  ? 'border-sky-500 bg-sky-950 text-sky-300'
                  : 'border-gray-700 bg-gray-800 text-gray-400'
              }`}
            >
              {CUSTOM_FIELD_LABELS.presetLoadReplace}
            </button>
            <button
              type="button"
              onClick={() => setLoadMode('merge')}
              className={`flex-1 rounded-md px-3 py-1.5 text-[12px] border ${
                loadMode === 'merge'
                  ? 'border-sky-500 bg-sky-950 text-sky-300'
                  : 'border-gray-700 bg-gray-800 text-gray-400'
              }`}
            >
              {CUSTOM_FIELD_LABELS.presetLoadMerge}
            </button>
          </div>

          {fieldPresets.length > 0 && (
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                {CUSTOM_FIELD_LABELS.presetScopeField}
              </div>
              {fieldPresets.map((p) => (
                <PresetRow
                  key={p.id}
                  preset={p}
                  onLoad={handleLoad}
                  onDelete={handleDelete}
                  onExport={handleExport}
                />
              ))}
            </div>
          )}

          {layoutPresets.length > 0 && (
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                {CUSTOM_FIELD_LABELS.presetScopeLayout}
              </div>
              {layoutPresets.map((p) => (
                <PresetRow
                  key={p.id}
                  preset={p}
                  onLoad={handleLoad}
                  onDelete={handleDelete}
                  onExport={handleExport}
                />
              ))}
            </div>
          )}

          {presets.length === 0 && (
            <p className="text-[12px] text-gray-500 text-center py-4">
              {CUSTOM_FIELD_LABELS.presetEmpty}
            </p>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <label className="cursor-pointer">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.preset.json"
            onChange={handleImport}
            className="hidden"
          />
          <span className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm bg-gray-800 border border-gray-700 text-gray-400 hover:text-sky-300 cursor-pointer">
            <Upload size={14} className="flex-shrink-0" />
            {CUSTOM_FIELD_LABELS.presetImport}
          </span>
        </label>
        <Button variant="ghost" onClick={onClose}>
          {CUSTOM_FIELD_LABELS.presetCancel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

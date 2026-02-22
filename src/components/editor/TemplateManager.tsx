import { useState, useEffect, useCallback, useRef } from 'react';
import { Save, FolderOpen, Download, Upload, Copy, Trash2, Pencil } from 'lucide-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useTemplateStore } from '@/stores/templateStore';
import { extractState } from '@/utils/stateExtractor';
import { EDITOR_LABELS } from '@/constants/labels';
import { useToastStore } from '@/stores/toastStore';
import { PRESET_TEMPLATES } from '@/data/presetTemplates';
import type { ScoreboardTemplate } from '@/types/template';

type ModalMode = 'none' | 'save' | 'list' | 'rename' | 'deleteConfirm';

export function TemplateManager() {
  const [mode, setMode] = useState<ModalMode>('none');
  const [inputValue, setInputValue] = useState('');
  const [activeTemplate, setActiveTemplate] = useState<ScoreboardTemplate | null>(null);

  const state = useScoreboardStore();
  const { templates, fetchTemplates, saveTemplate, deleteTemplate, duplicateTemplate, renameTemplate, exportTemplate, importTemplate } = useTemplateStore();
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    void fetchTemplates();
  }, [fetchTemplates]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openSave = useCallback(() => {
    setInputValue('');
    setMode('save');
  }, []);

  const openList = useCallback(() => {
    setMode('list');
  }, []);

  const closeModal = useCallback(() => {
    setMode('none');
    setActiveTemplate(null);
    setInputValue('');
  }, []);

  const handleSave = useCallback(async () => {
    const name = inputValue.trim();
    if (!name) return;
    await saveTemplate(name, extractState(state));
    closeModal();
    addToast(EDITOR_LABELS.templateSaved);
  }, [inputValue, state, saveTemplate, closeModal, addToast]);

  const handleLoad = useCallback((template: ScoreboardTemplate) => {
    state.loadState(template.state);
    closeModal();
    addToast(EDITOR_LABELS.templateLoaded);
  }, [state, closeModal, addToast]);

  const handleLoadPreset = useCallback((presetState: ScoreboardTemplate['state']) => {
    state.loadState(presetState);
    closeModal();
  }, [state, closeModal]);

  const handleDelete = useCallback(async () => {
    if (!activeTemplate) return;
    await deleteTemplate(activeTemplate.id);
    closeModal();
    addToast(EDITOR_LABELS.templateDeleted);
  }, [activeTemplate, deleteTemplate, closeModal, addToast]);

  const handleDuplicate = useCallback(async (id: string) => {
    await duplicateTemplate(id);
    addToast(EDITOR_LABELS.templateDuplicated);
  }, [duplicateTemplate, addToast]);

  const handleExport = useCallback(async (id: string) => {
    await exportTemplate(id);
  }, [exportTemplate]);

  const handleRename = useCallback(async () => {
    if (!activeTemplate) return;
    const name = inputValue.trim();
    if (!name) return;
    await renameTemplate(activeTemplate.id, name);
    setMode('list');
    setActiveTemplate(null);
    setInputValue('');
  }, [activeTemplate, inputValue, renameTemplate]);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importTemplate(file);
      addToast(EDITOR_LABELS.templateLoaded);
    } catch {
      addToast(EDITOR_LABELS.templateImportError, 'error');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [importTemplate, addToast]);

  const openRename = useCallback((template: ScoreboardTemplate) => {
    setActiveTemplate(template);
    setInputValue(template.name);
    setMode('rename');
  }, []);

  const openDeleteConfirm = useCallback((template: ScoreboardTemplate) => {
    setActiveTemplate(template);
    setMode('deleteConfirm');
  }, []);

  const iconBtnClass = 'p-1 rounded hover:bg-gray-700 text-gray-400 hover:text-gray-200 cursor-pointer';

  return (
    <>
      <div className="flex gap-1">
        <Button variant="ghost" className="flex items-center gap-1.5" onClick={openSave}>
          <Save size={14} className="flex-shrink-0" />
          {EDITOR_LABELS.templateSave}
        </Button>
        <Button variant="ghost" className="flex items-center gap-1.5" onClick={openList}>
          <FolderOpen size={14} className="flex-shrink-0" />
          {EDITOR_LABELS.templates}
        </Button>
        <Button variant="ghost" className="flex items-center gap-1.5" onClick={handleImportClick}>
          <Upload size={14} className="flex-shrink-0" />
          {EDITOR_LABELS.templateImport}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.scoreboard.json"
          className="hidden"
          onChange={(e) => void handleFileChange(e)}
        />
      </div>

      {/* Modale de sauvegarde */}
      <Modal open={mode === 'save'} onClose={closeModal}>
        <ModalHeader>{EDITOR_LABELS.templateSaveTitle}</ModalHeader>
        <ModalBody>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={EDITOR_LABELS.templateNamePlaceholder}
            className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-100 text-sm w-full outline-none"
            onKeyDown={(e) => { if (e.key === 'Enter') void handleSave(); }}
            autoFocus
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closeModal}>{EDITOR_LABELS.templateCancel}</Button>
          <Button variant="primary" onClick={() => void handleSave()}>{EDITOR_LABELS.templateSave}</Button>
        </ModalFooter>
      </Modal>

      {/* Modale de liste */}
      <Modal open={mode === 'list'} onClose={closeModal}>
        <ModalHeader>{EDITOR_LABELS.templates}</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-3 max-h-80 overflow-y-auto">
            {/* Templates prédéfinis */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                {EDITOR_LABELS.templatePresets}
              </span>
              {PRESET_TEMPLATES.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between bg-gray-800 rounded-md px-3 py-2"
                >
                  <button
                    type="button"
                    className="text-sm text-gray-200 hover:text-white cursor-pointer text-left flex-1"
                    onClick={() => handleLoadPreset(preset.state)}
                  >
                    {preset.name}
                  </button>
                </div>
              ))}
            </div>

            {/* Templates sauvegardés */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                {EDITOR_LABELS.templates}
              </span>
              {templates.length === 0 && (
                <p className="text-sm text-gray-500 py-2">{EDITOR_LABELS.templateEmptyList}</p>
              )}
              {templates.map((template) => (
                <TemplateRow
                  key={template.id}
                  template={template}
                  onLoad={handleLoad}
                  onDuplicate={handleDuplicate}
                  onExport={handleExport}
                  onRename={openRename}
                  onDelete={openDeleteConfirm}
                  iconBtnClass={iconBtnClass}
                />
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closeModal}>{EDITOR_LABELS.templateCancel}</Button>
        </ModalFooter>
      </Modal>

      {/* Modale renommer */}
      <Modal open={mode === 'rename'} onClose={closeModal}>
        <ModalHeader>{EDITOR_LABELS.templateRenameTitle}</ModalHeader>
        <ModalBody>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={EDITOR_LABELS.templateNamePlaceholder}
            className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-100 text-sm w-full outline-none"
            onKeyDown={(e) => { if (e.key === 'Enter') void handleRename(); }}
            autoFocus
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closeModal}>{EDITOR_LABELS.templateCancel}</Button>
          <Button variant="primary" onClick={() => void handleRename()}>{EDITOR_LABELS.templateConfirm}</Button>
        </ModalFooter>
      </Modal>

      {/* Modale de confirmation de suppression */}
      <Modal open={mode === 'deleteConfirm'} onClose={closeModal}>
        <ModalHeader>{EDITOR_LABELS.templateDeleteConfirm}</ModalHeader>
        <ModalBody>
          <p className="text-sm text-gray-300">{EDITOR_LABELS.templateDeleteMessage}</p>
          {activeTemplate && (
            <p className="text-sm text-gray-400 mt-2">{activeTemplate.name}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closeModal}>{EDITOR_LABELS.templateCancel}</Button>
          <Button variant="danger" onClick={() => void handleDelete()}>{EDITOR_LABELS.templateDelete}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

interface TemplateRowProps {
  readonly template: ScoreboardTemplate;
  readonly onLoad: (t: ScoreboardTemplate) => void;
  readonly onDuplicate: (id: string) => Promise<void>;
  readonly onExport: (id: string) => Promise<void>;
  readonly onRename: (t: ScoreboardTemplate) => void;
  readonly onDelete: (t: ScoreboardTemplate) => void;
  readonly iconBtnClass: string;
}

function TemplateRow({
  template,
  onLoad,
  onDuplicate,
  onExport,
  onRename,
  onDelete,
  iconBtnClass,
}: TemplateRowProps) {
  const date = new Date(template.modified).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-center justify-between bg-gray-800 rounded-md px-3 py-2 gap-2">
      <button
        type="button"
        className="flex flex-col text-left flex-1 min-w-0 cursor-pointer"
        onClick={() => onLoad(template)}
      >
        <span className="text-sm text-gray-200 truncate">{template.name}</span>
        <span className="text-[10px] text-gray-500">{date}</span>
      </button>
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <button type="button" className={iconBtnClass} onClick={() => onRename(template)} title={EDITOR_LABELS.templateRename}>
          <Pencil size={13} className="flex-shrink-0" />
        </button>
        <button type="button" className={iconBtnClass} onClick={() => void onDuplicate(template.id)} title={EDITOR_LABELS.templateDuplicate}>
          <Copy size={13} className="flex-shrink-0" />
        </button>
        <button type="button" className={iconBtnClass} onClick={() => void onExport(template.id)} title={EDITOR_LABELS.templateExport}>
          <Download size={13} className="flex-shrink-0" />
        </button>
        <button type="button" className={iconBtnClass} onClick={() => onDelete(template)} title={EDITOR_LABELS.templateDelete}>
          <Trash2 size={13} className="flex-shrink-0 text-red-400" />
        </button>
      </div>
    </div>
  );
}

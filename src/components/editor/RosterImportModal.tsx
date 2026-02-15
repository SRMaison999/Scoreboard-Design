import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { EDITOR_LABELS } from '@/constants/labels';
import { parseCsv } from '@/utils/roster/csvParser';
import { parseExcel } from '@/utils/roster/excelParser';
import { parseJsonRoster } from '@/utils/roster/jsonParser';
import type { RosterPlayer } from '@/types/bodyTypes/roster';
import type { RosterImportMode, RosterImportResult } from '@/types/rosterImport';

interface RosterImportModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onImport: (players: RosterPlayer[], mode: RosterImportMode) => void;
}

function parseFile(file: File): Promise<RosterImportResult> {
  return new Promise((resolve) => {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

    if (ext === 'csv' || ext === 'tsv' || ext === 'txt') {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(parseCsv(reader.result as string));
      };
      reader.onerror = () => {
        resolve({ success: false, players: [], errors: ['Erreur de lecture du fichier'], warnings: [] });
      };
      reader.readAsText(file);
      return;
    }

    if (ext === 'json') {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(parseJsonRoster(reader.result as string));
      };
      reader.onerror = () => {
        resolve({ success: false, players: [], errors: ['Erreur de lecture du fichier'], warnings: [] });
      };
      reader.readAsText(file);
      return;
    }

    if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(parseExcel(reader.result as ArrayBuffer));
      };
      reader.onerror = () => {
        resolve({ success: false, players: [], errors: ['Erreur de lecture du fichier'], warnings: [] });
      };
      reader.readAsArrayBuffer(file);
      return;
    }

    resolve({
      success: false,
      players: [],
      errors: ['Format non support\u00e9. Utilisez CSV, Excel (.xlsx) ou JSON.'],
      warnings: [],
    });
  });
}

export function RosterImportModal({ open, onClose, onImport }: RosterImportModalProps) {
  const [result, setResult] = useState<RosterImportResult | null>(null);
  const [mode, setMode] = useState<RosterImportMode>('replace');
  const [fileName, setFileName] = useState('');

  const reset = useCallback(() => {
    setResult(null);
    setFileName('');
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    const parsed = await parseFile(file);
    setResult(parsed);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) void handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleConfirm = useCallback(() => {
    if (result?.success && result.players.length > 0) {
      onImport(result.players, mode);
      handleClose();
    }
  }, [result, mode, onImport, handleClose]);

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalHeader>{EDITOR_LABELS.rosterImportTitle}</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-4">
          {/* Zone de drop */}
          <div
            className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-sky-500 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('roster-file-input')?.click()}
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 flex-shrink-0" />
            <p className="text-sm text-gray-300">{EDITOR_LABELS.rosterImportSelectFile}</p>
            <p className="text-xs text-gray-500 mt-1">{EDITOR_LABELS.rosterImportDragDrop}</p>
            <p className="text-xs text-gray-600 mt-2">{EDITOR_LABELS.rosterImportFormatHint}</p>
            <input
              id="roster-file-input"
              type="file"
              accept=".csv,.tsv,.txt,.xlsx,.xls,.json"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>

          {/* Fichier chargé */}
          {fileName && (
            <p className="text-xs text-gray-400">
              {fileName}
            </p>
          )}

          {/* Erreurs */}
          {result && result.errors.length > 0 && (
            <div className="bg-red-900/30 border border-red-700 rounded-md p-3">
              {result.errors.map((err, i) => (
                <p key={`err-${String(i)}`} className="text-xs text-red-300">{err}</p>
              ))}
            </div>
          )}

          {/* Avertissements */}
          {result && result.warnings.length > 0 && (
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-md p-3">
              {result.warnings.map((w, i) => (
                <p key={`warn-${String(i)}`} className="text-xs text-yellow-300">{w}</p>
              ))}
            </div>
          )}

          {/* Aperçu */}
          {result?.success && result.players.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-300">
                {EDITOR_LABELS.rosterImportPreview} ({String(result.players.length)})
              </p>
              <div className="max-h-48 overflow-y-auto bg-gray-800 rounded-md p-2">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                      <th className="text-left py-1 px-1">{EDITOR_LABELS.rosterPlayerNumber}</th>
                      <th className="text-left py-1 px-1">{EDITOR_LABELS.rosterPlayerName}</th>
                      <th className="text-left py-1 px-1">{EDITOR_LABELS.rosterPlayerPosition}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.players.map((p, i) => (
                      <tr key={`prev-${String(i)}`} className="text-gray-200 border-b border-gray-700/50">
                        <td className="py-1 px-1">{p.number}</td>
                        <td className="py-1 px-1">{p.name}</td>
                        <td className="py-1 px-1">{p.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mode d'import */}
              <div className="flex gap-3 mt-1">
                <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="import-mode"
                    value="replace"
                    checked={mode === 'replace'}
                    onChange={() => setMode('replace')}
                    className="accent-sky-400"
                  />
                  {EDITOR_LABELS.rosterImportModeReplace}
                </label>
                <label className="flex items-center gap-1.5 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="import-mode"
                    value="append"
                    checked={mode === 'append'}
                    onChange={() => setMode('append')}
                    className="accent-sky-400"
                  />
                  {EDITOR_LABELS.rosterImportModeAppend}
                </label>
              </div>
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose}>
          {EDITOR_LABELS.rosterImportCancel}
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!result?.success || result.players.length === 0}
        >
          {EDITOR_LABELS.rosterImportConfirm}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

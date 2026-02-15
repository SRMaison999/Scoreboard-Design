import { useState, useCallback } from 'react';
import { DEFAULT_EXPORT_CONFIG } from '@/types/animation';
import type { ExportConfig } from '@/types/animation';

/**
 * Gère la configuration d'export (vidéo/GIF).
 * État local (non persisté dans le store principal).
 */
export function useExportConfig() {
  const [config, setConfig] = useState<ExportConfig>({ ...DEFAULT_EXPORT_CONFIG });

  const updateField = useCallback(<K extends keyof ExportConfig>(key: K, value: ExportConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { config, updateField };
}

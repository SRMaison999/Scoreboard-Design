/**
 * Helper partagé pour mettre à jour la configuration d'un élément de champ personnalisé.
 */

import type { FieldElementConfig } from '@/types/customField';

export function updateFieldElementConfig(
  updateElement: (id: string, el: FieldElementConfig) => void,
  fieldId: string,
  element: FieldElementConfig,
  patch: Record<string, unknown>,
) {
  const newConfig = { ...element.config, ...patch };
  updateElement(fieldId, { ...element, config: newConfig } as FieldElementConfig);
}

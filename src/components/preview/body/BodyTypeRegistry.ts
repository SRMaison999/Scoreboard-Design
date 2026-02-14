import type { ComponentType } from 'react';
import type { BodyTypeId } from '@/types/scoreboard';

/**
 * Registre dynamique de body types.
 * Chaque body type est un composant React avec ses propres props.
 * Le registre permet d'ajouter de nouveaux types sans toucher au reste du code.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyBodyComponent = ComponentType<any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

const registry = new Map<BodyTypeId, AnyBodyComponent>();

export function registerBodyType(id: BodyTypeId, component: AnyBodyComponent): void {
  registry.set(id, component);
}

export function getBodyType(id: BodyTypeId): AnyBodyComponent | undefined {
  return registry.get(id);
}

export function getRegisteredBodyTypes(): BodyTypeId[] {
  return Array.from(registry.keys());
}

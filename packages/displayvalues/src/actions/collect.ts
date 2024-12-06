import type { FormField } from '@finsweet/attributes-utils';

import { getInstance, queryAllElements } from '../utils/selectors';
import { relationshipsStore } from '../utils/stores';

/**
 * Collects the targets where to display the values.
 * @param sourceElement
 */
export const collectTargets = (sourceElement: FormField) => {
  const instance = getInstance(sourceElement);

  const displayTargets = queryAllElements('target', { instance });
  if (!displayTargets.length) return;

  relationshipsStore.set(sourceElement, displayTargets);
};

import type { FormField } from '@finsweet/ts-utils';

import { getInstanceIndex } from '$global/helpers';

import { ATTRIBUTES, queryElement } from '../utils/constants';
import { relationshipsStore } from '../utils/stores';

/**
 * Collects the targets where to display the values.
 * @param sourceElement
 */
export const collectTargets = (sourceElement: FormField) => {
  const instanceIndex = getInstanceIndex(sourceElement, ATTRIBUTES.element.key);

  const displayTargets = queryElement<HTMLElement>('target', { instanceIndex, all: true });
  if (!displayTargets.length) return;

  relationshipsStore.set(sourceElement, displayTargets);
};

import type { FormField } from '@finsweet/ts-utils';
import { getFormFieldValue } from '@finsweet/ts-utils';

import { ATTRIBUTES } from '../utils/constants';
import { relationshipsStore } from '../utils/stores';

/**
 * Updates the value of the target element from a source.
 * @param sourceElement
 */
export const syncValue = (sourceElement: FormField) => {
  const displayTargets = relationshipsStore.get(sourceElement);
  if (!displayTargets) return;

  for (const displayTarget of displayTargets) {
    const sourceValue = getFormFieldValue(sourceElement);

    const placeholderValue = displayTarget.getAttribute(ATTRIBUTES.placeholder.key);

    const displayValue = sourceValue ? sourceValue : placeholderValue;

    displayTarget.textContent = displayValue;
  }
};

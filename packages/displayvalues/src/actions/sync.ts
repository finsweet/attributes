import { type FormField, getFormFieldValue } from '@finsweet/attributes-utils';

import { getAttribute } from '../utils/selectors';
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

    const placeholderValue = getAttribute(displayTarget, 'placeholder') || null;

    const displayValue = sourceValue ? sourceValue : placeholderValue;

    displayTarget.textContent = displayValue;
  }
};

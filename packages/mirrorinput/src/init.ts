import {
  addListener,
  type FinsweetAttributeInit,
  isElement,
  isFormField,
  isHTMLInputElement,
  setFormFieldValue,
} from '@finsweet/attributes-utils';

import { getElementSelector, getInstance, queryElement } from './utils/selectors';

/**
 * Inits click events mirroring.
 */
export const init: FinsweetAttributeInit = () => {
  const inputCleanup = addListener(window, 'input', ({ target }) => {
    if (!isElement(target)) return;

    const mirrorTrigger = target.closest(getElementSelector('trigger'));
    if (!isFormField(mirrorTrigger)) return;

    // Get the instance index
    const instance = getInstance(mirrorTrigger);

    const mirrorTarget = queryElement('target', { instance });
    if (!isFormField(mirrorTarget) || mirrorTrigger.type !== mirrorTarget.type) return;

    // If must update the `checked` property
    if (
      isHTMLInputElement(mirrorTarget) &&
      (mirrorTarget.type === 'checkbox' || mirrorTarget.type === 'radio') &&
      (mirrorTrigger as HTMLInputElement).checked !== mirrorTarget.checked
    ) {
      setFormFieldValue(mirrorTarget, !mirrorTarget.checked);

      return;
    }

    // If must update the `value` property
    setFormFieldValue(mirrorTarget, mirrorTrigger.value);
  });

  return {
    destroy() {
      inputCleanup();
    },
  };
};

import {
  addListener,
  type FinsweetAttributeInit,
  getFormFieldValue,
  isElement,
  isFormField,
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

    const triggerValue = getFormFieldValue(mirrorTrigger);

    setFormFieldValue(mirrorTarget, triggerValue);
  });

  return {
    destroy() {
      inputCleanup();
    },
  };
};

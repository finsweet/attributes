import { addListener, isElement, isFormField, isHTMLInputElement, setFormFieldValue } from '@finsweet/ts-utils';

import { MIRROR_INPUT_ATTRIBUTE } from '$global/constants/attributes';
import { finalizeAttribute } from '$global/factory';
import { getInstanceIndex } from '$global/helpers';

import { ATTRIBUTES, getSelector, queryElement } from './constants';

/**
 * Inits click events mirroring.
 */
export const init = (): void => {
  const inputCleanup = addListener(window, 'input', ({ target }) => {
    if (!isElement(target)) return;

    const mirrorTrigger = target.closest(getSelector('element', 'trigger', { operator: 'prefixed' }));
    if (!isFormField(mirrorTrigger)) return;

    // Get the instance index
    const instanceIndex = getInstanceIndex(mirrorTrigger, ATTRIBUTES.element.key);

    const mirrorTarget = queryElement('target', { instanceIndex });
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

  return finalizeAttribute(MIRROR_INPUT_ATTRIBUTE, undefined, () => inputCleanup());
};

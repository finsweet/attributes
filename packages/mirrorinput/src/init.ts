import { isFormField, setFormFieldValue } from '@finsweet/ts-utils';

import { MIRROR_INPUT_ATTRIBUTE } from '$global/constants/attributes';
import { getInstanceIndex } from '$global/helpers';

import { ATTRIBUTES, getSelector, queryElement } from './constants';

/**
 * Inits click events mirroring.
 */
export const init = (): void => {
  window.addEventListener('input', ({ target }) => {
    if (!(target instanceof Element)) return;

    const mirrorTrigger = target.closest(getSelector('element', 'trigger', { operator: 'prefixed' }));
    if (!isFormField(mirrorTrigger)) return;

    // Get the instance index
    const instanceIndex = getInstanceIndex(mirrorTrigger, ATTRIBUTES.element.key);

    const mirrorTarget = queryElement('target', { instanceIndex });
    if (!isFormField(mirrorTarget) || mirrorTrigger.type !== mirrorTarget.type) return;

    // If must update the `checked` property
    if (
      mirrorTarget instanceof HTMLInputElement &&
      (mirrorTarget.type === 'checkbox' || mirrorTarget.type === 'radio') &&
      (mirrorTrigger as HTMLInputElement).checked !== mirrorTarget.checked
    ) {
      setFormFieldValue(mirrorTarget, !mirrorTarget.checked);

      return;
    }

    // If must update the `value` property
    setFormFieldValue(mirrorTarget, mirrorTrigger.value);
  });

  window.fsAttributes[MIRROR_INPUT_ATTRIBUTE].resolve?.(undefined);
};

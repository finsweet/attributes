import { isNotEmpty } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, INPUT_COUNTER_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { importA11Y } from '$global/import/a11y';

import { initInputCounter } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const inputElements = [
    ...document.querySelectorAll<HTMLInputElement>(`input${getSelector('element', 'input', { operator: 'prefixed' })}`),
  ];

  const cleanups = inputElements.map(initInputCounter).filter(isNotEmpty);

  importA11Y();

  return finalizeAttribute(INPUT_COUNTER_ATTRIBUTE, inputElements, () => {
    for (const cleanup of cleanups) cleanup();
  });
};

import { type FsAttributeInit, isNotEmpty, waitWebflowReady } from '@finsweet/attributes-utils';

import { initInputCounter } from './factory';
import { getElementSelector } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const inputElements = [...document.querySelectorAll<HTMLInputElement>(`input${getElementSelector('input')}`)];

  const cleanups = inputElements.map(initInputCounter).filter(isNotEmpty);

  window.fsAttributes.load('a11y');

  return {
    result: inputElements,
    destroy() {
      for (const cleanup of cleanups) cleanup();
    },
  };
};

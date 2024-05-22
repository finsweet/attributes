import { type FinsweetAttributeInit, isNotEmpty, waitWebflowReady } from '@finsweet/attributes-utils';

import { initModal } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const modalElements = queryAllElements('modal');

  const cleanups = modalElements.map(initModal).filter(isNotEmpty);

  window.finsweetAttributes.load('a11y');

  return {
    result: modalElements,
    destroy() {
      for (const cleanup of cleanups) cleanup();
    },
  };
};

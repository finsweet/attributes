import { type FsAttributeInit, isNotEmpty, waitWebflowReady } from '@finsweet/attributes-utils';

import { initModal } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const modalElements = queryAllElements('modal');

  const cleanups = modalElements.map(initModal).filter(isNotEmpty);

  window.fsAttributes.load('a11y');

  return {
    result: modalElements,
    destroy() {
      for (const cleanup of cleanups) cleanup();
    },
  };
};

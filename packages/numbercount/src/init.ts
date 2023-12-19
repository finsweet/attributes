import { type FinsweetAttributeInit, isNotEmpty, waitWebflowReady } from '@finsweet/attributes-utils';

import { initNumberCount } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const numberElements = queryAllElements('number');

  const cleanups = numberElements.map(initNumberCount).filter(isNotEmpty);

  return {
    result: numberElements,
    destroy() {
      for (const cleanup of cleanups) cleanup();
    },
  };
};

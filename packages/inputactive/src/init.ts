import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initInputActiveClasses } from './factory';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const cleanup = initInputActiveClasses();

  return {
    destroy() {
      cleanup();
    },
  };
};

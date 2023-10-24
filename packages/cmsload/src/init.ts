import { createCMSListInstances } from '@finsweet/attributes-cmscore';
import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initLoadInstance } from './factory';
import { getElementSelector } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  // Create the list instances
  const listInstances = createCMSListInstances([getElementSelector('list')]);

  // Init the modes
  const cleanups = await Promise.all(listInstances.map((listInstance) => initLoadInstance(listInstance)));

  return {
    result: listInstances,
    destroy() {
      for (const listInstance of listInstances) listInstance.destroy();
      for (const cleanup of cleanups) cleanup?.();
    },
  };
};

import { createCMSListInstances } from '@finsweet/attributes-cmscore';
import { type FinsweetAttributeInit, isNotEmpty, waitWebflowReady } from '@finsweet/attributes-utils';

import { initListSorting } from './factory';
import { getElementSelector } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const listInstances = createCMSListInstances([getElementSelector('list')]);

  const cleanups = listInstances.map(initListSorting).filter(isNotEmpty);

  return {
    result: listInstances,
    destroy() {
      for (const listInstance of listInstances) listInstance.destroy();
      for (const cleanup of cleanups) cleanup();
    },
  };
};

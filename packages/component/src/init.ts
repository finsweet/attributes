import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { collectComponentTargetsData } from './actions/collect';
import { prefetchComponentsPages } from './actions/prefetch';
import { initComponents } from './factory';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const componentTargetsData = collectComponentTargetsData();

  await prefetchComponentsPages(componentTargetsData);

  const componentsData = await initComponents(componentTargetsData);

  return {
    result: componentsData,
  };
};

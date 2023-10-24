import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { collectComponentTargetsData } from './actions/collect';
import { prefetchComponentsPages } from './actions/prefetch';
import { initComponents } from './factory';
import type { SETTINGS } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit<typeof SETTINGS> = async ({ proxy, cachekey, cacheversion } = {}) => {
  await waitWebflowReady();

  const componentTargetsData = collectComponentTargetsData(proxy);

  await prefetchComponentsPages(componentTargetsData, cachekey, cacheversion);

  const componentsData = await initComponents(componentTargetsData);

  return {
    result: componentsData,
  };
};

import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { collectComponentTargetsData } from './actions/collect';
import { initComponents } from './factory';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const componentTargetsData = collectComponentTargetsData();

  const componentsData = await initComponents(componentTargetsData);

  return {
    result: componentsData,
  };
};

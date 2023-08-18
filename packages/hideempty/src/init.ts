import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initHideEmpty } from './actions/hide';
import { queryAllElements } from './utils';

/**
 * Inits the hideempty attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const listElements = queryAllElements('list');

  const hideInstances = listElements.map((list) => initHideEmpty(list));

  return {
    result: hideInstances,
    destroy() {
      for (const hideInstance of hideInstances) hideInstance?.disconnect();
    },
  };
};

import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initInheritClass } from './actions/inherit';
import { queryAllElements } from './utils';

/**
 * Inits the inheritclass attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();
  const parentElements = queryAllElements('listener');

  const inheritInstances = parentElements.map((list) => initInheritClass(list));

  return {
    result: inheritInstances,
    destroy() {
      for (const inheritInstance of inheritInstances) inheritInstance?.disconnect();
    },
  };
};

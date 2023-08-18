import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initInheritClass } from './actions/inherit';
import { getSettingSelector } from './utils';

/**
 * Inits the inheritclass attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();
  const listenerSelector = getSettingSelector('listener');
  const parentElements = Array.from(document.querySelectorAll<HTMLElement>(listenerSelector));

  parentElements.forEach((element) => initInheritClass(element));
  const inheritInstances = parentElements.map((list) => initInheritClass(list));

  return {
    result: inheritInstances,
    destroy() {
      for (const inheritInstance of inheritInstances) inheritInstance?.disconnect();
    },
  };
};

import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initInheritClass } from './actions/inherit';
import { getSettingSelector } from './utils';

/**
 * Inits the slider attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();
  const listenerSelector = getSettingSelector('listener');
  const parentElements = document.querySelectorAll<HTMLElement>(listenerSelector);

  parentElements.forEach((element) => initInheritClass(element));

  return {
    result: [],
  };
};

import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initTabs } from './actions/tabs';
import { queryAllElements } from './utils';

export const init: FsAttributeInit = async () => {
  await waitWebflowReady();
  const menus = queryAllElements('menu');

  for (const menu of menus) {
    initTabs(menu);
  }

  return {
    result: menus,
  };
};

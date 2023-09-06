import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initTabs } from './actions/tabs';
import { queryAllElements } from './utils';

export const init: FsAttributeInit = async () => {
  await waitWebflowReady();
  const tabs = queryAllElements('tabs');

  const tabstInstances = tabs.map((tabWrapper) => initTabs(tabWrapper));

  return {
    result: tabs,
    destroy() {
      for (const tabInstance of tabstInstances) tabInstance?.clean();
    },
  };
};

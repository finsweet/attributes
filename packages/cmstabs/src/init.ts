import { createCMSListInstances } from '@finsweet/attributes-cmscore';
import { type FinsweetAttributeInit, restartWebflow, waitWebflowReady } from '@finsweet/attributes-utils';

import { collectPopulateData } from './actions/collect';
import { populateTabsFromLists } from './actions/populate';
import { getElementSelector } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const listInstances = createCMSListInstances([getElementSelector('list')]);

  // Collect the combine data
  const [populateData, restartIx] = collectPopulateData(listInstances);

  // Populate the sliders
  for (const data of populateData) {
    const { listInstances } = data;

    const createTabsFromItems = populateTabsFromLists(data);

    // Listen events
    for (const listInstance of listInstances) {
      listInstance.restartTabs = true;
      listInstance.restartIx ||= restartIx;
      listInstance.items = [];

      listInstance.on('renderitems', async (renderedItems) => {
        listInstance.items = [];

        createTabsFromItems?.(renderedItems);
      });
    }
  }

  const modulesToRestart: Parameters<typeof restartWebflow>['0'] = ['tabs'];
  if (restartIx) modulesToRestart.push('ix2');

  await restartWebflow(modulesToRestart);

  return {
    result: listInstances,
    destroy() {
      for (const listInstance of listInstances) listInstance.destroy();
    },
  };
};

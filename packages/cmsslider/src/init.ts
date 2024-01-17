import { createCMSListInstances } from '@finsweet/attributes-cmscore';
import { type FinsweetAttributeInit, restartWebflow, waitWebflowReady } from '@finsweet/attributes-utils';

import { collectPopulateData } from './actions/collect';
import { populateSliderFromLists } from './actions/populate';
import { getElementSelector } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const listInstances = createCMSListInstances([getElementSelector('list')]);

  // Collect the combine data
  const [populateData, restartIx] = collectPopulateData(listInstances);

  /**
   * Restarts the sliders module + the ix2 module, if required.
   */
  const restartSliders = async () => {
    const modulesToRestart: Parameters<typeof restartWebflow>['0'] = ['slider'];
    if (restartIx) modulesToRestart.push('ix2');

    await restartWebflow(modulesToRestart);
  };

  // Populate the sliders
  for (const data of populateData) {
    const { listInstances } = data;

    const createSlidesFromItems = populateSliderFromLists(data);
    if (!createSlidesFromItems) continue;

    // Listen events
    for (const listInstance of listInstances) {
      listInstance.restartSliders = true;
      listInstance.restartIx ||= restartIx;
      listInstance.items = [];

      listInstance.on('additems', async (newItems) => {
        listInstance.items = [];

        createSlidesFromItems(newItems);
        await restartSliders();
      });
    }
  }

  await restartSliders();

  return {
    result: listInstances,
    destroy() {
      for (const listInstance of listInstances) listInstance.destroy();
    },
  };
};

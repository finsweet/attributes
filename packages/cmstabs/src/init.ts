import type { CMSList } from '@finsweet/attributes-cmscore';
import { importCMSCore } from '@finsweet/attributes-cmscore';
import { restartWebflow } from '@finsweet/ts-utils';

import { collectPopulateData } from './actions/collect';
import { populateTabsFromLists } from './actions/populate';
import { ATTRIBUTE, getSelector } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

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

  window.fsAttributes[ATTRIBUTE].resolve?.(listInstances);

  return listInstances;
};

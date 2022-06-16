import type { CMSList } from '@finsweet/attributes-cmscore';
import { importCMSCore } from '@finsweet/attributes-cmscore';
import { restartWebflow } from '@finsweet/ts-utils';

import { collectPopulateData } from './collect';
import { ATTRIBUTE, getSelector } from './constants';
import { populateSliderFromLists } from './populate';

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
      });
    }
  }

  const modulesToRestart: Parameters<typeof restartWebflow>['0'] = ['slider'];
  if (restartIx) modulesToRestart.push('ix2');

  await restartWebflow(modulesToRestart);

  window.fsAttributes[ATTRIBUTE].resolve?.(listInstances);

  return listInstances;
};

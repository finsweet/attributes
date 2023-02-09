import { restartWebflow } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_SLIDER_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { importCMSCore } from '$global/import';
import type { CMSList } from '$packages/cmscore';

import { collectPopulateData } from './collect';
import { getSelector } from './constants';
import { populateSliderFromLists } from './populate';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

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

  return finalizeAttribute(CMS_SLIDER_ATTRIBUTE, listInstances, () => {
    for (const listInstance of listInstances) listInstance.destroy();
  });
};

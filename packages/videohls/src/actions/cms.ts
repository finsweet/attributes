import { importCMSCore } from '$global/import';

import { CMS_LOAD_LIST_ELEMENT_SELECTOR } from '../utils/constants';
import { initVideoHLS } from './video';

/**
 * Listens for newly added videos via CMS Load and inits an hls.js instance for them.
 *
 * **Important:** Mutates the passed {@link hlsInstances} array by pushing the new instances to it.
 *
 */
export const listenCMSLoad = async () => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return;

  const listInstances = cmsCore.createCMSListInstances([CMS_LOAD_LIST_ELEMENT_SELECTOR]);

  listInstances.map((listInstance) => {
    listInstance.on('renderitems', (addedItems) => {
      for (const { element } of addedItems) {
        const videos = element.querySelectorAll('video');
        videos.forEach(initVideoHLS);
      }
    });
  });
};

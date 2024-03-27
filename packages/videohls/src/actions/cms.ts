import { CMS_LOAD_LIST_ELEMENT_SELECTOR } from '../utils/constants';
import { initVideoHLS } from './video';

/**
 * Listens for newly added videos via CMS Load and inits an hls.js instance for them.
 *
 * **Important:** Mutates the passed {@link hlsInstances} array by pushing the new instances to it.
 *
 */
export const listenCMSLoad = async () => {
  // @ts-expect-error TODO: Support fs-list
  const listInstances = createCMSListInstances([CMS_LOAD_LIST_ELEMENT_SELECTOR]);

  // @ts-expect-error TODO: Support fs-list
  listInstances.map((listInstance) => {
    // @ts-expect-error TODO: Support fs-list
    listInstance.on('renderitems', (addedItems) => {
      for (const { element } of addedItems) {
        const videos = element.querySelectorAll('video');
        videos.forEach(initVideoHLS);
      }
    });
  });
};

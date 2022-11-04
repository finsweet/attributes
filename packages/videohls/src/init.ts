import { CMS_ATTRIBUTE_ATTRIBUTE, VIDEO_HLS_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { listenCMSLoad } from './actions/cms';
import { initVideoHLS } from './actions/video';
import { hlsInstancesStore } from './utils/stores';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const videos = document.querySelectorAll('video');
  videos.forEach(initVideoHLS);

  await listenCMSLoad();

  return finalizeAttribute(VIDEO_HLS_ATTRIBUTE, hlsInstancesStore, () => {
    for (const [, hlsInstance] of hlsInstancesStore) hlsInstance.destroy();
    hlsInstancesStore.clear();
  });
};

import { CMS_ATTRIBUTE_ATTRIBUTE, CMS_LOAD_ATTRIBUTE, SOCIAL_SHARE_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import type { CMSList } from '$packages/cmscore/src';

import { listenTriggerClicks } from './actions/trigger';
import { createSocialShareInstances } from './factory';
import { stores } from './utils/stores';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  // Init global click listener
  const removeClickListener = listenTriggerClicks();

  // create button for static items
  createSocialShareInstances();

  // create button from dynamic list in memory
  const listInstances: CMSList[] = (await awaitAttributesLoad(CMS_LOAD_ATTRIBUTE))[0] || [];

  for (const { items } of listInstances) {
    for (const { element } of items) {
      createSocialShareInstances(element);
    }
  }

  return finalizeAttribute(SOCIAL_SHARE_ATTRIBUTE, stores, () => {
    removeClickListener();
  });
};

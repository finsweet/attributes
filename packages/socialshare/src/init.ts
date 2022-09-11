import { CMS_LOAD_ATTRIBUTE, SOCIAL_SHARE_ATTRIBUTE } from 'global/constants/attributes';
import type { CMSList } from 'packages/cmscore/src';

import { listenTriggerClicks } from './actions/trigger';
import { createSocialShareInstances } from './factory';
import { stores } from './utils/stores';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<void> => {
  // Init global click listener
  listenTriggerClicks();

  // create button for static items
  createSocialShareInstances();

  // create button from dynamic list in memory
  const listInstances: CMSList[] = (await window.fsAttributes[CMS_LOAD_ATTRIBUTE]?.loading) || [];

  for (const { items } of listInstances) {
    for (const { element } of items) {
      createSocialShareInstances(element);
    }
  }

  window.fsAttributes[SOCIAL_SHARE_ATTRIBUTE].resolve?.(stores);
};

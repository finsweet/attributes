import { type FsAttributeInit, waitAttributeLoaded, waitWebflowReady } from '@finsweet/attributes-utils';

import { listenTriggerClicks } from './actions';
import { createSocialShareInstances } from './factory';
import { stores } from './utils';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  // Init global click listener
  const removeClickListener = listenTriggerClicks();

  // create button for static items
  createSocialShareInstances();

  // create button from dynamic list in memory
  // @ts-expect-error TODO: Support fs-list
  const listInstances: CMSList[] = (await waitAttributeLoaded('cmsload')) || [];

  for (const { items } of listInstances) {
    for (const { element } of items) {
      createSocialShareInstances(element);
    }
  }

  return {
    result: stores,
    destroy() {
      removeClickListener();
    },
  };
};

import type { CMSList } from '@finsweet/attributes-cmscore';
import { type FsAttributeInit, waitAttributeLoaded, waitWebflowReady } from '@finsweet/attributes-utils';

import { listenTriggerClicks } from './actions/trigger';
import { createCalendarEventInstances } from './factory';
import { stores } from './utils';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  // click listener callback
  const removeClickListener = listenTriggerClicks();

  // create button for static items
  createCalendarEventInstances();

  // create button from dynamic list in memory
  const listInstances: CMSList[] = (await waitAttributeLoaded('cmsload')) || [];

  for (const { items } of listInstances) {
    for (const { element } of items) {
      createCalendarEventInstances(element);
    }
  }

  return {
    result: stores,
    destroy() {
      removeClickListener();
    },
  };
};

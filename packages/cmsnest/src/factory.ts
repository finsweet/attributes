import type { CMSCore, CMSList } from '$packages/cmscore';

import { getNestSources } from './actions/collect';
import { listenListEvents } from './actions/events';
import { populateNestedCollections } from './actions/populate';
import { ATTRIBUTES } from './utils/constants';

/**
 * Inits the nesting.
 * @param listInstance A {@link CMSList} instance.
 * @param cmsCore The {@link CMSCore} import.
 */
export const initListNesting = async (listInstance: CMSList, cmsCore: CMSCore): Promise<void> => {
  // Collect the collections to nest
  const nestSources = getNestSources(cmsCore);
  if (!nestSources.size) return;

  // Listen for events
  listenListEvents(listInstance, nestSources, cmsCore);

  // Get caching options
  const disableCache = listInstance.getAttribute(ATTRIBUTES.cacheItems.key) === ATTRIBUTES.cacheItems.values.false;
  if (disableCache) {
    listInstance.cacheItems = false;
  }

  // Nest existing items
  const existingItems = [...listInstance.items];

  await Promise.all(
    existingItems.map((item) => populateNestedCollections(item, nestSources, listInstance.cacheItems, cmsCore))
  );
  await listInstance.emitSerial('nestinitialitems', existingItems);
};

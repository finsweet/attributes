import { Debug } from '@finsweet/ts-utils';

import { CMSList } from '$cms/cmscore/src';
import { CMSCore } from '$cms/cmscore/src/types';

import { getNestSources } from './actions/collect';
import { listenListEvents } from './actions/events';
import { populateNestedCollections } from './actions/populate';

/**
 * Inits the nesting.
 * @param listInstance A {@link CMSList} instance.
 * @param cmsCore The {@link CMSCore} import.
 */
export const initListNesting = async (listInstance: CMSList, cmsCore: CMSCore): Promise<void> => {
  // Collect the collections to nest
  const nestSources = getNestSources(cmsCore);
  if (!nestSources.size) {
    Debug.alert(`No collections to nest found for the list nº ${listInstance.index}`, 'info');
    return;
  }

  // Listen for events
  listenListEvents(listInstance, nestSources, cmsCore);

  // Nest existing items
  const existingItems = [...listInstance.items];

  await Promise.all(existingItems.map((item) => populateNestedCollections(item, nestSources, cmsCore)));
  await listInstance.emitSerial('nestinitialitems', existingItems);
};

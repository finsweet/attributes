import type { CMSList, CMSCore } from '@finsweet/attributes-cmscore';

import type { NestSources } from '../utils/types';
import { populateNestedCollections } from './populate';

/**
 * Listen for events emitted from the `CMSList` instances.
 * @param listInstance A {@link CMSList} instance.
 * @param nestSources The stored {@link NestSources}.
 * @param cmsCore The {@link CMSCore} import.
 */
export const listenListEvents = (listInstance: CMSList, nestSources: NestSources, cmsCore: CMSCore) => {
  listInstance.on('shouldnest', async (newItems) => {
    await Promise.all(newItems.map((newItem) => populateNestedCollections(newItem, nestSources, cmsCore)));
  });
};

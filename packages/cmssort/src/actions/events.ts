import type { CMSList } from '@finsweet/attributes-cmscore';

import { getSettingAttributeName } from '../utils/selectors';
import type { SortItemsCallback } from '../utils/types';

/**
 * Reacts to a `CMSList` events.
 * @param listInstance A {@link CMSList} instance.
 * @param sortItems A callback to sort the items in the currently selected order.
 */
export const listenListEvents = (listInstance: CMSList, sortItems: SortItemsCallback) => {
  listInstance.on('shouldcollectprops', async (newItems) => {
    for (const item of newItems)
      item.collectProps({ fieldKey: getSettingAttributeName('field'), typeKey: getSettingAttributeName('type') });
  });

  listInstance.on('shouldsort', async () => {
    await sortItems(true);
  });
};

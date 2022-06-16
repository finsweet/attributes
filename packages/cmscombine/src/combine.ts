import type { CMSItem, CMSList } from '@finsweet/attributes-cmscore';

/**
 * Adds an array of items to a defined `CMSList` target.
 * @param targetListInstance The {@link CMSList} instance target.
 * @param items An array of {@link CMSItem} instances to add.
 */
export const combineItemsToTarget = async (targetListInstance: CMSList, items: CMSItem[]) => {
  const elementsToAdd = items.map(({ element }) => element);

  await targetListInstance.addItems(elementsToAdd);
};

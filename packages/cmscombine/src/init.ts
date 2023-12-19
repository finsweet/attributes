import { createCMSListInstances } from '@finsweet/attributes-cmscore';
import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { collectCombineData } from './actions/collect';
import { combineItemsToTarget } from './actions/combine';
import { getElementSelector, queryElement } from './utils/selectors';
import type { CombineData } from './utils/types';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const listInstances = createCMSListInstances([getElementSelector('list')]);

  const combineData = collectCombineData(listInstances);

  // Combine the lists
  const combineLists = await Promise.all(combineData.map(initListsCombine));

  return {
    result: combineLists,
    destroy() {
      for (const listInstance of listInstances) listInstance.destroy();
    },
  };
};

/**
 * Combines the existing items from the source lists to the target list.
 * Listens for `additems` events on the source lists to combine those new items too.
 * @param combineData The {@link CombineData} array.
 * @returns The target {@link CMSList} instance.
 */
const initListsCombine = async ({ lists, target, instanceIndex }: CombineData) => {
  // Get items count element
  if (!target.itemsCount) {
    const itemsCount = queryElement('items-count', { instanceIndex });
    if (itemsCount) target.addItemsCount(itemsCount);
  }

  // Listen events
  for (const listInstance of lists) {
    listInstance.on('additems', async (newItems) => await combineItemsToTarget(target, newItems));
  }

  // Combine items
  await Promise.all(
    lists.map(async ({ wrapper, items }) => {
      wrapper.remove();

      await combineItemsToTarget(target, items);
    })
  );

  return target;
};

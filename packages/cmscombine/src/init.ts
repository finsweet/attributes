import type { CMSList } from '@finsweet/attributes-cmscore';
import { importCMSCore } from '@finsweet/attributes-cmscore';

import { collectCombineData } from './collect';
import { combineItemsToTarget } from './combine';
import { ATTRIBUTE, getSelector, queryElement } from './constants';
import type { CombineData } from './types';

/**
 * Inits the attribute.
 */
export const init = async (): Promise<CMSList[]> => {
  const cmsCore = await importCMSCore();
  if (!cmsCore) return [];

  const listInstances = cmsCore.createCMSListInstances([getSelector('element', 'list', { operator: 'prefixed' })]);

  const combineData = collectCombineData(listInstances);

  // Combine the lists
  const combineLists = await Promise.all(combineData.map(initListsCombine));

  window.fsAttributes[ATTRIBUTE].resolve?.(combineLists);

  return combineLists;
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
    const itemsCount = queryElement<HTMLElement>('itemsCount', { instanceIndex });
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

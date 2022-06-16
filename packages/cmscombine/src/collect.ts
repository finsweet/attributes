import type { CMSList } from '@finsweet/attributes-cmscore';

import { ATTRIBUTES } from './constants';
import type { CombineData } from './types';

/**
 * Collects the Combine Lists + Target.
 * @param listInstances The existing {@link CMSList} instances on the page.
 * @returns A {@link CombineData} array.
 */
export const collectCombineData = (listInstances: CMSList[]): CombineData[] => {
  let populateData: CombineData[] = [];

  // Collect the combine data
  for (const listInstance of listInstances) {
    const instanceIndex = listInstance.getInstanceIndex(ATTRIBUTES.element.key);

    // Make sure the populate data exists
    // Default the target to the first collected list
    const data = (populateData[instanceIndex || 0] ||= { lists: [], target: listInstance, instanceIndex });

    if (listInstance !== data.target) data.lists.push(listInstance);
  }

  // Filter out invalid instances
  populateData = populateData.filter((data) => data && data.lists.length);

  return populateData;
};

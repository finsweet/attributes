import type { CMSList } from '@finsweet/attributes-cmscore';

import { getInstanceIndex } from '../utils/selectors';
import type { CombineData } from '../utils/types';

/**
 * Collects the Combine Lists + Target.
 * @param listInstances The existing {@link CMSList} instances on the page.
 * @returns A {@link CombineData} array.
 */
export const collectCombineData = (listInstances: CMSList[]): CombineData[] => {
  let populateData: CombineData[] = [];

  // Collect the combine data
  for (const listInstance of listInstances) {
    const instanceIndex = getInstanceIndex(listInstance.listOrWrapper);

    // Make sure the populate data exists
    // Default the target to the first collected list
    // instanceIndex is addressed in upcoming fs-list attribute: https://github.com/finsweet/attributes/blob/a581ad330770be7de1f15a5bf7b1c751f4db50d7/packages/list/src/components/List.ts#L183-L184
    // added this to fix lint issues for now
    const matchedData = populateData.find((item) => item.instanceIndex === instanceIndex);
    const data = matchedData || populateData[0] || { lists: [], target: listInstance, instanceIndex };

    if (listInstance !== data.target) data.lists.push(listInstance);
  }

  // Filter out invalid instances
  populateData = populateData.filter((data) => data && data.lists.length);

  return populateData;
};

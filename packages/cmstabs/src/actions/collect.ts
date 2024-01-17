import type { CMSList } from '@finsweet/attributes-cmscore';
import { TABS_CSS_CLASSES, type TabsElement } from '@finsweet/attributes-utils';

import { getElementSelector, getInstanceIndex, hasAttributeValue } from '../utils/selectors';
import type { PopulateData } from '../utils/types';

/**
 * Collects the source lists and the Tabs target to populate.
 * @param listInstances An array of {@link CMSList} instances.
 * @returns A {@link PopulateData} array.
 */
export const collectPopulateData = (listInstances: CMSList[]): [PopulateData[], boolean] => {
  let populateData: PopulateData[] = [];
  let restartIx = false;

  for (const listInstance of listInstances) {
    const { listOrWrapper } = listInstance;

    const instanceIndex = getInstanceIndex(listOrWrapper);

    // Get the slider target
    const tabsElement = document.querySelector<TabsElement>(
      `.${TABS_CSS_CLASSES.tabs}${getElementSelector('tabs', { instanceIndex })}`
    );

    if (!tabsElement) continue;

    // Make sure the populate data exists
    const matchedData = populateData.find((item) => item.instanceIndex === instanceIndex);
    const data = matchedData || populateData[0] || { listInstances: [], tabsElement };

    // Collect the list
    data.listInstances.push(listInstance);

    // Check if IX2 must be restarted
    restartIx ||= hasAttributeValue(tabsElement, 'resetix', 'true');
    restartIx ||= hasAttributeValue(listOrWrapper, 'resetix', 'true');
  }

  // Filter out invalid instances
  populateData = populateData.filter((data) => data && data.listInstances.length);

  return [populateData, restartIx];
};

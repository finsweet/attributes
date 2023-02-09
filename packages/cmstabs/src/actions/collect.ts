import type { TabsElement } from '@finsweet/ts-utils';
import { TABS_CSS_CLASSES } from '@finsweet/ts-utils';

import type { CMSList } from '$packages/cmscore';

import { ATTRIBUTES, getSelector } from '../utils/constants';
import type { PopulateData } from '../utils/types';

const {
  element: { key: elementKey },
  resetIx: { key: resetIxKey, values: resetIxValues },
} = ATTRIBUTES;

/**
 * Collects the source lists and the Tabs target to populate.
 * @param listInstances An array of {@link CMSList} instances.
 * @returns A {@link PopulateData} array.
 */
export const collectPopulateData = (listInstances: CMSList[]): [PopulateData[], boolean] => {
  let populateData: PopulateData[] = [];
  let restartIx = false;

  for (const listInstance of listInstances) {
    const instanceIndex = listInstance.getInstanceIndex(elementKey);

    // Get the slider target
    const tabsElement = document.querySelector<TabsElement>(
      `.${TABS_CSS_CLASSES.tabs}${getSelector('element', 'tabs', { instanceIndex })}`
    );

    if (!tabsElement) continue;

    // Make sure the populate data exists
    const data = (populateData[instanceIndex || 0] ||= { listInstances: [], tabsElement });

    // Collect the list
    data.listInstances.push(listInstance);

    // Check if IX2 must be restarted
    restartIx ||= tabsElement.getAttribute(resetIxKey) === resetIxValues.true;
    restartIx ||= listInstance.getAttribute(resetIxKey) === resetIxValues.true;
  }

  // Filter out invalid instances
  populateData = populateData.filter((data) => data && data.listInstances.length);

  return [populateData, restartIx];
};

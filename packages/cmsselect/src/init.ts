import type { CMSList } from '@finsweet/attributes-cmscore';
import {
  type FinsweetAttributeInit,
  isHTMLSelectElement,
  waitAttributeLoaded,
  waitWebflowReady,
} from '@finsweet/attributes-utils';

import { populateSelectElement } from './actions/populate';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const targetElements = queryAllElements('select');

  const listInstancesSet: Set<CMSList> = new Set();

  for (const targetElement of targetElements) {
    if (!isHTMLSelectElement(targetElement)) continue;

    const selectElementListInstances = populateSelectElement(targetElement);

    for (const listIntance of selectElementListInstances) {
      listInstancesSet.add(listIntance);
    }
  }

  const listInstances = [...listInstancesSet];

  await waitAttributeLoaded('cmsload');

  return {
    result: listInstances,
    destroy() {
      for (const listInstance of listInstances) listInstance.destroy();
    },
  };
};

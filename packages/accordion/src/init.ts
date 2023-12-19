import type { CMSList } from '@finsweet/attributes-cmscore';
import { type FinsweetAttributeInit, waitAttributeLoaded, waitWebflowReady } from '@finsweet/attributes-utils';

import { queryAllAccordions } from './actions/query';
import { initAccordionGroups } from './factory';
import { CMS_LOAD_LIST_ELEMENT_SELECTOR } from './utils/constants';

export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  // Get all accordions
  let accordions = queryAllAccordions();

  // Wait for CMSLoad to render all accordions, only if required
  const usesCMSLoad = accordions.some((accordion) => accordion.closest(CMS_LOAD_LIST_ELEMENT_SELECTOR));
  if (usesCMSLoad) {
    const listInstances: CMSList[] = await waitAttributeLoaded('cmsload');

    accordions = queryAllAccordions(listInstances);
  }

  // Init all groups
  const groupsData = initAccordionGroups(accordions);

  // Ensure fs-a11y is present
  window.finsweetAttributes.import('a11y');

  // Finalize
  return {
    result: groupsData,
    destroy() {
      for (const { accordions } of groupsData) {
        for (const { controls } of accordions) controls.destroy();
      }
    },
  };
};

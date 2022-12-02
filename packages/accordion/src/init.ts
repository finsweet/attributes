import { ACCORDION_ATTRIBUTE, CMS_ATTRIBUTE_ATTRIBUTE, CMS_LOAD_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { importA11Y } from '$global/import/a11y';
import type { CMSList } from '$packages/cmscore/src';

import { queryAllAccordions } from './actions/query';
import { initAccordionGroups } from './factory';
import { CMS_LOAD_LIST_ELEMENT_SELECTOR } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  // Get all accordions
  let accordions = queryAllAccordions();

  // Wait for CMSLoad to render all accordions, only if required
  const usesCMSLoad = accordions.some((accordion) => accordion.closest(CMS_LOAD_LIST_ELEMENT_SELECTOR));
  if (usesCMSLoad) {
    const listInstances: CMSList[] = (await awaitAttributesLoad(CMS_LOAD_ATTRIBUTE))[0];

    accordions = queryAllAccordions(listInstances);
  }

  // Init all groups
  const groupsData = initAccordionGroups(accordions);

  // Ensure fs-a11y is present
  importA11Y();

  // Finalize
  return finalizeAttribute(ACCORDION_ATTRIBUTE, groupsData, () => {
    for (const { accordions } of groupsData) {
      for (const { controls } of accordions) controls.destroy();
    }
  });
};

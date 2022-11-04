import { ACCORDION_ATTRIBUTE, CMS_ATTRIBUTE_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { importA11Y } from '$global/import/a11y';

import { initAccordionGroups } from './factory';
import { queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const accordions = queryElement<HTMLElement>('accordion', { operator: 'prefixed', all: true });

  const groupsData = initAccordionGroups(accordions);

  importA11Y();

  return finalizeAttribute(ACCORDION_ATTRIBUTE, groupsData, () => {
    for (const { accordions } of groupsData) {
      for (const { controls } of accordions) controls.destroy();
    }
  });
};

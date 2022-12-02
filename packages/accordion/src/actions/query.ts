import type { CMSList } from '$packages/cmscore/src';

import { queryElement } from '../utils/constants';

/**
 * @returns All the accordion elements on the page.
 * @param listInstances The `cmsload` instances. If provided, all the loaded accordions will also be added.
 */
export const queryAllAccordions = (listInstances?: CMSList[]) => {
  const allAccordions = queryAccordions();

  if (!listInstances) return allAccordions;

  const allAccordionsSet = new Set(allAccordions);

  for (const { items } of listInstances) {
    for (const { element } of items) {
      const accordions = queryAccordions(element);

      for (const accordion of accordions) {
        allAccordionsSet.add(accordion);
      }
    }
  }

  return [...allAccordionsSet];
};

/**
 * @returns All the accordion children of an element.
 * @param scope
 */
const queryAccordions = (scope?: Element) =>
  queryElement<HTMLElement>('accordion', { scope, operator: 'prefixed', all: true });

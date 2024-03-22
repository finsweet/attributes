import { queryAllElements } from '../utils/selectors';

/**
 * @returns All the accordion elements on the page.
 * @param listInstances The `cmsload` instances. If provided, all the loaded accordions will also be added.
 */
// @ts-expect-error TODO: Support fs-list
export const queryAllAccordions = (listInstances?: CMSList[]) => {
  const allAccordions = queryAllElements('accordion');

  if (!listInstances) return allAccordions;

  const allAccordionsSet = new Set(allAccordions);

  for (const { items } of listInstances) {
    for (const { element } of items) {
      const accordions = queryAllElements('accordion', { scope: element });

      for (const accordion of accordions) {
        allAccordionsSet.add(accordion);
      }
    }
  }

  return [...allAccordionsSet];
};

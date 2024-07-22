import type { List } from '@finsweet/attributes-list';
import { isNotEmpty, waitAttributeLoaded } from '@finsweet/attributes-utils';

import { initAccordionGroup } from '../factory';
import { getClosestElement, queryAllElements } from '../utils/selectors';
import type { AccordionGroupData } from '../utils/types';

/**
 * Inits the accordions' groups functionalities on lists.
 * @param groupsData
 * @returns A cleanup function.
 */
export const initListAccordions = async (groupsData: AccordionGroupData[]) => {
  const lists: List[] = await waitAttributeLoaded('list');

  const cleanups = lists.map((list) => {
    return list.hooks.afterRender.result.subscribe((items = []) => {
      for (const { element } of items) {
        const accordions = [
          ...queryAllElements('accordion', { scope: element }),
          getClosestElement(element, 'accordion'),
        ].filter(isNotEmpty);

        for (const accordion of accordions) {
          initAccordionGroup(accordion, groupsData);
        }
      }
    });
  });

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
};

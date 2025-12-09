import { type FinsweetAttributeInit, isNotEmpty, waitWebflowReady } from '@finsweet/attributes-utils';

import { createListInstance, initList } from './factory';
import { getCMSElementSelector } from './utils/dom';
import { getInstance, queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const listElements = queryAllElements('list');
  const lists = listElements
    .map((listElement) => {
      const listSelector = getCMSElementSelector('list');

      const parentLists: Element[] = [];

      let parentList = listElement.parentElement?.closest(listSelector);
      while (parentList) {
        parentLists.push(parentList);
        parentList = parentList.parentElement?.closest(listSelector);
      }

      const isNestedList = parentLists.length > 0;
      if (isNestedList) {
        const listInstance = getInstance(listElement);

        const parentListHasInstance = parentLists.some((parentList) => {
          const parentListInstance = getInstance(parentList);
          return listInstance === parentListInstance;
        });

        // Nested lists can only be initialized if
        // they have a different instance than their parent lists
        // to avoid unexpected behaviors
        if (parentListHasInstance) return;
      }

      return createListInstance(listElement);
    })
    .filter(isNotEmpty);

  const cleanups = lists.map(initList);

  return {
    result: lists,
    destroy() {
      for (const cleanup of cleanups) {
        cleanup();
      }
    },
  };
};

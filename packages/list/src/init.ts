import {
  type FinsweetAttributeInit,
  getCMSElementSelector,
  isNotEmpty,
  waitWebflowReady,
} from '@finsweet/attributes-utils';

import { createListInstance, initList } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const listElements = queryAllElements('list');
  const lists = listElements
    .map((listElement) => {
      const listSelector = getCMSElementSelector('list');
      const parentList = listElement.parentElement?.closest(listSelector);

      // TODO: We don't support nested CMS lists for now,
      // but we may want to revisit this in the future
      const isNestedList = !!parentList && listElement !== parentList;
      if (isNestedList) return;

      return createListInstance(listElement);
    })
    .filter(isNotEmpty);

  const cleanups = lists.map(initList);

  console.log(lists);

  return {
    result: lists,
    destroy() {
      for (const cleanup of cleanups) {
        cleanup();
      }
    },
  };
};

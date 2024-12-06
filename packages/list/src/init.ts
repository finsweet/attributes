import { type FinsweetAttributeInit, isNotEmpty, waitWebflowReady } from '@finsweet/attributes-utils';

import { createListInstance, initList } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const listElements = queryAllElements('list');
  const lists = listElements.map(createListInstance).filter(isNotEmpty);

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

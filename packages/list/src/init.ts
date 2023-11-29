import { type FsAttributeInit, isNotEmpty, waitWebflowReady } from '@finsweet/attributes-utils';

import { createListInstance, initList } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const listElements = queryAllElements('list');
  const lists = listElements.map(createListInstance).filter(isNotEmpty);

  lists.map(initList);

  return {};
};

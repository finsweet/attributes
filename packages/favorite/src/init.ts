import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';
import { getCollectionElements } from '@finsweet/attributes-utils';

import { initFavoriteItem } from './actions/favorite';
import { queryAllElements } from './utils';

/**
 * Inits list items count.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const listReferences = queryAllElements('list');

  for (const listReference of listReferences) {
    const listElement = getCollectionElements(listReference, 'list') || listReference;

    for (const item of listElement.children) {
      initFavoriteItem(item);
    }
  }

  return {
    result: listReferences,
  };
};

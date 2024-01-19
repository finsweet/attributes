import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';
import { getCollectionElements } from '@finsweet/attributes-utils';

import { initMasonryLayout } from './actions/masonry';
import { queryAllElements } from './utils';

/**
 * Inits masonry functionality.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const listReferences = queryAllElements('list');

  for (const listReference of listReferences) {
    const listElement = getCollectionElements(listReference, 'list') || listReference;
    listElement.style.position = 'relative';
    initMasonryLayout(listElement);
  }

  return {
    result: listReferences,
  };
};

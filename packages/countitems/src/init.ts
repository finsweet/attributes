import { type FsAttributeInit, getCollectionElements, waitWebflowReady } from '@finsweet/attributes-utils';

import { getInstance, queryAllElements, queryElement } from './utils/selectors';

/**
 * Inits list items count.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const listReferences = queryAllElements('list');

  for (const listReference of listReferences) {
    const listElement = getCollectionElements(listReference, 'list') || listReference;

    const instance = getInstance(listReference);

    const valueTarget = queryElement('value', { instance });
    if (!valueTarget) continue;

    const collectionItemsCount = listElement.children.length;

    valueTarget.textContent = `${collectionItemsCount}`;
  }

  return {
    result: listReferences,
  };
};

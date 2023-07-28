import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';
import { getCollectionElements } from '@finsweet/attributes-utils';

import { initFavoriteItem } from './actions/favorite';
import { setListItems } from './actions/list';
import { queryAllElements, queryElement } from './utils';

/**
 * Inits favorite functionality.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const listReferences = queryAllElements('list');
  const favoriteList = queryElement('list-favorite');
  const listItem = favoriteList?.querySelector<HTMLElement>('[role="listitem"]');
  listItem?.remove();

  for (const listReference of listReferences) {
    const listElement = getCollectionElements(listReference, 'list') || listReference;

    for (const item of listElement.children) {
      initFavoriteItem(item);
    }
  }

  if (favoriteList && listItem) {
    setListItems(favoriteList, listItem);

    window.addEventListener('localStorageUpdate', () => {
      setListItems(favoriteList, listItem);
    });
  }

  return {
    result: listReferences,
  };
};

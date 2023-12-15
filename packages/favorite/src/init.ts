import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';
import { getCollectionElements } from '@finsweet/attributes-utils';

import { addItemToList } from './actions/add';
import { initFavoriteItem } from './actions/favorite';
import { removeItemFromList } from './actions/remove';
import { getAttribute, queryAllElements, queryElement, REMOVE_FROM_LOCAL_STORAGE } from './utils';
import { ADD_TO_LOCAL_STORAGE } from './utils';

/**
 * Inits favorite functionality.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  let operationInProgress = false;

  const removeQueue: CustomEvent<string>[] = [];

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
    const loader = queryElement('loader');
    if (loader) loader.style.display = 'none';
    const key = getAttribute(favoriteList, 'key') || 'favorite';
    const counter = queryElement('counter');
    const empty = queryElement('empty');
    const message = queryElement('message');
    const localStorageData = JSON.parse(String(localStorage.getItem(key))) || [];
    if (counter) counter.innerHTML = localStorageData.length;
    if (empty && localStorageData.length) empty.style.display = 'none';

    for (const link of localStorageData) {
      if (loader) loader.style.display = 'block';
      await addItemToList(favoriteList, listItem, link, key);
      if (loader) loader.style.display = 'none';
    }

    window.addEventListener(ADD_TO_LOCAL_STORAGE, async (event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        if (loader) loader.style.display = 'block';
        try {
          operationInProgress = true;
          await addItemToList(favoriteList, listItem, customEvent.detail, key);
        } finally {
          operationInProgress = false;

          if (removeQueue.length > 0) {
            const nextRemoveEvent = removeQueue.shift();
            if (nextRemoveEvent) await removeItemFromList(favoriteList, nextRemoveEvent.detail);
          }
          if (loader) loader.style.display = 'none';

          const localStorageData = JSON.parse(String(localStorage.getItem(key))) || [];
          if (counter) {
            counter.innerHTML = localStorageData.length;
          }
          if (message) {
            message.style.display = 'block';
            setTimeout(() => {
              message.style.display = 'none';
            }, 2000);
          }
          if (empty) {
            if (localStorageData.length) {
              empty.style.display = 'none';
            } else {
              empty.style.display = 'flex';
            }
          }
        }
      }
    });

    window.addEventListener(REMOVE_FROM_LOCAL_STORAGE, async (event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        if (operationInProgress) {
          removeQueue.push(customEvent);
        } else {
          if (loader) loader.style.display = 'block';
          try {
            await removeItemFromList(favoriteList, customEvent.detail);
          } finally {
            if (loader) loader.style.display = 'none';
          }
        }
        const localStorageData = JSON.parse(String(localStorage.getItem(key))) || [];
        if (counter) {
          counter.innerHTML = localStorageData.length;
        }
        if (empty) {
          if (localStorageData.length) {
            empty.style.display = 'none';
          } else {
            empty.style.display = 'flex';
          }
        }
      }
    });

    return {
      result: listReferences,
    };
  }
};

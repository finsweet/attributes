import { getCollectionElements } from '@finsweet/attributes-utils';

import { queryAllElements } from '../utils';

/**
 * Initializes the functionality to hide elements based on the presence of items in a collection list.
 * @param list - The parent element containing the collection of items.
 * @returns A MutationObserver instance that monitors changes in the collection list.
 */
export const initHideEmpty = (list: HTMLElement) => {
  const hideElements = queryAllElements('hide');

  const checkCollectionList = () => {
    const collectionItemsCount = getCollectionElements(list, 'items').length;

    hideElements.forEach((element) => {
      if (collectionItemsCount === 0) {
        element.style.display = 'none';
      } else {
        element.style.display = '';
      }
    });
  };

  checkCollectionList();

  const observer = new MutationObserver(checkCollectionList);

  const observerConfig = {
    childList: true,
    subtree: true,
  };

  observer.observe(list, observerConfig);

  return observer;
};

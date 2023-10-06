import {
  ADD_TO_LOCAL_STORAGE,
  getAttribute,
  queryElement,
  REMOVE_FROM_LOCAL_STORAGE,
  removeFromLocalStorage,
  updateElementsClass,
} from '../utils';
import { addToLocalStorage } from '../utils';

/**
 * Initializes the favorite item by setting up event listeners for the like button and handling its state.
 * @param listItem - The HTML element representing a single item in the favorite list.
 */
export const initFavoriteItem = (listItem: Element) => {
  const likeButton = queryElement('like', { scope: listItem });
  if (!likeButton) return;
  const linkElement = listItem.querySelector('a');
  const hrefValue = linkElement?.getAttribute('href');
  if (!hrefValue) return;
  const likeActiveClass = getAttribute(likeButton, 'active');
  const key = getAttribute(likeButton, 'key') || 'favorite';
  const elementsToUpdate = listItem.querySelectorAll('[fs-favorite-active]');

  const handleFavoriteButtonClick = async () => {
    const favorites = JSON.parse(String(localStorage.getItem(key))) || [];
    if (favorites.includes(hrefValue)) {
      removeFromLocalStorage(hrefValue, key);
    } else {
      addToLocalStorage(hrefValue, key);
    }
  };

  if (likeActiveClass) {
    updateElementsClass(elementsToUpdate, hrefValue, likeActiveClass, key);
  }
  likeButton.addEventListener('click', handleFavoriteButtonClick);
  window.addEventListener(ADD_TO_LOCAL_STORAGE, () => {
    if (likeActiveClass) {
      updateElementsClass(elementsToUpdate, hrefValue, likeActiveClass, key);
    }
  });

  window.addEventListener(REMOVE_FROM_LOCAL_STORAGE, () => {
    if (likeActiveClass) {
      updateElementsClass(elementsToUpdate, hrefValue, likeActiveClass, key);
    }
  });
};

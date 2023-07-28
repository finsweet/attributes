import { getAttribute, queryElement, updateButtonState } from '../utils';
import { updateLocalStorage } from '../utils';

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

  const handleFavoriteButtonClick = () => {
    updateLocalStorage(hrefValue, key);
  };

  if (likeActiveClass) {
    updateButtonState(likeButton, hrefValue, likeActiveClass, key);
  }
  likeButton.addEventListener('click', handleFavoriteButtonClick);
  window.addEventListener('localStorageUpdate', () => {
    if (likeActiveClass) {
      updateButtonState(likeButton, hrefValue, likeActiveClass, key);
    }
  });
};

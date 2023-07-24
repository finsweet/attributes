import { getInstanceIndex } from '../utils';
import { saveToLocalStorage } from '../utils';

export const initFavoriteItem = (listitem: Element) => {
  function handleFavoriteButtonClick(event: any) {
    const listItemDiv = event.target.closest('.w-dyn-item');

    const linkElement = listItemDiv.querySelector('a.heading-style-h3');

    if (linkElement) {
      const hrefValue = linkElement.getAttribute('href');
      saveToLocalStorage(hrefValue);
    }
  }

  listitem.addEventListener('click', handleFavoriteButtonClick);
};

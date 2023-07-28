import { fetchItemDocument, getAttribute, queryElement, removeFromLocalStorage } from '../utils';

/**
 * Populates a favorite list with items from localStorage.
 * @param favoriteList - The HTMLElement representing the favorite list.
 * @param listItem - The HTMLElement representing the template item to be cloned and populated with data.
 */
export const setListItems = async (favoriteList: HTMLElement, listItem: HTMLElement) => {
  const key = getAttribute(favoriteList, 'key') || 'favorite';
  const localStorageData = JSON.parse(String(localStorage.getItem(key))) || [];
  favoriteList.innerHTML = '';

  for (const link of localStorageData) {
    const itemDocument = await fetchItemDocument(link);
    if (itemDocument) {
      const elementsWithData = itemDocument.querySelectorAll('[fs-favorite-field]');
      const elementData = {} as { [key: string]: string };
      elementsWithData.forEach((element) => {
        const attributeValue = element.getAttribute('fs-favorite-field');
        if (!attributeValue) return;
        let content;
        if (element.tagName.toLowerCase() === 'img') {
          content = element.getAttribute('src') || '';
        } else {
          content = element.textContent?.trim() || '';
        }
        elementData[attributeValue] = content;
      });

      if (listItem) {
        const elementCopy = listItem.cloneNode(true) as HTMLElement;
        const fieldsWithContent = elementCopy.querySelectorAll('[fs-favorite-field]');
        const removeButton = queryElement('remove', { scope: elementCopy });
        fieldsWithContent.forEach((element) => {
          const fieldName = element.getAttribute('fs-favorite-field');
          if (!fieldName) return;
          switch (element.tagName.toLowerCase()) {
            case 'img':
              element.setAttribute('srcset', elementData[fieldName]);
              element.setAttribute('src', elementData[fieldName]);
              break;

            case 'a':
              element.setAttribute('href', link);
              element.textContent = elementData[fieldName] || '';
              break;

            default:
              element.textContent = elementData[fieldName] || '';
              break;
          }
        });
        removeButton?.addEventListener('click', () => removeFromLocalStorage(link, key));
        favoriteList.appendChild(elementCopy);
      }
    }
  }
};

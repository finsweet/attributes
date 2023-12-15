import { fetchPageDocument } from '@finsweet/attributes-utils';

import { queryElement, removeFromLocalStorage } from '../utils';

/**
 * Adds an item to a favorite list using a provided template and data.
 * @param favoriteList - The container element for the favorite list.
 * @param itemTemplate - The template element used for each item.
 * @param link - The link associated with the item.
 * @param key - The key for identifying the item in local storage.
 */
export const addItemToList = async (
  favoriteList: HTMLElement,
  itemTemplate: HTMLElement,
  link: string,
  key: string
) => {
  const itemDocument = await fetchPageDocument(link);
  if (itemDocument) {
    const elementsWithData = itemDocument.querySelectorAll('[fs-favorite-field]');
    const elementData = {} as { [key: string]: string[] };
    elementsWithData.forEach((element) => {
      const attributeValue = element.getAttribute('fs-favorite-field');
      if (!attributeValue) return;
      let content;
      if (element.tagName.toLowerCase() === 'img') {
        content = element.getAttribute('src') || '';
      } else {
        content = element.textContent?.trim() || '';
      }
      if (!elementData[attributeValue]) {
        elementData[attributeValue] = [content];
      } else {
        elementData[attributeValue].push(content);
      }
    });

    if (itemTemplate) {
      const elementCopy = itemTemplate.cloneNode(true) as HTMLElement;
      const fieldsWithContent = Array.from(elementCopy.querySelectorAll('[fs-favorite-field]'));
      const removeButton = queryElement('remove', { scope: elementCopy });

      if (!fieldsWithContent.some((element) => element.querySelector('a'))) {
        const linkElement = elementCopy.querySelector('a');
        if (linkElement) {
          fieldsWithContent.push(linkElement);
        }
      }

      fieldsWithContent.forEach((element) => {
        const fieldName = element.getAttribute('fs-favorite-field');
        switch (element.tagName.toLowerCase()) {
          case 'img':
            if (fieldName) {
              element.setAttribute('srcset', elementData[fieldName][0]);
              element.setAttribute('src', elementData[fieldName][0]);
            }
            break;

          case 'a':
            if (fieldName) {
              element.textContent = elementData[fieldName][0] || '';
            }
            element.setAttribute('href', link);
            break;

          default:
            if (fieldName) {
              element.innerHTML = elementData[fieldName]?.map((item) => item.trim()).join('<br>') || 'No items found';
            }
            break;
        }
      });
      removeButton?.addEventListener('click', () => removeFromLocalStorage(link, key));
      favoriteList.appendChild(elementCopy);
    }
  }
};

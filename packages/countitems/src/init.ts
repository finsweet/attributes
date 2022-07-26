import { getCollectionElements } from '@finsweet/ts-utils';
import { COUNT_ITEMS_ATTRIBUTE } from '@global/constants/attributes';
import { getInstanceIndex } from '@global/helpers';

import { ATTRIBUTES, getSelector, queryElement } from './constants';

/**
 * Inits list items count.
 */
export const init = (): NodeListOf<Element> => {
  const listReferences = document.querySelectorAll(getSelector('element', 'list', { operator: 'prefixed' }));

  for (const listReference of listReferences) {
    const listElement = getCollectionElements(listReference, 'list') || listReference;

    const instanceIndex = getInstanceIndex(listReference, ATTRIBUTES.element.key);

    const valueTarget = queryElement('value', { instanceIndex });
    if (!valueTarget) continue;

    const collectionItemsCount = listElement.children.length;

    valueTarget.textContent = `${collectionItemsCount}`;
  }

  window.fsAttributes[COUNT_ITEMS_ATTRIBUTE].resolve?.(listReferences);

  return listReferences;
};

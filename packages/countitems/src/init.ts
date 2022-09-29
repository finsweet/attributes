import { getCollectionElements } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, COUNT_ITEMS_ATTRIBUTE } from '$global/constants/attributes';
import { getInstanceIndex } from '$global/helpers';

import { ATTRIBUTES, getSelector, queryElement } from './constants';

/**
 * Inits list items count.
 */
export const init = async (): Promise<NodeListOf<Element>> => {
  await window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE]?.loading;

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

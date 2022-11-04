import { CMS_ATTRIBUTE_ATTRIBUTE, COUNT_ITEMS_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';
import { getInstanceIndex, getCollectionElements } from '$global/helpers';

import { ATTRIBUTES, queryElement } from './constants';

/**
 * Inits list items count.
 */
export const init = async (): Promise<Element[]> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const listReferences = queryElement('list', { operator: 'prefixed', all: true });

  for (const listReference of listReferences) {
    const listElement = getCollectionElements(listReference, 'list') || listReference;

    const instanceIndex = getInstanceIndex(listReference, ATTRIBUTES.element.key);

    const valueTarget = queryElement('value', { instanceIndex });
    if (!valueTarget) continue;

    const collectionItemsCount = listElement.children.length;

    valueTarget.textContent = `${collectionItemsCount}`;
  }

  return finalizeAttribute(COUNT_ITEMS_ATTRIBUTE, listReferences);
};

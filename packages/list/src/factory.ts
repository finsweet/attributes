import { type CollectionListWrapperElement } from '@finsweet/attributes-utils';

import { List } from './components/List';
import { initListSorting } from './sort';
import { getCMSElementSelector, getCollectionElements } from './utils/dom';
import { queryAllElements } from './utils/selectors';
import { listInstancesStore } from './utils/store';

/**
 * Creates a new `CMSList` instance, making sure there are no already existing instances on the page.
 * @param referenceElement The `Collection List` reference element.
 * @returns A new `CMSList` instance, if instantiation was valid.
 */
export const createListInstance = (referenceElement: HTMLElement): List | undefined => {
  const wrapper = getCollectionElements(referenceElement, 'wrapper');
  if (!wrapper) return;

  const existingListInstance = listInstancesStore.get(wrapper);
  if (existingListInstance) return existingListInstance;

  const pageListElements = [
    ...document.querySelectorAll<CollectionListWrapperElement>(getCMSElementSelector('wrapper')),
  ];

  const index = pageListElements.indexOf(wrapper);
  if (index === -1) return;

  const listInstance = new List(wrapper, index);
  listInstancesStore.set(wrapper, listInstance);

  return listInstance;
};

export const initList = (list: List) => {
  const sortTriggers = queryAllElements('sort-trigger', { instanceIndex: list.instanceIndex });

  if (sortTriggers.length) {
    initListSorting(list, sortTriggers);
  }
};

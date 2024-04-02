import { type CollectionListWrapperElement } from '@finsweet/attributes-utils';

import { initListCombine } from './combine';
import { List } from './components/List';
import { initListFiltering } from './filter';
import { initListLoading } from './load';
import { initListSliders } from './slider';
import { initListSorting } from './sort';
import { getCMSElementSelector, getCollectionElements } from './utils/dom';
import { getAttribute, queryAllElements, queryElement } from './utils/selectors';
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

/**
 * Initializes the list features.
 * @param list
 * @returns A cleanup function.
 */
export const initList = (list: List) => {
  const { instance } = list;

  const filtersForm = queryElement('filters', { instance });
  const sortTriggers = queryAllElements('sort-trigger', { instance });
  const loadMode = getAttribute(list.listOrWrapper, 'loadmode', true);
  const combineTarget = getAttribute(list.listOrWrapper, 'combine');
  const sliders = queryAllElements('slider', { instance });

  const cleanups = new Set<() => void>();

  if (filtersForm instanceof HTMLFormElement) {
    const cleanup = initListFiltering(list, filtersForm);
    if (cleanup) {
      cleanups.add(cleanup);
    }
  }

  if (sortTriggers.length) {
    const cleanup = initListSorting(list, sortTriggers);
    if (cleanup) {
      cleanups.add(cleanup);
    }
  }

  if (loadMode) {
    const cleanup = initListLoading(list, loadMode);
    if (cleanup) {
      cleanups.add(cleanup);
    }
  }

  if (combineTarget) {
    const cleanup = initListCombine(list, combineTarget);
    if (cleanup) {
      cleanups.add(cleanup);
    }
  }

  if (sliders.length) {
    initListSliders(list, sliders);
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }

    cleanups.clear();
  };
};

import { type CollectionListWrapperElement } from '@finsweet/attributes-utils';

import { initListCombine } from './combine';
import { List } from './components/List';
import { initListFiltering } from './filter';
import { initListLoading } from './load';
import { initListNest } from './nest';
import { initPrevNext } from './prevnext';
import { initListSelects } from './select';
import { initListSliders } from './slider';
import { initListSorting } from './sort';
import { initStaticItems } from './static';
import { initListTabs } from './tabs';
import { getCMSElementSelector, getCollectionElements } from './utils/dom';
import { getAttribute, getElementSelector, queryAllElements, queryElement } from './utils/selectors';
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

  const items = list.items.value;

  const cleanups = new Set<(() => void) | undefined>();

  // Filter
  const filtersForm = queryElement('filters', { instance });
  if (filtersForm instanceof HTMLFormElement) {
    const cleanup = initListFiltering(list, filtersForm);
    cleanups.add(cleanup);
  }

  // Sort
  const sortTriggers = queryAllElements('sort-trigger', { instance });
  if (sortTriggers.length) {
    const cleanup = initListSorting(list, sortTriggers);
    cleanups.add(cleanup);
  }

  // Load
  const load = getAttribute(list.listOrWrapper, 'load', { filterInvalid: true });
  if (load) {
    const cleanup = initListLoading(list, load);
    cleanups.add(cleanup);
  }

  // Combine
  const combine = getAttribute(list.listOrWrapper, 'combine');
  if (combine) {
    const cleanup = initListCombine(list, combine);
    cleanups.add(cleanup);
  }

  // Nest
  const nest = items.length ? !!queryElement('nest-target', { scope: items[0].element }) : false;
  if (nest) {
    const cleanup = initListNest(list);
    cleanups.add(cleanup);
  }

  // Static Items
  const listSelector = getElementSelector('list', { instance });
  const itemSelector = getElementSelector('item', { instance });
  const staticItemSelector = `${itemSelector}:not(${listSelector} ${itemSelector})`;
  const staticItems = document.querySelectorAll<HTMLElement>(staticItemSelector);
  if (staticItems.length) {
    const cleanup = initStaticItems(list, [...staticItems]);
    cleanups.add(cleanup);
  }

  // Sliders
  const sliders = queryAllElements('slider', { instance });
  if (sliders.length) {
    initListSliders(list, sliders);
  }

  // Tabs
  const tabs = queryAllElements('tabs', { instance });
  if (tabs.length) {
    initListTabs(list, tabs);
  }

  // Selects
  const selects = queryAllElements('select', { instance });
  if (selects.length) {
    initListSelects(list, selects);
  }

  // Prev/Next
  const previousItemTarget = queryElement('previous-item', { instance });
  const nextItemTarget = queryElement('next-item', { instance });
  if (previousItemTarget || nextItemTarget) {
    initPrevNext(list, previousItemTarget, nextItemTarget);
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup?.();
    }

    cleanups.clear();
  };
};

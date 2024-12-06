import { addListener, normalizePropKey } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { sortListItems } from './sort';
import type { SortingDirection } from './types';

/**
 * Inits sorting on an `HTMLSelectElement`.
 * @param selectElement The {@link HTMLSelectElement}.
 * @param list The {@link List} instance.
 */
export const initHTMLSelect = (selectElement: HTMLSelectElement, list: List) => {
  let [sortKey, sortDirection] = getSortingParams(selectElement.value);

  list.addHook('sort', (items) => sortListItems(items, sortKey, sortDirection));

  // Sort on change
  const changeCleanup = addListener(selectElement, 'change', async () => {
    [sortKey, sortDirection] = getSortingParams(selectElement.value);

    await list.triggerHook('sort');
  });

  // Sort items if a sortKey exists on page load
  if (sortKey) list.triggerHook('sort');

  // Prevent submit events on the form
  const form = selectElement.closest('form');

  const submitCleanup = addListener(form, 'submit', handleFormSubmit);

  return () => {
    changeCleanup();
    submitCleanup();
  };
};

/**
 * Handles `submit` events on the parent form of the `HTMLSelect` element.
 * @param e The `submit` event.
 */
const handleFormSubmit = (e: Event) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  return false;
};

/**
 * Extracts the `sortKey` and `direction` from a Select element value.
 * @param value The Select element value.
 */
const getSortingParams = (value: string) => {
  let sortKey: string;
  let sortDirection: SortingDirection;

  if (value.endsWith('-asc')) {
    sortDirection = 'asc';
    sortKey = value.slice(0, -4);
  } else if (value.endsWith('-desc')) {
    sortDirection = 'desc';
    sortKey = value.slice(0, -5);
  } else {
    sortDirection = 'asc';
    sortKey = value;
  }

  sortKey = normalizePropKey(sortKey);

  return [sortKey, sortDirection] as const;
};

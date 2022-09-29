import type { CMSList } from '$packages/cmscore';
import { normalizePropKey } from '$packages/cmscore';

import { sortListItems } from '../actions/sort';
import type { SortingDirection, SortItemsCallback } from '../utils/types';

/**
 * Inits sorting on an `HTMLSelectElement`.
 * @param selectElement The {@link HTMLSelectElement}.
 * @param listInstance The {@link CMSList} instance.
 */
export const initHTMLSelect = async (selectElement: HTMLSelectElement, listInstance: CMSList) => {
  // Prevent submit events on the form
  const form = selectElement.closest('form');
  form?.addEventListener('submit', handleFormSubmit);

  let [sortKey, direction] = getSortingParams(selectElement.value);
  let sorting = false;

  /**
   * Sorts the items based on the current selected `sortKey` and `direction`.
   * @param addingItems Defines if new items are being added.
   * In that case, the rendering responsibilities are handled by another controller.
   */
  const sortItems: SortItemsCallback = async (addingItems) => {
    await sortListItems(listInstance, { direction, sortKey, addingItems });
  };

  // Store the original CMS Order
  selectElement.addEventListener('change', async () => {
    if (sorting) return;

    sorting = true;

    [sortKey, direction] = getSortingParams(selectElement.value);

    await sortItems();

    sorting = false;
  });

  // Sort items if a sortKey exists on page load
  if (sortKey) await sortItems();

  return sortItems;
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
  let direction: SortingDirection;

  if (value.endsWith('-asc')) {
    direction = 'asc';
    sortKey = value.slice(0, -4);
  } else if (value.endsWith('-desc')) {
    direction = 'desc';
    sortKey = value.slice(0, -5);
  } else {
    direction = 'asc';
    sortKey = value;
  }

  sortKey = normalizePropKey(sortKey);

  return [sortKey, direction] as const;
};

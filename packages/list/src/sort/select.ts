import { addListener } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { hasAttributeValue } from '../utils/selectors';
import type { Sorting, SortingDirection } from './types';

/**
 * Inits sorting on an `HTMLSelectElement`.
 * @param selectElement The {@link HTMLSelectElement}.
 * @param list The {@link List} instance.
 */
export const initHTMLSelect = (selectElement: HTMLSelectElement, list: List) => {
  const handleSelect = (interacted = false) => {
    list.sorting.value = getSortingParams(selectElement.value, interacted);
  };

  // Sort on change
  const changeCleanup = addListener(selectElement, 'change', () => handleSelect(true));

  // Sort on init
  handleSelect();

  // Prevent submit events on the form
  const form = selectElement.closest('form');

  const allowSubmit = hasAttributeValue(selectElement, 'allowsubmit', 'true');

  const submitCleanup = allowSubmit ? addListener(form, 'submit', handleFormSubmit) : undefined;

  return () => {
    changeCleanup();
    submitCleanup?.();
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
 * @param interacted Indicates if the user interacted with the select element.
 */
const getSortingParams = (value: string, interacted = false): Sorting => {
  let fieldKey: string;
  let direction: SortingDirection;

  if (value.endsWith('-asc')) {
    direction = 'asc';
    fieldKey = value.slice(0, -4);
  } else if (value.endsWith('-desc')) {
    direction = 'desc';
    fieldKey = value.slice(0, -5);
  } else {
    direction = 'asc';
    fieldKey = value;
  }

  return { fieldKey, direction, interacted };
};

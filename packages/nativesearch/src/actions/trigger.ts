import { addListener, getFormFieldValue } from '@finsweet/attributes-utils';

import { debounce } from '../utils/debounce';
import { queryElement } from '../utils/selectors';
import { searchWebflow } from './search';

/**
 * Listens to keyup events on the input element and triggers the search
 * @param inputElement The input element
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/search_event
 */
export const listenSearchInput = async () => {
  const searchElement = queryElement<HTMLInputElement>('input');
  if (!searchElement) return;

  // Listen for input events
  const inputCleanup = addListener(
    searchElement,
    'input',
    debounce(() => searchWebflow(getFormFieldValue(searchElement)))
  );

  return inputCleanup;
};

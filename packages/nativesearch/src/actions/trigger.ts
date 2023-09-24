import { addListener, getFormFieldValue } from '@finsweet/attributes-utils';

import { debounce } from '../utils/debounce';
import { searchWebflow } from './search';

/**
 * Listens to keyup events on the input element and triggers the search
 * @param inputElement The input element
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/search_event
 */
export const listenSearchInputEvents = (inputElement: HTMLInputElement) => {
  // Listen for input events
  addListener(
    inputElement,
    'input',
    debounce(() => searchWebflow(getFormFieldValue(inputElement)))
  );
};

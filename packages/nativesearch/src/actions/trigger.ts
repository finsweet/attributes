import { addListener, getFormFieldValue } from '@finsweet/attributes-utils';

import { debounce } from '../utils/debounce';
import { searchWebflow } from './search';

/**
 * Listens to keyup events on the input element and triggers the search
 * @param inputElement The input element
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/search_event
 */
export const listenSearchInput = ({
  searchElement,
  loader,
  results,
}: {
  searchElement: HTMLInputElement;
  loader: {
    show: () => void;
    hide: () => void;
  };
  results: {
    show: () => void;
    hide: () => void;
    display: (htmlString: string) => void;
  };
}) => {
  if (!searchElement) return;

  // Listen for input events
  const inputCleanup = addListener(
    searchElement,
    'input',
    debounce(() => searchWebflow({ query: getFormFieldValue(searchElement), loader, results }))
  );

  return inputCleanup;
};

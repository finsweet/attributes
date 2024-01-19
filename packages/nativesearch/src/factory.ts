import { getFormFieldValue } from '@finsweet/attributes-utils';

import { listenSearchInput } from './actions/trigger';
import { SEARCH_RESULTS_WRAPPER_CLASS } from './utils/constants';

/**
 * Creates a native search instance
 * @param inputElement The input element to listen to
 * @param loaderElement The loader element to show/hide
 * @param resultsElement The results element to show/hide
 * @param customClass The custom class to add to the results element
 * @returns The native search instance
 */
export const createNativeSearchInstance = ({
  inputElement,
  loaderElement,
  resultsElement,
  customClass,
}: {
  inputElement: HTMLInputElement;
  loaderElement: HTMLElement;
  resultsElement: HTMLElement;
  customClass?: string | null;
}) => {
  const search = {
    query: getFormFieldValue(inputElement),
  };
  const loader = {
    show() {
      // set display to block
      loaderElement.style.display = 'block';
    },
    hide() {
      // set display to none
      loaderElement.style.display = 'none';
    },
  };
  const results = {
    // set display to block
    show() {
      resultsElement.style.display = 'block';
    },

    // set display to none
    hide() {
      resultsElement.style.display = 'none';
    },

    /**
     * Displays the search results in the results element by parsing the html string to a DOM element
     * @param htmlString The html string to display
     * @returns void (the results are displayed in the results element)
     */
    display(htmlString: string) {
      // Parse the html string to a DOM element and get the results wrapper
      const htmlDOM = new DOMParser().parseFromString(htmlString, 'text/html');

      // Get the results wrapper
      const resultsWrapper = htmlDOM.querySelector(`.${SEARCH_RESULTS_WRAPPER_CLASS}`);

      // Append the results to the results element
      resultsElement.innerHTML = resultsWrapper?.innerHTML ?? 'Unable to display results!';
    },

    addClass(className: string) {
      resultsElement.classList.add(className);
    },
  };

  // Add custom class
  if (customClass) resultsElement.classList.add(customClass);

  // hide results wrapper
  results.hide();

  // listen to search input
  const cleanup = listenSearchInput({ searchElement: inputElement, loader, results });

  return {
    search,
    loader,
    results,
    destroy() {
      cleanup?.();
    },
  };
};

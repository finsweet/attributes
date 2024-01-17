import {
  type FinsweetAttributeInit,
  isHTMLElement,
  isHTMLInputElement,
  isNotEmpty,
  waitWebflowReady,
} from '@finsweet/attributes-utils';

import { createNativeSearchInstance } from './factory';
import { getAttribute, queryAllElements, queryElement } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  // Get all search input elements
  const searchInputElements = queryAllElements('input');

  const searchInstances = searchInputElements
    .map((inputElement) => {
      if (!isHTMLInputElement(inputElement)) return;

      const searchComponent = inputElement.parentElement as HTMLElement;
      const customClass = getAttribute(searchComponent, 'addclass');
      const loaderElement = queryElement<HTMLElement>('loader', { scope: searchComponent });
      const resultsElement = queryElement<HTMLElement>('results', { scope: searchComponent });

      if (!isHTMLElement(loaderElement) || !isHTMLElement(resultsElement)) return;

      // Create options object
      const searchInstance = createNativeSearchInstance({
        inputElement,
        loaderElement,
        resultsElement,
        customClass,
      });

      return searchInstance;
    })
    .filter(isNotEmpty);

  return {
    result: searchInstances,
    destroy() {
      for (const searchInstance of searchInstances) searchInstance.destroy();
    },
  };
};

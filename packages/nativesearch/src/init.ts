import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { listenSearchInput } from './actions/trigger';
import { results } from './utils/results';
import { queryElement } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  // hide the results element
  results.hide();

  // Listen to input events
  const cleanup = listenSearchInput();

  // get the search input query
  // show the loader element
  // search natively for the results
  // show the results element and append results
  // hide the loader element if there are no results

  // Get the input element
  const inputElement = queryElement<HTMLInputElement>('input');

  // Get the results element
  const resultsElement = queryElement('results');
  if (!resultsElement) return;
  resultsElement.style.display = 'none';

  // Get the loader element
  const loaderElement = queryElement('loader');

  if (!inputElement) return;

  return {
    result: {
      inputElement,
      resultsElement,
      loaderElement,
    },
    destroy() {
      cleanup();
    },
  };
};

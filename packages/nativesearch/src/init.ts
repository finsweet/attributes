import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { listenSearchInputEvents } from './actions/trigger';
import { queryElement } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  // Get the input element
  const inputElement = queryElement<HTMLInputElement>('input');

  // Get the results element
  const resultsElement = queryElement('results');

  // Get the loader element
  const loaderElement = queryElement('loader');

  if (!inputElement) return;

  // Listen to change events on the input
  const cleanup = () => listenSearchInputEvents(inputElement);

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

import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';
import { getCollectionElements } from '@finsweet/attributes-utils';

import { initMasonryLayout } from './actions/masonry';
import { queryAllElements } from './utils';
import { preloadImages } from './utils';

/**
 * Inits masonry functionality.
 */
export const init: FsAttributeInit = async () => {
  const originalStates = new Map();

  await waitWebflowReady();

  const listReferences = queryAllElements('list');
  let resizeTimeout;

  // Reset function to restore the original state
  const resetToOriginalState = (element) => {
    const originalState = originalStates.get(element);
    if (originalState) {
      element.innerHTML = originalState.innerHTML;
    }
  };

  for (const listReference of listReferences) {
    const listElement = getCollectionElements(listReference, 'list') || listReference;

    // Store the original state of the element
    originalStates.set(listElement, {
      innerHTML: listElement.innerHTML,
    });

    listElement.style.position = 'relative';

    preloadImages(listElement, () => {
      initMasonryLayout(listElement);
    });
  }

  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      for (const listReference of listReferences) {
        const listElement = getCollectionElements(listReference, 'list') || listReference;

        resetToOriginalState(listElement);

        preloadImages(listElement, () => {
          initMasonryLayout(listElement);
        });
      }
    }, 500);
  };

  window.addEventListener('resize', handleResize);

  return {
    result: listReferences,
  };
};

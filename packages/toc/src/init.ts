import {
  type FinsweetAttributeInit,
  isNotEmpty,
  restartWebflow,
  waitAttributeLoaded,
  waitWebflowReady,
} from '@finsweet/attributes-utils';

import { scrollToAnchor } from './actions/scroll';
import { initTOCInstance } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();
  await waitAttributeLoaded('richtext');

  const contentsElements = queryAllElements('contents');

  const cleanups = contentsElements.map(initTOCInstance).filter(isNotEmpty);

  // URL hash Anchor
  scrollToAnchor();

  if (cleanups.length) {
    await restartWebflow();
  }

  // TODO: Finish API
  return {
    destroy() {
      for (const cleanup of cleanups) cleanup();
    },
  };
};

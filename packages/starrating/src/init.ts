import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { listenEvents } from './actions/events';
import { initStarRatingGroup } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const groups = queryAllElements('group');
  groups.forEach(initStarRatingGroup);

  const cleanups = listenEvents();

  return {
    result: groups,
    destroy() {
      for (const cleanup of cleanups) cleanup();
    },
  };
};

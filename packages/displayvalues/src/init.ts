import { type FinsweetAttributeInit, isFormField, waitWebflowReady } from '@finsweet/attributes-utils';

import { collectTargets } from './actions/collect';
import { listenEvents } from './actions/events';
import { syncValue } from './actions/sync';
import { queryAllElements } from './utils/selectors';

/**
 * Inits click events mirroring.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const sourceElements = queryAllElements('source');

  for (const sourceElement of sourceElements) {
    if (!isFormField(sourceElement)) continue;

    collectTargets(sourceElement);
    syncValue(sourceElement);
  }

  const removeListeners = listenEvents();

  return {
    result: sourceElements,
    destroy() {
      removeListeners();
    },
  };
};

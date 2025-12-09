import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initClickTriggers } from './click';
import { initDisplayTriggers } from './display';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the scrolldisable functionalities.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const preserveScrollTargets = queryAllElements('preserve');

  const destroyClickListeners = initClickTriggers(preserveScrollTargets);
  const destroyDisplayListeners = initDisplayTriggers(preserveScrollTargets);

  return {
    destroy() {
      destroyClickListeners();
      destroyDisplayListeners();
    },
  };
};

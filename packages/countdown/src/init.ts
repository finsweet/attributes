import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initCountDown } from './actions/countdown';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const countdownTimerElements = queryAllElements('complete-hide');

  const countdownTimersInstances = countdownTimerElements.map(initCountDown);

  return {
    result: countdownTimersInstances,
    destroy() {
      for (const countdownInstance of countdownTimersInstances) countdownInstance?.stop();
    },
  };
};

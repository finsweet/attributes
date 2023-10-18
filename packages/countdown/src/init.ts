import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initCountDown } from './actions/countdown';
import { getSettingSelector } from './utils';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  const countdownTimerElements = Array.from(document.querySelectorAll<HTMLElement>(getSettingSelector('date')));

  const countdownTimersInstances = countdownTimerElements.map(initCountDown);

  return {
    result: countdownTimersInstances,
    destroy() {
      for (const countdownInstance of countdownTimersInstances) countdownInstance?.stop();
    },
  };
};

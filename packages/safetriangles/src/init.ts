import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initSafeTriangle } from './factory';
import { getAttribute, getInstance, hasAttributeValue, queryAllElements, queryElement } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const triggers = queryAllElements('trigger');
  const cleanups: Array<() => void> = [];

  triggers.forEach((trigger) => {
    const instance = getInstance(trigger);

    const target = queryElement('target', { instance });
    if (!target) return;

    const delay = getAttribute(trigger, 'delay') ?? 100;
    const debug = hasAttributeValue(trigger, 'debug', 'true');

    const cleanup = initSafeTriangle(trigger, target, {
      delay,
      debug,
    });

    cleanups.push(cleanup);
  });

  return {
    result: triggers,
    destroy() {
      for (const cleanup of cleanups) cleanup();
    },
  };
};

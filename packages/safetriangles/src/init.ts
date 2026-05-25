import { DROPDOWN_CSS_CLASSES, type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

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
    let target: HTMLElement | null = null;

    const webflowDropdown = trigger.closest(`.${DROPDOWN_CSS_CLASSES.dropdown}`);
    if (webflowDropdown) {
      trigger = webflowDropdown.querySelector(`.${DROPDOWN_CSS_CLASSES.dropdownToggle}`) || trigger;
      target = webflowDropdown.querySelector(`.${DROPDOWN_CSS_CLASSES.dropdownList}`);
    } else {
      target ||= queryElement('target', { instance: getInstance(trigger) });
    }

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

import { addListener, type FinsweetAttributeInit, isElement } from '@finsweet/attributes-utils';

import { getLightboxElement } from './actions/collect';
import { moveElementToBody } from './actions/move';
import { getAttribute, getElementSelector } from './utils/selectors';

// State
let restoreUntransformedElement: (() => void) | undefined;

export const init: FinsweetAttributeInit = () => {
  const clickCleanup = addListener(window, 'click', async ({ target }) => {
    if (!isElement(target)) return;

    // Get the trigger
    const toggleTrigger = target.closest(getElementSelector('trigger-toggle'));

    const onTrigger =
      !restoreUntransformedElement && toggleTrigger
        ? toggleTrigger
        : target.closest(getElementSelector('trigger-open'));

    const offTrigger =
      restoreUntransformedElement && toggleTrigger
        ? toggleTrigger
        : target.closest(getElementSelector('trigger-close'));

    const trigger = onTrigger || offTrigger;

    if (!trigger) return;

    if ((onTrigger && restoreUntransformedElement) || (offTrigger && !restoreUntransformedElement)) return;

    // Get the timeout value
    const timeoutValue = getAttribute(trigger, 'wait');
    const timeout = timeoutValue ? parseInt(timeoutValue) : undefined;

    // ON
    if (onTrigger) {
      const lightboxElement = getLightboxElement(onTrigger);
      if (!lightboxElement) return;

      restoreUntransformedElement = moveElementToBody(lightboxElement, timeout);

      return;
    }

    // OFF
    if (!restoreUntransformedElement) return;

    window.setTimeout(() => {
      restoreUntransformedElement?.();
      restoreUntransformedElement = undefined;
    }, timeout);
  });

  return {
    destroy() {
      clickCleanup();
    },
  };
};

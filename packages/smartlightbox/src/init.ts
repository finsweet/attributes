import { addListener, isElement } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, SMART_LIGHTBOX_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { getLightboxElement } from './actions/collect';
import { moveElementToBody } from './actions/move';
import { ATTRIBUTES, getSelector } from './utils/constants';

// State
let restoreUntransformedElement: (() => void) | undefined;

/**
 * Inits untransform handler.
 * The CSS style is injected to the `<head>`.
 * The click events are listened for the triggers.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const clickCleanup = addListener(window, 'click', async ({ target }) => {
    if (!isElement(target)) return;

    // Get the trigger
    const toggleTrigger = target.closest(getSelector('element', 'toggle', { operator: 'prefixed' }));

    const onTrigger =
      !restoreUntransformedElement && toggleTrigger
        ? toggleTrigger
        : target.closest(getSelector('element', 'open', { operator: 'prefixed' }));

    const offTrigger =
      restoreUntransformedElement && toggleTrigger
        ? toggleTrigger
        : target.closest(getSelector('element', 'close', { operator: 'prefixed' }));

    const trigger = onTrigger || offTrigger;

    if (!trigger) return;

    if ((onTrigger && restoreUntransformedElement) || (offTrigger && !restoreUntransformedElement)) return;

    // Get the timeout value
    const timeoutValue = trigger.getAttribute(ATTRIBUTES.wait.key);
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

  return finalizeAttribute(SMART_LIGHTBOX_ATTRIBUTE, undefined, () => clickCleanup());
};

import { addListener, isElement, isHTMLElement } from '@finsweet/ts-utils';

import { ATTRIBUTES, getSelector } from './constants';
import { disableScrolling, enableScrolling, findFirstScrollableElement, isScrollingDisabled } from './scroll';

/**
 * Inits listening for click triggers.
 * @param preserveScrollTargets The targets where scrolling must be preserved.
 */
export const initClickTriggers = (preserveScrollTargets: NodeListOf<Element>): (() => void) => {
  const clickCleanup = addListener(window, 'click', ({ target }) => {
    if (!isElement(target)) return;

    // Get the trigger
    const toggleTrigger = target.closest(getSelector('element', 'toggle'));

    const disableTrigger = toggleTrigger || target.closest(getSelector('element', 'disable'));
    const enableTrigger = toggleTrigger || target.closest(getSelector('element', 'enable'));

    const trigger = disableTrigger || enableTrigger;
    if (!trigger) return;

    // Make sure the media query is valid
    const mediaToMatch = trigger.getAttribute(ATTRIBUTES.matchMedia.key);
    if (mediaToMatch && !window.matchMedia(mediaToMatch).matches) return;

    // Handle action
    if (isScrollingDisabled() && enableTrigger) enableScrolling();
    else if (!isScrollingDisabled() && isHTMLElement(disableTrigger)) {
      for (const target of new Set([
        ...preserveScrollTargets,
        findFirstScrollableElement(disableTrigger) || disableTrigger,
      ])) {
        disableScrolling(target);
      }
    }
  });

  return clickCleanup;
};

import { addListener, isHTMLElement } from '@finsweet/attributes-utils';

import { disableScrolling, enableScrolling, findFirstScrollableElement, isScrollingDisabled } from './scroll';
import { getAttribute, getElementSelector } from './utils/selectors';

/**
 * Inits listening for click triggers.
 * @param preserveScrollTargets The targets where scrolling must be preserved.
 */
export const initClickTriggers = (preserveScrollTargets: HTMLElement[]): (() => void) => {
  const clickCleanup = addListener(window, 'click', ({ target }) => {
    if (!isHTMLElement(target)) return;

    // Get the trigger
    const toggleTrigger = target.closest(getElementSelector('toggle'));

    const disableTrigger = toggleTrigger || target.closest(getElementSelector('disable'));
    const enableTrigger = toggleTrigger || target.closest(getElementSelector('enable'));

    const trigger = disableTrigger || enableTrigger;
    if (!trigger) return;

    // Make sure the media query is valid
    const mediaToMatch = getAttribute(trigger, 'media');
    if (mediaToMatch && !window.matchMedia(mediaToMatch).matches) return;

    // Handle action
    if (isScrollingDisabled() && enableTrigger) {
      enableScrolling();
    } else if (!isScrollingDisabled() && isHTMLElement(disableTrigger)) {
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

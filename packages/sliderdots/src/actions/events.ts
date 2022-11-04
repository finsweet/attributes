import { addListener, isElement, simulateEvent } from '@finsweet/ts-utils';

import { getSelector } from '../utils/constants';
import type { DotsRelationship } from '../utils/types';

/**
 * Listens for click events in the custom slider nav.
 * @param customSliderNav The `Custom Slider Nav`.
 * @param dotsRelationship A {@link DotsRelationship} array.
 *
 * @returns A callback to remove the event listener.
 */
export const listenClickEvents = (customSliderNav: HTMLElement, dotsRelationship: DotsRelationship) => {
  const clickCleanup = addListener(customSliderNav, 'click', ({ target }) => {
    if (!isElement(target)) return;

    const customDotTarget = target.closest(getSelector('element', 'content', { operator: 'prefixed' }));
    if (!customDotTarget) return;

    const { dot } = dotsRelationship.find(({ customDot }) => customDot === customDotTarget) || {};

    if (dot) simulateEvent(dot, 'click');
  });

  return clickCleanup;
};

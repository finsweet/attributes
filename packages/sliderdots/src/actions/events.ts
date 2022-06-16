import { simulateEvent } from '@finsweet/ts-utils';

import { getSelector } from '../utils/constants';
import type { DotsRelationship } from '../utils/types';

/**
 * Listens for click events in the custom slider nav.
 * @param customSliderNav The `Custom Slider Nav`.
 * @param dotsRelationship A {@link DotsRelationship} array.
 */
export const listenClickEvents = (customSliderNav: HTMLElement, dotsRelationship: DotsRelationship) => {
  customSliderNav.addEventListener('click', ({ target }) => {
    if (!(target instanceof Element)) return;

    const customDotTarget = target.closest(getSelector('element', 'content', { operator: 'prefixed' }));
    if (!customDotTarget) return;

    const { dot } = dotsRelationship.find(({ customDot }) => customDot === customDotTarget) || {};

    if (dot) simulateEvent(dot, 'click');
  });
};

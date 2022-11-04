import { isHTMLElement, SliderNavElement } from '@finsweet/ts-utils';

import type { DotsRelationship } from '../utils/types';
import { syncDotsProperties } from './sync';

/**
 * Replicates all actions between the original `Slider Dots` and the `Custom Slider Dots`.
 * @param sliderNav The original `Slider Nav`.
 * @param dotsRelationship A {@link DotsRelationship} array.
 * @param activeCSSClass The CSS class used for the `active` state.
 *
 * @returns The MutationObserver.
 */
export const observeSliderNav = (
  sliderNav: SliderNavElement,
  dotsRelationship: DotsRelationship,
  activeCSSClass: string
) => {
  const callback: MutationCallback = (mutations) => {
    for (const { target } of mutations) {
      if (!isHTMLElement(target)) continue;

      const relationshipData = dotsRelationship.find(({ dot }) => dot === target);
      if (!relationshipData) continue;

      syncDotsProperties(relationshipData, activeCSSClass);
    }
  };

  const options: MutationObserverInit = {
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  };

  const observer = new MutationObserver(callback);
  observer.observe(sliderNav, options);

  return observer;
};

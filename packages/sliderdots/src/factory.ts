import {
  SLIDER_CSS_CLASSES,
  type SliderElement,
  type SliderNavElement,
  waitAttributeLoaded,
} from '@finsweet/attributes-utils';

import { listenClickEvents } from './actions/events';
import { observeSliderNav } from './actions/observe';
import { populateSliderDots } from './actions/populate';
import { syncDotsProperties } from './actions/sync';
import { waitSliderReady } from './actions/wait';
import { getAttribute, getInstance, hasAttributeValue, queryElement } from './utils/selectors';

/**
 * Generates the custom slider dots and inits syncing.
 * @param slider The `SliderElement`.
 */
export const createSliderDots = async (slider: SliderElement) => {
  // Get slider elements
  const instance = getInstance(slider);

  const sliderNav = slider.querySelector<SliderNavElement>(`.${SLIDER_CSS_CLASSES.sliderNav}`);
  const customSliderNav = queryElement<HTMLElement>('slider-nav', { instance }) || sliderNav;

  if (!sliderNav || !customSliderNav) return;

  // Make sure CMSSlider has finished (if existing on the page)
  const listSliderAttribute = window.FinsweetAttributes.process.has('list');
  if (listSliderAttribute) {
    await Promise.all([waitAttributeLoaded('list'), waitSliderReady(sliderNav)]);
  }

  // Get props

  const activeCustomDotCSSClass = getAttribute(slider, 'active');

  // Clear the custom slider nav content
  const clearCustomSliderContent = hasAttributeValue(customSliderNav, 'remove', 'true');
  if (clearCustomSliderContent) customSliderNav.innerHTML = '';

  // Populate the dots
  const dotsRelationship = populateSliderDots(slider, customSliderNav);

  // Init sync
  for (const relationshipData of dotsRelationship) {
    syncDotsProperties(relationshipData, activeCustomDotCSSClass);
  }

  const observer = observeSliderNav(sliderNav, dotsRelationship, activeCustomDotCSSClass);
  const removeClickListener = listenClickEvents(customSliderNav, dotsRelationship);

  return () => {
    observer.disconnect();
    removeClickListener();
  };
};

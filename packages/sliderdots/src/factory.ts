import { SliderNavElement, SLIDER_CSS_CLASSES } from '@finsweet/ts-utils';
import type { SliderElement } from '@finsweet/ts-utils';

import { CMS_SLIDER_ATTRIBUTE } from '$global/constants/attributes';
import { getInstanceIndex } from '$global/helpers';

import { listenClickEvents } from './actions/events';
import { observeSliderNav } from './actions/observe';
import { populateSliderDots } from './actions/populate';
import { syncDotsProperties } from './actions/sync';
import { waitSliderReady } from './actions/wait';
import { ATTRIBUTES, DEFAULT_ACTIVE_CSS_CLASS, queryElement } from './utils/constants';

// Constants
const {
  element: { key: elementKey },
  remove: { key: removeKey, values: removeValues },
  active: { key: activeKey },
} = ATTRIBUTES;

/**
 * Generates the custom slider dots and inits syncing.
 * @param slider The `SliderElement`.
 */
export const createSliderDots = async (slider: SliderElement) => {
  // Get slider elements
  const instanceIndex = getInstanceIndex(slider, elementKey);

  const sliderNav = slider.querySelector<SliderNavElement>(`.${SLIDER_CSS_CLASSES.sliderNav}`);
  const customSliderNav = queryElement<HTMLElement>('sliderNav', { instanceIndex }) || sliderNav;

  if (!sliderNav || !customSliderNav) return;

  // Make sure CMSSlider has finished (if existing on the page)
  const cmsSliderAttribute = window.fsAttributes[CMS_SLIDER_ATTRIBUTE];
  if (cmsSliderAttribute) await Promise.all([cmsSliderAttribute.loading, waitSliderReady(sliderNav)]);

  // Get props
  const activeCustomDotCSSClass = slider.getAttribute(activeKey) || DEFAULT_ACTIVE_CSS_CLASS;

  // Clear the custom slider nav content
  const clearCustomSliderContent = customSliderNav.getAttribute(removeKey) === removeValues.true;
  if (clearCustomSliderContent) customSliderNav.innerHTML = '';

  // Populate the dots
  const dotsRelationship = populateSliderDots(slider, customSliderNav);

  // Init sync
  for (const relationshipData of dotsRelationship) syncDotsProperties(relationshipData, activeCustomDotCSSClass);
  observeSliderNav(sliderNav, dotsRelationship, activeCustomDotCSSClass);
  listenClickEvents(customSliderNav, dotsRelationship);

  return [slider, dotsRelationship];
};

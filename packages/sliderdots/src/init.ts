import {
  type FinsweetAttributeInit,
  isNotEmpty,
  SLIDER_CSS_CLASSES,
  type SliderElement,
  waitWebflowReady,
} from '@finsweet/attributes-utils';

import { createSliderDots } from './factory';
import { getElementSelector } from './utils/selectors';

/**
 * Inits the custom slider dots.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const sliders = [
    ...document.querySelectorAll<SliderElement>(`.${SLIDER_CSS_CLASSES.slider}${getElementSelector('slider')}`),
  ];

  const cleanups = (await Promise.all(sliders.map(createSliderDots))).filter(isNotEmpty);

  return {
    result: sliders,
    destroy() {
      for (const cleanup of cleanups) cleanup();
    },
  };
};

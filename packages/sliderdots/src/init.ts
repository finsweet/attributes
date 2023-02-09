import type { SliderElement } from '@finsweet/ts-utils';
import { isNotEmpty, SLIDER_CSS_CLASSES } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, SLIDER_DOTS_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { createSliderDots } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the custom slider dots.
 */
export const init = async () => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const sliders = [
    ...document.querySelectorAll<SliderElement>(
      `.${SLIDER_CSS_CLASSES.slider}${getSelector('element', 'slider', { operator: 'prefixed' })}`
    ),
  ];

  const cleanups = (await Promise.all(sliders.map(createSliderDots))).filter(isNotEmpty);

  return finalizeAttribute(SLIDER_DOTS_ATTRIBUTE, sliders, () => {
    for (const cleanup of cleanups) cleanup();
  });
};

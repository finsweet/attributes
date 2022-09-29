import { isNotEmpty, SLIDER_CSS_CLASSES } from '@finsweet/ts-utils';
import type { SliderElement } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, SLIDER_DOTS_ATTRIBUTE } from '$global/constants/attributes';

import { createSliderDots } from './factory';
import { getSelector } from './utils/constants';

/**
 * Inits the custom slider dots.
 */
export const init = async (): Promise<NonNullable<Awaited<ReturnType<typeof createSliderDots>>>[]> => {
  await window.fsAttributes[CMS_ATTRIBUTE_ATTRIBUTE]?.loading;

  const sliders = [
    ...document.querySelectorAll<SliderElement>(
      `.${SLIDER_CSS_CLASSES.slider}${getSelector('element', 'slider', { operator: 'prefixed' })}`
    ),
  ];

  const slidersData = (await Promise.all(sliders.map(createSliderDots))).filter(isNotEmpty);

  window.fsAttributes[SLIDER_DOTS_ATTRIBUTE].resolve?.(slidersData);

  return slidersData;
};

import { SLIDER_CSS_CLASSES } from '@finsweet/ts-utils';

import { ARIA_LABEL_KEY, ARIA_PRESSED_KEY, ARIA_ROLE_KEY, TABINDEX_KEY } from '$global/constants/a11y';

import type { DotsRelationship } from '../utils/types';

/**
 * Syncronizes the properties from the original `Slider Dot` with the `Custom Slider Dot`.
 * @param dot The original `Slider Dot`.
 * @param customDot The `Custom Slider Dot`.
 * @param activeCSSClass The CSS class used for the `active` state.
 */
export const syncDotsProperties = ({ dot, customDot }: DotsRelationship[number], activeCSSClass: string) => {
  const isActive = dot.classList.contains(SLIDER_CSS_CLASSES.activeSliderDot);

  customDot.classList[isActive ? 'add' : 'remove'](activeCSSClass);

  for (const attributeKey of [ARIA_LABEL_KEY, ARIA_PRESSED_KEY, ARIA_ROLE_KEY, TABINDEX_KEY]) {
    const value = dot.getAttribute(attributeKey);

    if (value) customDot.setAttribute(attributeKey, value);
    else customDot.removeAttribute(attributeKey);
  }
};

import { SLIDER_DOTS_ATTRIBUTE } from '$global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${SLIDER_DOTS_ATTRIBUTE}`;

export const SLIDER_ELEMENT_KEY = 'slider';
export const CONTENT_ELEMENT_KEY = 'content';
export const SLIDER_NAV_ELEMENT_KEY = 'slider-nav';
export const ACTIVE_SETTING_KEY = 'active';
export const REMOVE_SETTING_KEY = 'remove';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a slider to instantiate.
       */
      slider: generateDynamicAttibuteValue(SLIDER_ELEMENT_KEY),

      /**
       * Defines the content to be added to the slider dot.
       */
      content: generateDynamicAttibuteValue(CONTENT_ELEMENT_KEY),

      /**
       * Defines a custom Slide Nav.
       */
      sliderNav: generateDynamicAttibuteValue(SLIDER_NAV_ELEMENT_KEY),
    },
  },

  /**
   * Defines the `active` CSS class. Defaults to {@link DEFAULT_ACTIVE_CSS_CLASS}.
   */
  active: { key: `${ATTRIBUTES_PREFIX}-${ACTIVE_SETTING_KEY}` },

  /**
   * Defines if the content should be removed or just duplicated.
   */
  remove: {
    key: `${ATTRIBUTES_PREFIX}-${REMOVE_SETTING_KEY}`,
    values: { true: 'true' },
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const DEFAULT_ACTIVE_CSS_CLASS = `${ATTRIBUTES_PREFIX}_active`;

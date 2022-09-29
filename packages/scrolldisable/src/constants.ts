import { SCROLL_DISABLE_ATTRIBUTE } from '$global/constants/attributes';
import { generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${SCROLL_DISABLE_ATTRIBUTE}`;

export const WHEN_VISIBLE_ELEMENT_KEY = 'when-visible';
export const ENABLE_ELEMENT_KEY = 'enable';
export const DISABLE_ELEMENT_KEY = 'disable';
export const TOGGLE_ELEMENT_KEY = 'toggle';
export const NAV_ELEMENT_KEY = 'smart-nav';
export const PRESERVE_ELEMENT_KEY = 'preserve';

export const MEDIA_SETTING_KEY = 'media';
export const GAP_SETTING_KEY = 'gap';

export const ATTRIBUTES = {
  /**
   * Defines an element that will act as trigger based on its value.
   */
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Scrolling will be disabled/enabled when this element becomes visible/hidden.
       */
      whenVisible: WHEN_VISIBLE_ELEMENT_KEY,

      /**
       * Scrolling will be enabled when this element is clicked.
       */
      enable: ENABLE_ELEMENT_KEY,

      /**
       * Scrolling will be disabled when this element is clicked.
       */
      disable: DISABLE_ELEMENT_KEY,

      /**
       * Scrolling will be disabled/enabled when this element is clicked.
       */
      toggle: TOGGLE_ELEMENT_KEY,

      /**
       * Specific for `Navbar` components.
       * Scrolling will be disabled/enabled when the `Nav Menu` is open/closed.
       */
      nav: NAV_ELEMENT_KEY,

      /**
       * Applied on elements that must preserve scrolling when the page's scrolling is disabled.
       */
      preserve: PRESERVE_ELEMENT_KEY,
    },
  },

  /**
   * Used to define a media query that restricts when an element acts as a trigger.
   */
  matchMedia: { key: `${ATTRIBUTES_PREFIX}-${MEDIA_SETTING_KEY}` },

  /**
   * Defines if the scrollbar gap must be reserved when disabling scrolling.
   * It's set to the `<script>` tag, `true` by default.
   */
  gap: { key: `${ATTRIBUTES_PREFIX}-${GAP_SETTING_KEY}`, values: { true: 'true', false: 'false' } },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

/**
 * Defines the `Navbar` component media breakpoints.
 */
export const NAV_MEDIAS = {
  medium: '(max-width: 991px)',
  small: '(max-width: 767px)',
  tiny: '(max-width: 479px)',
} as const;

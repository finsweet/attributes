import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Scrolling will be disabled/enabled when this element becomes visible/hidden.
   */
  'when-visible',

  /**
   * Scrolling will be enabled when this element is clicked.
   */
  'enable',

  /**
   * Scrolling will be disabled when this element is clicked.
   */
  'disable',

  /**
   * Scrolling will be disabled/enabled when this element is clicked.
   */
  'toggle',

  /**
   * Specific for `Navbar` components.
   * Scrolling will be disabled/enabled when the `Nav Menu` is open/closed.
   */
  'smart-nav',

  /**
   * Applied on elements that must preserve scrolling when the page's scrolling is disabled.
   */
  'preserve',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Used to define a media query that restricts when an element acts as a trigger.
   */
  media: { key: 'media' },

  /**
   * Defines if the scrollbar gap must be reserved when disabling scrolling.
   * It's set to the `<script>` tag, `true` by default.
   */
  gap: { key: 'gap', values: ['true', 'false'] },
} as const satisfies AttributeSettings;

/**
 * Defines the `Navbar` component media breakpoints.
 */
export const NAV_MEDIAS = {
  medium: '(max-width: 991px)',
  small: '(max-width: 767px)',
  tiny: '(max-width: 479px)',
} as const;

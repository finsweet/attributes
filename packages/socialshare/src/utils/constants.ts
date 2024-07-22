import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * Defines a Facebook social button
   */
  'facebook',

  /**
   * Defines a X social button
   */
  'x',

  /**
   * Defines a Pinterest social button
   */
  'pinterest',

  /**
   * Defines a Linked In social button
   */
  'linkedin',

  /**
   * Defines a Telegram social button
   */
  'telegram',

  /**
   * Defines a Reddit social button
   */
  'reddit',

  /**
   * Defines the Content to be share into social media
   */
  'content',

  /**
   * Defines a custom URL to be share into social media
   */
  'url',

  /**
   * Defines Facebook hashtags
   */
  'facebook-hashtags',

  /**
   * Defines X hashtags
   */
  'x-hashtags',

  /**
   * Defines X username
   */
  'x-username',

  /**
   * Defines Pinterest image
   */
  'pinterest-image',

  /**
   * Defines Pinterest description
   */
  'pinterest-description',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Defines the width of popup window.
   */
  width: { key: 'height' },

  /**
   * Defines the height of popup window.
   */
  height: { key: 'height' },

  /**
   * Defines an element.
   */
  element: { key: 'element' },
} as const satisfies AttributeSettings;

export const DEFAULT_WIDTH_SETTING_KEY = 600;
export const DEFAULT_HEIGHT_SETTING_KEY = 480;

export const SOCIAL_SHARE_PLATFORMS = {
  facebook: 'https://www.facebook.com/sharer/sharer.php',
  x: 'https://x.com/intent/post/',
  pinterest: 'https://www.pinterest.com/pin/create/trigger/',
  reddit: 'https://www.reddit.com/submit',
  linkedin: 'https://www.linkedin.com//sharing/share-offsite',
  telegram: 'https://t.me/share',
} as const;

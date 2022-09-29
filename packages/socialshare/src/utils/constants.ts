import { SOCIAL_SHARE_ATTRIBUTE } from '$global/constants/attributes';
import { generateSelectors, generateDynamicAttibuteValue } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${SOCIAL_SHARE_ATTRIBUTE}`;

export const FACEBOOK_ELEMENT_KEY = 'facebook';
export const TWITTER_ELEMENT_KEY = 'twitter';
export const PINTEREST_ELEMENT_KEY = 'pinterest';
export const LINKEDIN_ELEMENT_KEY = 'linkedin';
export const TELEGRAM_ELEMENT_KEY = 'telegram';
export const REDDIT_ELEMENT_KEY = 'reddit';
export const CONTENT_ELEMENT_KEY = 'content';
export const URL_ELEMENT_KEY = 'url';
export const FACEBOOK_HASHTAG_ELEMENT_KEY = 'facebook-hashtags';
export const TWITTER_HASHTAG_ELEMENT_KEY = 'twitter-hashtags';
export const TWITTER_USERNAME_ELEMENT_KEY = 'twitter-username';
export const PINTEREST_IMAGE_ELEMENT_KEY = 'pinterest-image';
export const PINTEREST_DESCRIPTION_ELEMENT_KEY = 'pinterest-description';
export const WIDTH_SETTING_KEY = 'width';
export const DEFAULT_WIDTH_SETTING_KEY = 600;
export const HEIGHT_SETTING_KEY = 'height';
export const DEFAULT_HEIGHT_SETTING_KEY = 480;

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a Facebook social button
       */
      facebook: generateDynamicAttibuteValue(FACEBOOK_ELEMENT_KEY),
      /**
       * Defines a Twitter social button
       */
      twitter: generateDynamicAttibuteValue(TWITTER_ELEMENT_KEY),
      /**
       * Defines a Pinterest social button
       */
      pinterest: generateDynamicAttibuteValue(PINTEREST_ELEMENT_KEY),
      /**
       * Defines a Linked In social button
       */
      linkedin: generateDynamicAttibuteValue(LINKEDIN_ELEMENT_KEY),
      /**
       * Defines a Telegram social button
       */
      telegram: generateDynamicAttibuteValue(TELEGRAM_ELEMENT_KEY),
      /**
       * Defines a Reddit social button
       */
      reddit: generateDynamicAttibuteValue(REDDIT_ELEMENT_KEY),
      /**
       * Defines the Content to be share into social media
       */
      content: generateDynamicAttibuteValue(CONTENT_ELEMENT_KEY),
      /**
       * Defines a custom URL to be share into social media
       */
      url: generateDynamicAttibuteValue(URL_ELEMENT_KEY),
      /**
       * Defines Facebook hashtags
       */
      facebookHashtags: generateDynamicAttibuteValue(FACEBOOK_HASHTAG_ELEMENT_KEY),
      /**
       * Defines Twitter hashtags
       */
      twitterHashtags: generateDynamicAttibuteValue(TWITTER_HASHTAG_ELEMENT_KEY),
      /**
       * Defines Twitter username
       */
      twitterUsername: generateDynamicAttibuteValue(TWITTER_USERNAME_ELEMENT_KEY),
      /**
       * Defines Pinterest image
       */
      pinterestImage: generateDynamicAttibuteValue(PINTEREST_IMAGE_ELEMENT_KEY),
      /**
       * Defines Pinterest description
       */
      pinterestDescription: generateDynamicAttibuteValue(PINTEREST_DESCRIPTION_ELEMENT_KEY),
    },
  },

  /**
   * Defines the width of popup window.
   */
  width: {
    key: `${ATTRIBUTES_PREFIX}-${HEIGHT_SETTING_KEY}`,
    default: DEFAULT_WIDTH_SETTING_KEY,
  },
  /**
   * Defines the height of popup window.
   */
  height: {
    key: `${ATTRIBUTES_PREFIX}-${WIDTH_SETTING_KEY}`,
    default: DEFAULT_HEIGHT_SETTING_KEY,
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const SOCIAL_SHARE_PLATFORMS = {
  facebook: 'https://www.facebook.com/sharer/sharer.php',
  twitter: 'https://twitter.com/intent/tweet/',
  pinterest: 'https://www.pinterest.com/pin/create/trigger/',
  reddit: 'https://www.reddit.com/submit',
  linkedin: 'https://www.linkedin.com//sharing/share-offsite',
  telegram: 'https://t.me/share',
} as const;

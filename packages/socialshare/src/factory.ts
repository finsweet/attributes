import { getInstanceIndex } from '$global/helpers';

import {
  collectFacebookData,
  collectPinterestData,
  collectTwitterData,
  collectCopyData,
  collectTelegramData,
  collectLinkedinData,
  collectRedditData,
} from './actions/collect';

import { ATTRIBUTES, queryElement, SOCIAL_SHARE_PLATFORMS } from './utils/constants';
import { getCMSItemWrapper } from './utils/dom';
import { stores } from './utils/stores';
import type { SocialShareTypes } from './utils/types';

const {
  element: { key: elementKey },
} = ATTRIBUTES;

/**
 * Creates a social share instance for all matching elements under a scope.
 * @param scope Optional. Defaults to the document.
 */
export const createSocialShareInstances = (scope?: HTMLElement) => {
  for (const key in SOCIAL_SHARE_PLATFORMS) {
    const platform = key as SocialShareTypes;

    const elements = queryElement<HTMLElement>(platform, {
      scope,
      operator: 'prefixed',
      all: true,
      caseInsensitive: true,
    });

    // fix leaking elements of different attributes when using the same prefix
    const abovePrefixBounds = `${key}[-0-9]*[a-zA-Z]+`;
    const socialShareButtons = elements.filter((element) => {
      // if attribute is out of bounds, return false.
      return !element.getAttribute(elementKey)?.toLocaleLowerCase().match(new RegExp(abovePrefixBounds));
    });

    const create = creators[platform];

    socialShareButtons.forEach(create);
  }
};

/**
 * Holds an instance creator for each platform.
 */
const creators: Record<SocialShareTypes, (trigger: HTMLElement) => void> = {
  /**
   * Copy creator
   * @param trigger
   */
  copy(trigger) {
    const copy = collectCopyData();
    stores.copy.set(trigger, copy);
  },

  /**
   * Facebook creator.
   * @param trigger
   */
  facebook(trigger) {
    if (stores.facebook.has(trigger)) return;

    const instanceIndex = getInstanceIndex(trigger, elementKey);

    const cmsListItem = getCMSItemWrapper(trigger);

    const facebook = collectFacebookData(trigger, instanceIndex, cmsListItem);

    if (facebook) stores.facebook.set(trigger, facebook);
  },

  /**
   * Twitter creator.
   * @param trigger
   */
  twitter(trigger) {
    if (stores.twitter.has(trigger)) return;

    const instanceIndex = getInstanceIndex(trigger, elementKey);

    const cmsListItem = getCMSItemWrapper(trigger);

    const twitter = collectTwitterData(trigger, instanceIndex, cmsListItem);

    if (twitter) stores.twitter.set(trigger, twitter);
  },

  /**
   * Pinterest creator.
   * @param trigger
   */
  pinterest(trigger) {
    if (stores.pinterest.has(trigger)) return;

    const instanceIndex = getInstanceIndex(trigger, elementKey);

    const cmsListItem = getCMSItemWrapper(trigger);

    const pinterest = collectPinterestData(trigger, instanceIndex, cmsListItem);

    if (pinterest) stores.pinterest.set(trigger, pinterest);
  },

  /**
   * Telegram creator.
   * @param trigger
   */
  telegram(trigger) {
    if (stores.telegram.has(trigger)) return;

    const instanceIndex = getInstanceIndex(trigger, elementKey);

    const cmsListItem = getCMSItemWrapper(trigger);

    const telegram = collectTelegramData(trigger, instanceIndex, cmsListItem);

    if (telegram) stores.telegram.set(trigger, telegram);
  },

  /**
   * Linkedin creator.
   * @param trigger
   */
  linkedin(trigger) {
    if (stores.linkedin.has(trigger)) return;

    const instanceIndex = getInstanceIndex(trigger, elementKey);

    const cmsListItem = getCMSItemWrapper(trigger);

    const linkedin = collectLinkedinData(trigger, instanceIndex, cmsListItem);

    if (linkedin) stores.linkedin.set(trigger, linkedin);
  },

  /**
   * Reddit creator.
   * @param trigger
   */
  reddit(trigger) {
    if (stores.reddit.has(trigger)) return;

    const instanceIndex = getInstanceIndex(trigger, elementKey);

    const cmsListItem = getCMSItemWrapper(trigger);

    const reddit = collectRedditData(trigger, instanceIndex, cmsListItem);

    if (reddit) stores.reddit.set(trigger, reddit);
  },
};

import { getInstanceIndex } from '$global/helpers';

import { collectFacebookData, collectPinterestData, collectSocialData, collectTwitterData } from './actions/collect';
import {
  createFacebookShare,
  createTwitterShare,
  createPinterestShare,
  createTelegramShare,
  createLinkedinShare,
  createRedditShare,
} from './actions/share';
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
    const socialShareButtons = [...elements].filter((element) => {
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
   * Facebook creator.
   * @param trigger
   */
  facebook(trigger) {
    if (stores.facebook.has(trigger)) return;

    const instanceIndex = getInstanceIndex(trigger, elementKey);

    const cmsListItem = getCMSItemWrapper(trigger);

    const facebook = collectFacebookData(trigger, instanceIndex, cmsListItem);

    const shareData = createFacebookShare(facebook);

    stores.facebook.set(trigger, shareData);
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

    const shareData = createTwitterShare(twitter);

    stores.twitter.set(trigger, shareData);
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

    const shareData = createPinterestShare(pinterest);

    stores.pinterest.set(trigger, shareData);
  },

  /**
   * Telegram creator.
   * @param trigger
   */
  telegram(trigger) {
    if (stores.telegram.has(trigger)) return;

    const instanceIndex = getInstanceIndex(trigger, elementKey);

    const cmsListItem = getCMSItemWrapper(trigger);

    const telegram = collectSocialData(trigger, 'telegram', instanceIndex, cmsListItem);

    const shareData = createTelegramShare(telegram);

    stores.telegram.set(trigger, shareData);
  },

  /**
   * Linkedin creator.
   * @param trigger
   */
  linkedin(trigger) {
    if (stores.linkedin.has(trigger)) return;

    const instanceIndex = getInstanceIndex(trigger, elementKey);

    const cmsListItem = getCMSItemWrapper(trigger);

    const linkedin = collectSocialData(trigger, 'linkedin', instanceIndex, cmsListItem);

    const shareData = createLinkedinShare(linkedin);

    stores.linkedin.set(trigger, shareData);
  },

  /**
   * Reddit creator.
   * @param trigger
   */
  reddit(trigger) {
    if (stores.reddit.has(trigger)) return;

    const instanceIndex = getInstanceIndex(trigger, elementKey);

    const cmsListItem = getCMSItemWrapper(trigger);

    const reddit = collectSocialData(trigger, 'reddit', instanceIndex, cmsListItem);

    const shareData = createRedditShare(reddit);

    stores.reddit.set(trigger, shareData);
  },
};

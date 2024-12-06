import { collectFacebookData, collectPinterestData, collectSocialData, collectXData } from './actions/collect';
import {
  createFacebookShare,
  createLinkedinShare,
  createPinterestShare,
  createRedditShare,
  createTelegramShare,
  createXShare,
} from './actions/share';
import { SOCIAL_SHARE_PLATFORMS } from './utils/constants';
import { getCMSItemWrapper } from './utils/dom';
import { getAttribute, getInstance, queryAllElements } from './utils/selectors';
import { stores } from './utils/stores';
import type { SocialShareTypes } from './utils/types';

/**
 * Creates a social share instance for all matching elements under a scope.
 * @param scope Optional. Defaults to the document.
 */
export const createSocialShareInstances = (scope?: HTMLElement) => {
  for (const key in SOCIAL_SHARE_PLATFORMS) {
    const platform = key as SocialShareTypes;

    const elements = queryAllElements(platform, { scope });

    // fix leaking elements of different attributes when using the same prefix
    const abovePrefixBounds = `${key}[-0-9]*[a-zA-Z]+`;
    const socialShareButtons = elements.filter((element) => {
      // if attribute is out of bounds, return false.
      return !getAttribute(element, 'element')?.toLocaleLowerCase().match(new RegExp(abovePrefixBounds));
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

    const instance = getInstance(trigger);

    const cmsListItem = getCMSItemWrapper(trigger);

    const facebook = collectFacebookData(trigger, instance, cmsListItem);

    const shareData = createFacebookShare(facebook);

    stores.facebook.set(trigger, shareData);
  },

  /**
   * X creator.
   * @param trigger
   */
  x(trigger) {
    if (stores.x.has(trigger)) return;

    const instance = getInstance(trigger);

    const cmsListItem = getCMSItemWrapper(trigger);

    const x = collectXData(trigger, instance, cmsListItem);

    const shareData = createXShare(x);

    stores.x.set(trigger, shareData);
  },

  /**
   * Pinterest creator.
   * @param trigger
   */
  pinterest(trigger) {
    if (stores.pinterest.has(trigger)) return;

    const instance = getInstance(trigger);

    const cmsListItem = getCMSItemWrapper(trigger);

    const pinterest = collectPinterestData(trigger, instance, cmsListItem);

    const shareData = createPinterestShare(pinterest);

    stores.pinterest.set(trigger, shareData);
  },

  /**
   * Telegram creator.
   * @param trigger
   */
  telegram(trigger) {
    if (stores.telegram.has(trigger)) return;

    const instance = getInstance(trigger);

    const cmsListItem = getCMSItemWrapper(trigger);

    const telegram = collectSocialData(trigger, 'telegram', instance, cmsListItem);

    const shareData = createTelegramShare(telegram);

    stores.telegram.set(trigger, shareData);
  },

  /**
   * Linkedin creator.
   * @param trigger
   */
  linkedin(trigger) {
    if (stores.linkedin.has(trigger)) return;

    const instance = getInstance(trigger);

    const cmsListItem = getCMSItemWrapper(trigger);

    const linkedin = collectSocialData(trigger, 'linkedin', instance, cmsListItem);

    const shareData = createLinkedinShare(linkedin);

    stores.linkedin.set(trigger, shareData);
  },

  /**
   * Reddit creator.
   * @param trigger
   */
  reddit(trigger) {
    if (stores.reddit.has(trigger)) return;

    const instance = getInstance(trigger);

    const cmsListItem = getCMSItemWrapper(trigger);

    const reddit = collectSocialData(trigger, 'reddit', instance, cmsListItem);

    const shareData = createRedditShare(reddit);

    stores.reddit.set(trigger, shareData);
  },
};

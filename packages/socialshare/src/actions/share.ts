import { SOCIAL_SHARE_PLATFORMS } from '../utils/constants';
import type {
  FacebookSocialShare,
  PinterestSocialShare,
  SocialShare,
  SocialShareStoreData,
  SocialShareTypes,
  TwitterSocialShare,
} from './../utils/types';

export function createFacebookShare({ type, url, hashtags, content, width, height }: FacebookSocialShare) {
  return createSocialShare(type, { u: url, hashtag: hashtags, quote: content }, width, height);
}

export function createTwitterShare({ type, content, username, hashtags, url, width, height }: TwitterSocialShare) {
  return createSocialShare(
    type,
    {
      url,
      hashtags,
      text: content,
      via: username,
    },
    width,
    height
  );
}

export function createPinterestShare({ type, url, image, description, width, height }: PinterestSocialShare) {
  return createSocialShare(
    type,
    {
      url,
      description,
      media: image,
    },
    width,
    height
  );
}

export function createLinkedinShare({ type, url, width, height }: SocialShare) {
  return createSocialShare(type, { url: url }, width, height);
}

export function createRedditShare({ type, url, content, width, height }: SocialShare) {
  return createSocialShare(
    type,
    {
      url,
      title: content,
    },
    width,
    height
  );
}

export function createTelegramShare({ type, content, url, width, height }: SocialShare) {
  return createSocialShare(
    type,
    {
      url,
      text: content,
    },
    width,
    height
  );
}

export function createCopyShare(type: SocialShareTypes) {
  return createSocialShare(type);
}

/**
 * This function returns an object which is set in a store mapped to the particular social share element
 * @param type
 * @param params
 * @param width
 * @param height
 * @returns
 */
function createSocialShare(
  type: SocialShareTypes,
  params?: { [key: string]: string | null },
  width?: number,
  height?: number
): SocialShareStoreData | undefined {
  // if type of social share is copy, we don't need a definate height or width
  if (type === 'copy') {
    const shareUrl = window.location.href;
    return {
      height: 0,
      width: 0,
      type,
      shareUrl,
    };
  }
  const urlSocialMedia = SOCIAL_SHARE_PLATFORMS[type];

  const shareUrl = new URL(urlSocialMedia);
  if (params && height && width) {
    const shareParams = Object.entries(params);
    for (const [key, value] of shareParams) {
      if (value) shareUrl.searchParams.append(key, value);
    }
    return {
      height,
      width,
      type,
      shareUrl,
    };
  }
}

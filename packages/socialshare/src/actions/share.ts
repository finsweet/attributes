import ClipboardJS from 'clipboard';

import { SOCIAL_SHARE_PLATFORMS } from '../utils/constants';
import type {
  FacebookSocialShare,
  PinterestSocialShare,
  SocialShare,
  SocialShareStoreData,
  SocialShareTypes,
  XSocialShare,
} from './../utils/types';

/**
 * Creates a social share link for copying the URL to the clipboard.
 */
export const createCopyInstance = ({ shareUrl, trigger }: SocialShareStoreData) => {
  if (!trigger) return;

  const clipboard = new ClipboardJS(trigger, {
    text: () => shareUrl.href,
  });

  clipboard.on('error', (e) => {
    console.error('Failed to copy text to clipboard', e.text);
  });
};

/**
 * Creates a Facebook share link with the given parameters.
 */
export const createFacebookShare = ({ type, url, hashtags, content, width, height }: FacebookSocialShare) => {
  return createSocialShare(type, { u: url, hashtag: hashtags, quote: content }, width, height);
};

/**
 * Creates a X share object with the specified properties.
 */
export function createXShare({ type, content, username, hashtags, url, width, height }: XSocialShare) {
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

/**
 * Creates a Pinterest share object with the specified parameters.
 */
export const createPinterestShare = ({ type, url, image, description, width, height }: PinterestSocialShare) => {
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
};

/**
 * Creates a LinkedIn share object with the specified parameters.
 */
export const createLinkedinShare = ({ type, url, width, height }: SocialShare) => {
  return createSocialShare(type, { url: url }, width, height);
};

/**
 * Creates a Reddit share object with the given parameters.
 */
export const createRedditShare = ({ type, url, content, width, height }: SocialShare) => {
  return createSocialShare(
    type,
    {
      url,
      title: content,
    },
    width,
    height
  );
};

/**
 * Creates a Telegram share object with the specified parameters.
 */
export const createTelegramShare = ({ type, content, url, width, height }: SocialShare) => {
  return createSocialShare(
    type,
    {
      url,
      text: content,
    },
    width,
    height
  );
};

/**
 * Creates a social share object with the given parameters.
 */
const createSocialShare = (
  type: SocialShareTypes,
  params: { [key: string]: string | null },
  width: number,
  height: number
): SocialShareStoreData => {
  const urlSocialMedia = SOCIAL_SHARE_PLATFORMS[type];

  const shareUrl = new URL(urlSocialMedia);
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
};

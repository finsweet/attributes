import {
  ATTRIBUTES,
  DEFAULT_HEIGHT_SETTING_KEY,
  DEFAULT_WIDTH_SETTING_KEY,
  queryElement,
  SOCIAL_SHARE_PLATFORMS,
} from './../utils/constants';
import type {
  CopySocialShare,
  FacebookSocialShare,
  GenericSocialShare,
  GenericSocialShareFields,
  PinterestSocialShare,
  SocialShareTypes,
  TwitterSocialShare,
} from './../utils/types';

export function collectFacebookData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): FacebookSocialShare | undefined {
  const socialData = collectGenericSocialData(trigger, instanceIndex, scope);

  const hashtagsElement = queryElement<HTMLElement>('facebookHashtags', { instanceIndex, operator: 'prefixed', scope });
  const hashtags = hashtagsElement ? hashtagsElement.textContent : null;

  const shareUrl = createSocialShareUrl('facebook', {
    u: socialData.url,
    hashtag: hashtags,
    quote: socialData.content,
  });

  return {
    ...socialData,
    type: 'facebook',
    hashtags,
    shareUrl,
  };
}

export function collectTwitterData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): TwitterSocialShare {
  const socialData = collectGenericSocialData(trigger, instanceIndex, scope);

  const hashtagsElement = queryElement<HTMLElement>('twitterHashtags', { instanceIndex, operator: 'prefixed', scope });
  const hashtags =
    hashtagsElement && hashtagsElement.textContent ? hashtagsElement.textContent.replace(/[^a-zA-Z0-9_,]/g, '') : null;

  const usernameElement = queryElement<HTMLElement>('twitterUsername', { instanceIndex, operator: 'prefixed', scope });
  const username = usernameElement ? usernameElement.textContent : null;

  const shareUrl = createSocialShareUrl('twitter', {
    url: socialData.url,
    hashtags,
    text: socialData.content,
    via: username,
  });

  return {
    ...socialData,
    type: 'twitter',
    hashtags,
    username,
    shareUrl,
  };
}

export function collectPinterestData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): PinterestSocialShare {
  const socialData = collectGenericSocialData(trigger, instanceIndex, scope);

  const imageElement = queryElement<HTMLImageElement>('pinterestImage', { instanceIndex, operator: 'prefixed', scope });
  const image = imageElement && imageElement.src ? imageElement.src : null;

  const descriptionElement = queryElement<HTMLElement>('pinterestDescription', {
    instanceIndex,
    operator: 'prefixed',
    scope,
  });

  const description = descriptionElement ? descriptionElement.textContent : null;

  const shareUrl = createSocialShareUrl('pinterest', {
    url: socialData.url,
    description: description,
    media: image,
  });

  return {
    ...socialData,
    type: 'pinterest',
    image,
    description,
    shareUrl,
  };
}

export function collectLinkedinData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): GenericSocialShare {
  const socialData = collectGenericSocialData(trigger, instanceIndex, scope);

  const shareUrl = createSocialShareUrl('linkedin', {
    url: socialData.url,
  });

  return {
    ...socialData,
    type: 'linkedin',
    shareUrl,
  };
}

export function collectRedditData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): GenericSocialShare {
  const socialData = collectGenericSocialData(trigger, instanceIndex, scope);

  const shareUrl = createSocialShareUrl('reddit', {
    url: socialData.url,
    title: socialData.content,
  });

  return {
    ...socialData,
    type: 'reddit',
    shareUrl,
  };
}

export function collectTelegramData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): GenericSocialShare {
  const socialData = collectGenericSocialData(trigger, instanceIndex, scope);

  const shareUrl = createSocialShareUrl('telegram', {
    url: socialData.url,
    text: socialData.content,
  });

  return {
    ...socialData,
    type: 'telegram',
    shareUrl,
  };
}

export function collectCopyData(): CopySocialShare {
  const shareUrl = createSocialShareUrl('copy');

  return {
    type: 'copy',
    shareUrl,
  };
}

function collectGenericSocialData(
  socialShareButton: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): GenericSocialShareFields {
  const width = collectSize(socialShareButton, ATTRIBUTES.width.key, DEFAULT_WIDTH_SETTING_KEY);
  const height = collectSize(socialShareButton, ATTRIBUTES.height.key, DEFAULT_HEIGHT_SETTING_KEY);

  const contentElement = queryElement<HTMLElement>('content', { instanceIndex, operator: 'prefixed', scope });
  const content = contentElement ? contentElement.textContent : null;

  const urlElement = queryElement<HTMLElement>('url', { instanceIndex, operator: 'prefixed', scope });
  const url = urlElement && urlElement.textContent ? urlElement.textContent : window.location.href;
  return {
    content,
    url,
    width,
    height,
  };
}

function collectSize(button: HTMLElement, selector: string, defaultValue: number): number {
  const buttonWidth = button.getAttribute(selector);

  if (buttonWidth) {
    const value = parseInt(buttonWidth);
    return isNaN(value) ? defaultValue : value;
  }

  const closestElementWidth = button.closest(`[${selector}]`);

  if (!closestElementWidth) {
    return defaultValue;
  }

  const closestWidth = closestElementWidth.getAttribute(selector);

  if (!closestWidth) {
    return defaultValue;
  }

  const value = parseInt(closestWidth);
  return isNaN(value) ? defaultValue : value;
}

/**
 * This function returns an object which is set in a store mapped to the particular social share element
 * @param type
 * @param params
 * @returns
 */
function createSocialShareUrl(type: SocialShareTypes, params: { [key: string]: string | null } = {}): URL {
  const getShareUrl = SOCIAL_SHARE_PLATFORMS[type];

  const url = getShareUrl();
  const shareUrl = new URL(url);

  const shareParams = Object.entries(params);

  for (const [key, value] of shareParams) {
    if (value) shareUrl.searchParams.append(key, value);
  }

  return shareUrl;
}

import { ATTRIBUTES, queryElement } from './../utils/constants';
import type {
  FacebookSocialShare,
  PinterestSocialShare,
  SocialShare,
  SocialShareTypes,
  TwitterSocialShare,
} from './../utils/types';

export function collectFacebookData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): FacebookSocialShare {
  const socialData = collectSocialData(trigger, 'facebook', instanceIndex, scope);

  const hashtagsElement = queryElement<HTMLElement>('facebookHashtags', { instanceIndex, operator: 'prefixed', scope });
  const hashtagsText = hashtagsElement ? hashtagsElement.textContent : null;

  return {
    ...socialData,
    type: 'facebook',
    hashtags: hashtagsText,
  };
}

export function collectTwitterData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): TwitterSocialShare {
  const socialData = collectSocialData(trigger, 'twitter', instanceIndex, scope);

  const hashtagsElement = queryElement<HTMLElement>('twitterHashtags', { instanceIndex, operator: 'prefixed', scope });
  const hashtagsText =
    hashtagsElement && hashtagsElement.textContent ? hashtagsElement.textContent.replace(/[^a-zA-Z0-9_,]/g, '') : null;

  const usernameElement = queryElement<HTMLElement>('twitterUsername', { instanceIndex, operator: 'prefixed', scope });
  const userNameText = usernameElement ? usernameElement.textContent : null;

  return {
    ...socialData,
    type: 'twitter',
    hashtags: hashtagsText,
    username: userNameText,
  };
}

export function collectPinterestData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): PinterestSocialShare {
  const socialData = collectSocialData(trigger, 'pinterest', instanceIndex, scope);

  const imageElement = queryElement<HTMLImageElement>('pinterestImage', { instanceIndex, operator: 'prefixed', scope });
  const imageSrc = imageElement && imageElement.src ? imageElement.src : null;

  const descriptionElement = queryElement<HTMLElement>('pinterestDescription', {
    instanceIndex,
    operator: 'prefixed',
    scope,
  });

  const descriptionText = descriptionElement ? descriptionElement.textContent : null;

  return {
    ...socialData,
    type: 'pinterest',
    image: imageSrc,
    description: descriptionText,
  };
}

export function collectSocialData(
  socialShareButton: HTMLElement,
  elementKey: SocialShareTypes,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): SocialShare {
  const width = collectSize(socialShareButton, ATTRIBUTES.width.key, ATTRIBUTES.width.default);
  const height = collectSize(socialShareButton, ATTRIBUTES.height.key, ATTRIBUTES.height.default);

  const contentElement = queryElement<HTMLElement>('content', { instanceIndex, operator: 'prefixed', scope });
  const contentText = contentElement ? contentElement.textContent : null;

  const urlElement = queryElement<HTMLElement>('url', { instanceIndex, operator: 'prefixed', scope });
  const contentUrl = urlElement && urlElement.textContent ? urlElement.textContent : window.location.href;
  return {
    content: contentText,
    url: contentUrl,
    width,
    height,
    type: elementKey,
  };
}

export function collectSize(button: HTMLElement, selector: string, defaultValue: number): number {
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

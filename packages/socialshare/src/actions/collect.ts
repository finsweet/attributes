import { queryElement, ATTRIBUTES } from './../utils/constants';
import type {
  FacebookSocialShare,
  TwitterSocialShare,
  PinterestSocialShare,
  SocialShare,
  SocialShareTypes,
} from './../utils/types';

export function collectFacebookData(
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): FacebookSocialShare | null {
  const facebookButton = collectSocialData('facebook', instanceIndex, scope);

  if (facebookButton === null) {
    return null;
  }

  const hashtagsElement = queryElement<HTMLElement>('facebookHashtags', { instanceIndex, operator: 'prefixed', scope });
  const hashtagsText = hashtagsElement ? hashtagsElement.innerText : null;

  return {
    ...facebookButton,
    type: 'facebook',
    hashtags: hashtagsText,
  };
}

export function collectTwitterData(
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): TwitterSocialShare | null {
  const twitterButton = collectSocialData('twitter', instanceIndex, scope);

  if (twitterButton === null) {
    return null;
  }

  const hashtagsElement = queryElement<HTMLElement>('twitterHashtags', { instanceIndex, operator: 'prefixed', scope });
  const hashtagsText = hashtagsElement ? hashtagsElement.innerText.replace(/[^a-zA-Z0-9_,]/g, '') : null;

  const usernameElement = queryElement<HTMLElement>('twitterUsername', { instanceIndex, operator: 'prefixed', scope });
  const userNameText = usernameElement ? usernameElement.innerText : null;

  return {
    ...twitterButton,
    type: 'twitter',
    hashtags: hashtagsText,
    username: userNameText,
  };
}

export function collectPinterestData(
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): PinterestSocialShare | null {
  const pinterestButton = collectSocialData('pinterest', instanceIndex, scope);

  if (pinterestButton === null) {
    return null;
  }

  const imageElement = queryElement<HTMLImageElement>('pinterestImage', { instanceIndex, operator: 'prefixed', scope });
  const imageSrc = imageElement ? imageElement.src : null;

  const descriptionElement = queryElement<HTMLElement>('pinterestDescription', {
    instanceIndex,
    operator: 'prefixed',
    scope,
  });

  const descriptionText = descriptionElement ? descriptionElement.innerText : null;

  return {
    ...pinterestButton,
    type: 'pinterest',
    image: imageSrc,
    description: descriptionText,
  };
}

export function collectSocialData(
  elementKey: SocialShareTypes,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): SocialShare | null {
  const socialShareButton = queryElement<HTMLElement>(elementKey, {
    instanceIndex,
    operator: 'prefixed',
    scope,
    caseInsensitive: true,
  });

  if (!socialShareButton) {
    return null;
  }

  const width = collectSize(socialShareButton, ATTRIBUTES.width.key, ATTRIBUTES.width.default);
  const height = collectSize(socialShareButton, ATTRIBUTES.height.key, ATTRIBUTES.height.default);

  return {
    button: socialShareButton,
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

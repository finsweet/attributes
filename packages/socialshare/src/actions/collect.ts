import { getAttribute, getSettingSelector, queryElement } from '../utils/selectors';
import { DEFAULT_HEIGHT_SETTING_KEY, DEFAULT_WIDTH_SETTING_KEY, SETTINGS } from './../utils/constants';
import type {
  FacebookSocialShare,
  PinterestSocialShare,
  SocialShare,
  SocialShareTypes,
  XSocialShare,
} from './../utils/types';

export function collectFacebookData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): FacebookSocialShare {
  const socialData = collectSocialData(trigger, 'facebook', instanceIndex, scope);

  const hashtagsElement = queryElement('facebook-hashtags', { instanceIndex, scope });
  const hashtagsText = hashtagsElement ? hashtagsElement.textContent : null;

  return {
    ...socialData,
    type: 'facebook',
    hashtags: hashtagsText,
  };
}

export function collectXData(
  trigger: HTMLElement,
  instanceIndex: number | undefined,
  scope: HTMLElement | undefined
): XSocialShare {
  const socialData = collectSocialData(trigger, 'x', instanceIndex, scope);

  const hashtagsElement = queryElement('x-hashtags', { instanceIndex, scope });
  const hashtagsText =
    hashtagsElement && hashtagsElement.textContent ? hashtagsElement.textContent.replace(/[^a-zA-Z0-9_,]/g, '') : null;

  const usernameElement = queryElement('x-username', { instanceIndex, scope });
  const userNameText = usernameElement ? usernameElement.textContent : null;

  return {
    ...socialData,
    type: 'x',
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

  const imageElement = queryElement<HTMLImageElement>('pinterest-image', { instanceIndex, scope });
  const imageSrc = imageElement && imageElement.src ? imageElement.src : null;

  const descriptionElement = queryElement('pinterest-description', { instanceIndex, scope });

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
  const width = collectSize(socialShareButton, 'width', DEFAULT_WIDTH_SETTING_KEY);
  const height = collectSize(socialShareButton, 'height', DEFAULT_HEIGHT_SETTING_KEY);

  const contentElement = queryElement('content', { instanceIndex, scope });
  const contentText = contentElement ? contentElement.textContent : null;

  const urlElement = queryElement('url', { instanceIndex, scope });
  const contentUrl = urlElement && urlElement.textContent ? urlElement.textContent : window.location.href;

  return {
    content: contentText,
    url: contentUrl,
    width,
    height,
    type: elementKey,
  };
}

export function collectSize(button: HTMLElement, settingKey: keyof typeof SETTINGS, defaultValue: number): number {
  const buttonWidth = getAttribute(button, settingKey);

  if (buttonWidth) {
    const value = parseInt(buttonWidth);
    return isNaN(value) ? defaultValue : value;
  }

  const closestElementWidth = button.closest(getSettingSelector(settingKey));
  if (!closestElementWidth) {
    return defaultValue;
  }

  const closestWidth = getAttribute(closestElementWidth, settingKey);
  if (!closestWidth) {
    return defaultValue;
  }

  const value = parseInt(closestWidth);
  return isNaN(value) ? defaultValue : value;
}

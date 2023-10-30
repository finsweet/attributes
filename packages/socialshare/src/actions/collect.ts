import {
  DEFAULT_HEIGHT_SETTING_KEY,
  DEFAULT_WIDTH_SETTING_KEY,
  type FacebookSocialShare,
  getAttribute,
  getSettingSelector,
  type PinterestSocialShare,
  queryElement,
  SETTINGS,
  type SocialShare,
  type SocialShareStoreData,
  type SocialShareTypes,
  type TwitterSocialShare,
} from './../utils';

/**
 * Collects data for the copy action of the Social Share feature.
 * @param trigger - The HTML element that triggered the action.
 * @param instanceIndex - The index of the Social Share instance, if multiple instances are present on the page.
 * @param scope - The HTML element that contains the Social Share instance, if multiple instances are present on the page.
 * @returns An object containing the collected data for the copy action.
 */
export const collectCopyData = (
  trigger: HTMLElement,
  instanceIndex: string | undefined,
  scope: HTMLElement | undefined
): SocialShareStoreData => {
  const socialData = collectSocialData(trigger, 'copy', instanceIndex, scope);

  return {
    ...socialData,
    shareUrl: new URL(window.location.href),
    type: 'copy',
    trigger,
  };
};

/**
 * Collects Facebook social share data.
 * @param trigger - The element that triggered the social share.
 * @param instanceIndex - The index of the social share instance.
 * @param scope - The scope of the social share.
 * @returns An object containing the collected Facebook social share data.
 */
export const collectFacebookData = (
  trigger: HTMLElement,
  instanceIndex: string | undefined,
  scope: HTMLElement | undefined
): FacebookSocialShare => {
  const socialData = collectSocialData(trigger, 'facebook', instanceIndex, scope);

  const hashtagsElement = queryElement('facebook-hashtags', { instanceIndex, scope });
  const hashtagsText = hashtagsElement ? hashtagsElement.textContent : null;

  return {
    ...socialData,
    type: 'facebook',
    hashtags: hashtagsText,
  };
};

/**
 * Collects Twitter data from a given trigger element, instance index, and scope.
 * @param trigger - The element that triggered the action.
 * @param instanceIndex - The index of the instance.
 * @param scope - The scope of the element.
 * @returns An object containing the collected Twitter data.
 */
export const collectTwitterData = (
  trigger: HTMLElement,
  instanceIndex: string | undefined,
  scope: HTMLElement | undefined
): TwitterSocialShare => {
  const socialData = collectSocialData(trigger, 'twitter', instanceIndex, scope);

  const hashtagsElement = queryElement('twitter-hashtags', { instanceIndex, scope });
  const hashtagsText =
    hashtagsElement && hashtagsElement.textContent ? hashtagsElement.textContent.replace(/[^a-zA-Z0-9_,]/g, '') : null;

  const usernameElement = queryElement('twitter-username', { instanceIndex, scope });
  const userNameText = usernameElement ? usernameElement.textContent : null;

  return {
    ...socialData,
    type: 'twitter',
    hashtags: hashtagsText,
    username: userNameText,
  };
};

/**
 * Collects Pinterest social share data.
 * @param trigger - The element that triggered the social share.
 * @param instanceIndex - The index of the instance, if multiple instances are present.
 * @param scope - The scope of the social share.
 * @returns An object containing the collected Pinterest social share data.
 */
export const collectPinterestData = (
  trigger: HTMLElement,
  instanceIndex: string | undefined,
  scope: HTMLElement | undefined
): PinterestSocialShare => {
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
};

/**
 * Collects social share data from the given social share button element.
 * @param socialShareButton - The social share button element.
 * @param elementKey - The key of the social share element.
 * @param instanceIndex - The index of the social share instance.
 * @param scope - The scope of the social share element.
 * @returns The collected social share data.
 */
export const collectSocialData = (
  socialShareButton: HTMLElement,
  elementKey: SocialShareTypes,
  instanceIndex: string | undefined,
  scope: HTMLElement | undefined
): SocialShare => {
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
};

/**
 * Collects the size of a button element based on a specified setting key.
 * @param button - The button element to collect the size from.
 * @param settingKey - The key of the setting to use for collecting the size.
 * @param defaultValue - The default value to use if the size cannot be collected.
 * @returns The size of the button element, or the default value if the size cannot be collected.
 */
export const collectSize = (button: HTMLElement, settingKey: keyof typeof SETTINGS, defaultValue: number): number => {
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
};

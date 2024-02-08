import { animations, easings, getObjectKeys, isKeyOf } from '@finsweet/attributes-utils';

import type { CMSList } from '..';
import { DEFAULT_LIST_ANIMATION_DURATION } from './constants';

/**
 * Adds list animations to a {@link CMSList}.
 * @param listInstance The `CMSList` instance.
 * @param propKeys
 */
export const addListAnimation = (
  listInstance: CMSList,
  { durationKey, easingKey }: { durationKey: string; easingKey: string }
) => {
  const { fade } = animations;

  const { listAnimation, listOrWrapper } = listInstance;

  const animationDuration = listOrWrapper.getAttribute(durationKey);
  const animationEasing = listOrWrapper.getAttribute(easingKey);

  if (listAnimation && !animationDuration && !animationEasing) return;

  const easing = isKeyOf(animationEasing, easings) ? animationEasing : undefined;
  const duration = animationDuration ? parseFloat(animationDuration) / 2000 : DEFAULT_LIST_ANIMATION_DURATION;

  if (!listAnimation) {
    listInstance.listAnimation = { ...fade, options: { easing, duration } };

    return;
  }

  const { options } = listAnimation;

  if (!options) {
    listAnimation.options = { easing, duration };

    return;
  }

  options.easing ||= easing;
  if (animationDuration) options.duration = duration;
};

/**
 * Adds item animations to a {@link CMSList}.
 * @param listInstance The `CMSList` instance.
 * @param propKeys
 */
export const addItemsAnimation = (
  listInstance: CMSList,
  {
    animationKey,
    durationKey,
    easingKey,
    staggerKey,
  }: { animationKey: string; durationKey: string; easingKey: string; staggerKey: string }
) => {
  const { listOrWrapper } = listInstance;

  const animationName = listOrWrapper.getAttribute(animationKey);
  const animationFunctions = isKeyOf(animationName, getObjectKeys(animations))
    ? animations[animationName]
    : animations.fade;

  const animationDuration = listOrWrapper.getAttribute(durationKey);
  const animationEasing = listOrWrapper.getAttribute(easingKey);
  const animationStagger = listOrWrapper.getAttribute(staggerKey);

  listInstance.itemsAnimation = {
    ...animationFunctions,
    options: {
      easing: isKeyOf(animationEasing, easings) ? animationEasing : undefined,
      duration: animationDuration ? parseFloat(animationDuration) : undefined,
      stagger: animationStagger ? parseFloat(animationStagger) : undefined,
    },
  };
};

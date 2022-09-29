import { getObjectKeys, isKeyOf } from '@finsweet/ts-utils';

import { importAnimations } from '$global/import';

import type { CMSList } from '..';
import { DEFAULT_LIST_ANIMATION_DURATION } from './constants';

/**
 * Adds list animations to a {@link CMSList}.
 * @param listInstance The `CMSList` instance.
 * @param propKeys
 */
export const addListAnimation = async (
  listInstance: CMSList,
  { durationKey, easingKey }: { durationKey: string; easingKey: string }
) => {
  const animationsImport = await importAnimations();
  if (!animationsImport) return;

  const {
    animations: { fade },
    easings,
  } = animationsImport;

  const { listAnimation } = listInstance;

  const animationDuration = listInstance.getAttribute(durationKey);
  const animationEasing = listInstance.getAttribute(easingKey);

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
export const addItemsAnimation = async (
  listInstance: CMSList,
  {
    animationKey,
    durationKey,
    easingKey,
    staggerKey,
  }: { animationKey: string; durationKey: string; easingKey: string; staggerKey: string }
) => {
  const animationsImport = await importAnimations();
  if (!animationsImport) return;

  const { animations, easings } = animationsImport;

  const animationName = listInstance.getAttribute(animationKey);
  const animationFunctions = isKeyOf(animationName, getObjectKeys(animations))
    ? animations[animationName]
    : animations.fade;

  const animationDuration = listInstance.getAttribute(durationKey);
  const animationEasing = listInstance.getAttribute(easingKey);
  const animationStagger = listInstance.getAttribute(staggerKey);

  listInstance.itemsAnimation = {
    ...animationFunctions,
    options: {
      easing: isKeyOf(animationEasing, easings) ? animationEasing : undefined,
      duration: animationDuration ? parseFloat(animationDuration) / 1000 : undefined,
      stagger: animationStagger ? parseFloat(animationStagger) : undefined,
    },
  };
};

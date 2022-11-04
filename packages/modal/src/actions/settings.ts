import { getObjectKeys, isKeyOf } from '@finsweet/ts-utils';

import type { AnimationModule } from '$packages/animation/src/types';

import { DISPLAY_PROPERTIES, getAttribute } from '../utils/constants';
import type { AnimationSettings } from '../utils/types';

/**
 * Extracts the animation settings of an element.
 * @param element
 */
export const getAnimationSettings = (element: Element, { animations, easings }: AnimationModule): AnimationSettings => {
  const animationName = getAttribute(element, 'animation');
  const actions = isKeyOf(animationName, getObjectKeys(animations)) ? animations[animationName] : animations.fade;

  const animationDuration = getAttribute(element, 'duration');
  const animationEasing = getAttribute(element, 'easing');
  const animationDisplay = getAttribute(element, 'display');

  const easing = isKeyOf(animationEasing, easings) ? animationEasing : undefined;
  const duration = animationDuration ? parseFloat(animationDuration) / 1000 : undefined;
  const display = isKeyOf(animationDisplay, DISPLAY_PROPERTIES) ? animationDisplay : undefined;

  return { actions, duration, easing, display };
};

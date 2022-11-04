import { addListener } from '@finsweet/ts-utils';

import type { AnimationModule } from '$packages/animation/src/types';

import { ANCHOR_TEXT, DEFAULT_DISPLAY_PROPERTY, getSelector } from '../utils/constants';
import type { AnimationSettings } from '../utils/types';
import { getAnimationSettings } from './settings';

/**
 * Handles a modal's functionality.
 *
 * @param modalElement
 * @param openTriggers
 * @param closeTriggers
 * @param modalAnimationSettings
 *
 * @returns A cleanup callback.
 */
export const handleModal = (
  modalElement: HTMLElement,
  openTriggers: Element[],
  closeTriggers: Element[],
  modalAnimationSettings: AnimationSettings,
  animationsModule: AnimationModule
) => {
  const { parentElement } = modalElement;
  if (!parentElement) return;

  const {
    actions: modalActions,
    duration: modalDuration,
    easing: modalEasing,
    display: modalDisplay,
  } = modalAnimationSettings;

  const customAnimationChildren = getCustomAnimationChildren(modalElement, animationsModule);

  // Anchor
  const anchor = new Comment(ANCHOR_TEXT);
  parentElement.insertBefore(anchor, modalElement);

  // State
  let isAnimating = false;
  let isOpen: boolean;

  // Open buttons
  const openCleanups = openTriggers.map((openTrigger) => {
    const openCleanup = addListener(openTrigger, 'click', async (e) => {
      e.preventDefault();

      if (isAnimating || isOpen) return;

      isAnimating = true;

      // Animate
      await Promise.all([
        modalActions.animateIn(modalElement, {
          duration: modalDuration,
          easing: modalEasing,
          display: modalDisplay || DEFAULT_DISPLAY_PROPERTY,
          target: document.body,
        }),
        Promise.all(
          customAnimationChildren.map(([child, { actions, duration, easing, display }]) =>
            actions.animateIn(child, {
              display,
              duration: duration || modalDuration,
              easing: easing || modalEasing,
            })
          )
        ),
      ]);

      isAnimating = false;
      isOpen = true;
    });

    return openCleanup;
  });

  // Close buttons
  const closeCleanups = closeTriggers.map((closeTrigger) => {
    const closeCleanup = addListener(closeTrigger, 'click', async (e) => {
      e.preventDefault();

      if (isAnimating || isOpen === false) return;

      isAnimating = true;

      // Animate
      await Promise.all([
        modalActions.animateOut(modalElement, {
          duration: modalDuration,
          easing: modalEasing,
          target: parentElement,
          insertAfter: anchor,
        }),
        Promise.all(
          customAnimationChildren.map(([child, { actions, duration, easing }]) =>
            actions.animateOut(child, {
              duration: duration || modalDuration,
              easing: easing || modalEasing,
            })
          )
        ),
      ]);

      parentElement.insertBefore(modalElement, anchor);

      isAnimating = false;
      isOpen = false;
    });

    return closeCleanup;
  });

  // Cleanup
  return () => {
    for (const cleanup of openCleanups) cleanup();
    for (const cleanup of closeCleanups) cleanup();
  };
};

/**
 * @returns Custom animation data for a modal's children.
 * @param modalElement
 */
const getCustomAnimationChildren = (modalElement: HTMLElement, animationsModule: AnimationModule) => {
  const settingsKeys = ['animation', 'duration', 'easing', 'display'] as const;
  const selector = settingsKeys.map((key) => getSelector(key)).join(',');

  const children = [...modalElement.querySelectorAll<HTMLElement>(selector)];

  const customAnimationChildren = children.map((child) => {
    const animationSettings = getAnimationSettings(child, animationsModule);
    return [child, animationSettings] as const;
  });

  return customAnimationChildren;
};

import { getInstanceIndex } from '$global/helpers';
import type { AnimationModule } from '$packages/animation/src/types';

import { setModalA11Y } from './actions/a11y';
import { handleModal } from './actions/modal';
import { getAnimationSettings } from './actions/settings';
import { ATTRIBUTES, queryElement } from './utils/constants';

/**
 * Inits a modal component.
 * @param modalElement
 * @returns A cleanup callback.
 */
export const initModal = (modalElement: HTMLElement, animationsModule: AnimationModule) => {
  const { parentElement } = modalElement;
  if (!parentElement) return;

  const instanceIndex = getInstanceIndex(modalElement, ATTRIBUTES.element.key);

  const openTriggers = queryElement('open', { instanceIndex, all: true });
  const closeTriggers = queryElement('close', { instanceIndex, all: true });
  if (!openTriggers.length && !closeTriggers.length) return;

  const animationSettings = getAnimationSettings(modalElement, animationsModule);

  setModalA11Y(modalElement, openTriggers, closeTriggers);

  return handleModal(modalElement, openTriggers, closeTriggers, animationSettings, animationsModule);
};

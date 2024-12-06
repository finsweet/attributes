import { setModalA11Y } from './actions/a11y';
import { handleModal } from './actions/modal';
import { getAnimationSettings } from './actions/settings';
import { getInstance, queryAllElements } from './utils/selectors';

/**
 * Inits a modal component.
 * @param modalElement
 * @returns A cleanup callback.
 */
export const initModal = (modalElement: HTMLElement) => {
  const { parentElement } = modalElement;
  if (!parentElement) return;

  const instance = getInstance(modalElement);

  const openTriggers = queryAllElements('open', { instance });
  const closeTriggers = queryAllElements('close', { instance });
  if (!openTriggers.length && !closeTriggers.length) return;

  const animationSettings = getAnimationSettings(modalElement);

  setModalA11Y(modalElement, openTriggers, closeTriggers);

  return handleModal(modalElement, openTriggers, closeTriggers, animationSettings);
};

import { addListener, simulateEvent, isElement } from '@finsweet/ts-utils';

import { ARIA_CONTROLS_KEY, ARIA_ROLE_KEY, ARIA_ROLE_VALUES, TABINDEX_KEY } from '$global/constants/a11y';

const DISALLOWED_INSTANCES = [
  HTMLAnchorElement,
  HTMLButtonElement,
  HTMLInputElement,
  HTMLTextAreaElement,
  HTMLSelectElement,
  HTMLVideoElement,
  HTMLAudioElement,
];

/**
 * Makes sure all `div` and `li` elements that have a `tabindex` attribute emit a click event on Enter and Space keydown.
 *
 * @returns A callback to remove the event listener.
 */
export const handleKeyboardEvents = () => {
  const keydownCleanup = addListener(window, 'keydown', (e: KeyboardEvent) => {
    const { key } = e;

    if (key === 'Escape') return handleEscapeKey(e);
    if (key === 'Enter' || key === ' ') return handleEnterOrSpaceKey(e);
  });

  return () => {
    keydownCleanup();
  };
};

/**
 * Handles Enter and Space key precess.
 * - Makes sure all `div` and `li` elements that have a `tabindex` attribute emit a click event on Enter and Space keydown.
 * @param e
 */
const handleEnterOrSpaceKey = (e: KeyboardEvent) => {
  const { target } = e;

  if (!isElement(target)) return;
  if (!target.getAttribute(TABINDEX_KEY)) return;
  if (DISALLOWED_INSTANCES.some((instance) => target instanceof instance)) return;

  e.preventDefault();

  simulateEvent(target, 'click');
};

/**
 * Handles Escape key presses.
 * - Tries to close a dialog.
 *
 * @param e
 */
const handleEscapeKey = (e: KeyboardEvent) => {
  const { target } = e;

  if (!isElement(target)) return;

  const dialog = target.closest(`[${ARIA_ROLE_KEY}="${ARIA_ROLE_VALUES.dialog}"]`);
  if (!dialog || !dialog.id) return;

  const controllerSelector = `[${ARIA_CONTROLS_KEY}="${dialog.id}"]`;
  const controller =
    dialog.querySelector<HTMLElement>(controllerSelector) || document.querySelector<HTMLElement>(controllerSelector);
  if (!controller) return;

  e.preventDefault();

  controller.click();
};

import { isNotEmpty, isVisible } from '@finsweet/ts-utils';
import { createFocusTrap } from 'focus-trap';
import debounce from 'just-debounce';

import { ARIA_CONTROLS_KEY, ARIA_EXPANDED_KEY, ARIA_ROLE_KEY, ARIA_ROLE_VALUES } from '$global/constants/a11y';

/**
 * Observes [aria-controls] target visibility.
 * Sets the correspondent [aria-expanded] attribute value.
 *
 * @returns A callback to disconnect all observers.
 */
export const observeAriaControls = () => {
  const controllers = [...document.querySelectorAll(`[${ARIA_CONTROLS_KEY}]`)];

  const cleanups = controllers.map(observeTarget).filter(isNotEmpty);

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
};

/**
 * Observes an [aria-controls] target.
 * Sets the correspondent [aria-expanded] attribute value.
 * If the target is a dialog, activates a focus trap.
 *
 * @param controller The [aria-controls] controller element.
 */
const observeTarget = (controller: Element) => {
  const targetSelector = controller.getAttribute(ARIA_CONTROLS_KEY);
  if (!targetSelector) return;

  const target = document.getElementById(targetSelector);
  if (!target) {
    controller.removeAttribute(ARIA_CONTROLS_KEY);
    return;
  }

  // Has aria-expanded
  const hasAriaExpanded = controller.hasAttribute(ARIA_EXPANDED_KEY);

  // Is dialog
  const targetIsDialog = target.getAttribute(ARIA_ROLE_KEY) === ARIA_ROLE_VALUES.dialog;
  const trap = targetIsDialog ? createFocusTrap(target, { returnFocusOnDeactivate: true }) : null;

  if (!hasAriaExpanded && !targetIsDialog) return;

  // Observe
  setAriaExpanded(controller, target);

  const observerCallback: MutationCallback = () => {
    const hasExpanded = setAriaExpanded(controller, target);
    if (hasExpanded) {
      trap?.activate();
    } else {
      trap?.deactivate();
    }
  };

  const debouncedObserverCallback = debounce(observerCallback, 100);

  const observer = new MutationObserver(debouncedObserverCallback);

  observer.observe(target, {
    attributes: true,
    attributeFilter: ['style', 'class'],
  });

  return () => {
    observer.disconnect();
    trap?.deactivate();
  };
};

/**
 * Sets the [aria-expanded] attribute value to a controller.
 * @param controller
 * @param target
 */
const setAriaExpanded = (controller: Element, target: HTMLElement) => {
  const hasExpanded = isVisible(target);

  controller.setAttribute(ARIA_EXPANDED_KEY, String(hasExpanded));

  return hasExpanded;
};

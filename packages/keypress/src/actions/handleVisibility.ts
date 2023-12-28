import { animations } from '@finsweet/attributes-utils';

import { queryElement } from '../utils/selectors';

/**
 * Updates accessibility attributes for the target element.
 * @param targetElement The target element element to be positioned.
 * @param isVisible Whether the target element is visible or not.
 */
const updateTargetElementAccessibility = (targetElement: HTMLElement, isVisible: boolean) => {
  targetElement.setAttribute('aria-hidden', `${!isVisible}`);
};

/**
 * This function will toggle the visibility of an element
 * @param element
 * @param animation
 */
export const handleVisibility = (element: HTMLElement, animation?: string, reset?: boolean) => {
  const checkbox = queryElement<HTMLInputElement>('checkbox', {
    scope: document,
  });

  if (reset) {
    if (checkbox) {
      checkbox.checked = false;
      checkbox.setAttribute('aria-checked', 'false');
    }

    hideTargetElement(element, animation as keyof typeof animations);

    return;
  }

  if (element.style.display === 'none' || element.style.display === '') {
    if (checkbox) {
      checkbox.checked = true;
      checkbox.setAttribute('aria-checked', 'true');
    }

    showTargetElement(element, animation as keyof typeof animations);

    return;
  }

  if (checkbox) {
    checkbox.checked = false;
    checkbox.setAttribute('aria-checked', 'false');
  }

  hideTargetElement(element, animation as keyof typeof animations);
};

/**
 * Shows the target element with the specified animation if any.
 * @param targetElement
 * @param animation
 * @returns
 */
export const showTargetElement = async (targetElement: HTMLElement, animation?: keyof typeof animations) => {
  if (!animation) {
    targetElement.style.display = 'block';
    updateTargetElementAccessibility(targetElement, true);

    return;
  }

  animations[animation].prepareIn(targetElement, { display: 'block' });
  await animations[animation].animateIn(targetElement, { display: 'block' });
  updateTargetElementAccessibility(targetElement, true);
};

/**
 * Hides the target element with the specified animation if any.
 * @param targetElement
 * @param animation
 * @returns
 */
export const hideTargetElement = async (targetElement: HTMLElement, animation?: keyof typeof animations) => {
  if (!animation) {
    targetElement.style.display = 'none';
    updateTargetElementAccessibility(targetElement, false);

    return;
  }

  await animations[animation].animateOut(targetElement, { display: 'none' });
  updateTargetElementAccessibility(targetElement, false);
};

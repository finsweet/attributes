import { animations, type Easings } from '@finsweet/attributes-utils';

import { activeTabClass } from './constants';
import { getAttribute } from './selectors';

/**
 * This function will toggle the visibility of tabs and content.
 * @param element The element to toggle the visibility of.
 * @param animation The animation to use when showing/hiding the element.
 * @param displayProperty The display property to use when showing the element.
 */
export const handleVisibility = (
  element: HTMLElement,
  animation?: string,
  displayProperty = 'block',
  easing?: Easings[number],
  duration?: number
) => {
  // todo: use fs-tabs-cloak instead of display property
  if (element.style.display === 'none' || element.style.display === '') {
    showTargetElement(element, displayProperty, animation as keyof typeof animations, easing, duration);

    return;
  }

  hideTargetElement(element, animation as keyof typeof animations, easing, duration);
};

/**
 * Shows the target element with the specified animation if any.
 * @param targetElement The element to show.
 * @param displayProperty The display property to use when showing the element.
 * @param animation The animation to use when showing the element.
 * @returns
 */
export const showTargetElement = async (
  targetElement: HTMLElement,
  displayProperty: string,
  animation?: keyof typeof animations,
  easing?: Easings[number],
  duration?: number
) => {
  if (!animation) {
    targetElement.style.display = displayProperty;

    return;
  }

  animations[animation].prepareIn(targetElement, { display: displayProperty });
  await animations[animation].animateIn(targetElement, { display: displayProperty, duration, easing });
};

/**
 * Hides the target element with the specified animation if any.
 * @param targetElement The element to hide.
 * @param animation The animation to use when hiding the element.
 * @returns
 */
export const hideTargetElement = async (
  targetElement: HTMLElement,
  animation?: keyof typeof animations,
  easing?: Easings[number],
  duration?: number
) => {
  if (!animation) {
    targetElement.style.display = 'none';

    return;
  }

  await animations[animation].animateOut(targetElement, { display: 'none', duration, easing });
};

/**
 * Recursively searches for and returns the 'activeclass' attribute value in the given element or its children.
 * @param element - The element to search within.
 * @returns The value of the 'activeclass' attribute if found, or null if not found.
 */
export function getActiveClassAttributeValue(element: Element): string {
  const activeClassValue = getAttribute(element, 'activeclass');
  if (activeClassValue) {
    return activeClassValue;
  }

  for (const child of element.children) {
    const childValue = getActiveClassAttributeValue(child);
    if (childValue) {
      return childValue;
    }
  }
  return activeTabClass;
}

/**
 * Extracts the tab name from the URL query parameters.
 * @returns The tab name if found in the query parameters, or null if not found.
 */
export function getTabNameFromQuery() {
  const queryParam = window.location.search;
  if (queryParam) {
    return queryParam.replace('?', '');
  }
  return null;
}

/**
 * Sets 'pointer-events: none' on the specified element and its children, while restoring 'pointer-events: auto' on the children.
 * @param element - The DOM element to modify the pointer events for.
 */
export const setPointerEventsNoneToElementAndChildren = (element: HTMLElement) => {
  element.style.pointerEvents = 'none';

  const childElements = element.querySelectorAll<HTMLElement>('*');

  for (const childElement of childElements) {
    childElement.style.pointerEvents = 'auto';
  }
};

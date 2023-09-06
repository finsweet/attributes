import { getAttribute } from './selectors';

/**
 * Recursively searches for and returns the 'activeclass' attribute value in the given element or its children.
 * @param element - The element to search within.
 * @returns The value of the 'activeclass' attribute if found, or null if not found.
 */
export function getActiveClassAttributeValue(element: Element): string | null {
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
  return null;
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

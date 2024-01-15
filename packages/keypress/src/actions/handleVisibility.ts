import { queryElement } from '../utils/selectors';

/**
 * This function will toggle the visibility of an element
 * @param element
 * @param toggle CSS selector for elements to toggle.
 * @param reset targets checkbox
 */
export const handleVisibility = (element: HTMLElement, toggle: string, reset?: boolean) => {
  const checkbox = queryElement<HTMLInputElement>('checkbox', {
    scope: document,
  });

  if (reset) {
    if (checkbox) {
      checkbox.checked = false;
      checkbox.setAttribute('aria-checked', 'false');
    }

    hideTargetElement(element, toggle);

    return;
  }

  if (element.style.display === 'none' || element.style.display === '') {
    if (checkbox) {
      checkbox.checked = true;
      checkbox.setAttribute('aria-checked', 'true');
    }

    showTargetElement(element, toggle);

    return;
  }

  if (checkbox) {
    checkbox.checked = false;
    checkbox.setAttribute('aria-checked', 'false');
  }

  hideTargetElement(element, toggle);
};

/**
 * Shows the target element with the specified animation if any.
 * @param targetElement
 * @param animation
 * @returns
 */
export const showTargetElement = async (targetElement: HTMLElement, toggle: string) => {
  targetElement.classList.toggle(toggle);
};

/**
 * Hides the target element with the specified animation if any.
 * @param targetElement
 * @param animation
 * @returns
 */
export const hideTargetElement = async (targetElement: HTMLElement, toggle: string) => {
  targetElement.classList.toggle(toggle);
};

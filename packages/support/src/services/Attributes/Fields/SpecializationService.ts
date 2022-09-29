import type { DOMSelector } from '$global/types/schema';

export function validateElementType(element: HTMLElement, selector: string): boolean {
  const elementTag = element.tagName.toLowerCase();
  const elementType = element.getAttribute('type');

  const elementTagWithType = `${elementTag}[type="${elementType}"]`;

  return elementTagWithType === selector;
}

export function validateElementClass(element: HTMLElement, selector: string) {
  const [elementTag, className] = selector.split('.');

  if (!elementTag) {
    return element.classList.contains(className);
  }

  return element.tagName.toLowerCase() === elementTag && element.classList.contains(className);
}

export function validateElementTag(element: HTMLElement, selector: string) {
  return element.tagName.toLowerCase() === selector;
}

function validateDOMSelector(element: HTMLElement, selector: string) {
  if (selector.includes('[type=')) {
    return validateElementType(element, selector);
  }

  if (selector.includes('.')) {
    return validateElementClass(element, selector);
  }

  return validateElementTag(element, selector);
}

function validateParentSelectors(element: HTMLElement, elementSelectors: string[]) {
  let status = true;

  elementSelectors.forEach((parentSelector: string) => {
    const parentElement = element.closest(parentSelector);

    if (!parentElement) {
      status = false;
    }
  });

  return status;
}

export function validateDOMSelectors(element: HTMLElement, domSelectors: DOMSelector[]): boolean {
  let status = false;

  domSelectors.forEach((domSelector: DOMSelector) => {
    domSelector.selectors.forEach((selector: string) => {
      const elementSelectors = selector.split(' ').reverse();

      const elementSelector = elementSelectors.shift();

      if (!elementSelector) {
        throw new Error('Empty DOM Selector not allowed');
      }

      if (elementSelector === '*') {
        status = true;
        return;
      }

      if (!validateDOMSelector(element, elementSelector)) {
        return;
      }

      if (!validateParentSelectors(element, elementSelectors)) {
        return;
      }

      status = true;
    });
  });

  return status;
}

export function currentSelector(element: HTMLElement) {
  return element.tagName.toLowerCase();
}

import type { DOMSelector } from '@global/types/schema';
import type { SchemaSelector, ElementItemSelector } from '@src/types/Schema.types';

import AttributeDuplicateError from './Errors/AttributeDuplicatedError';
import AttributeNotFoundError from './Errors/AttributeNotFoundError';
import DOMForAttributeNotFound from './Errors/DOMForAttributeNotFound';

export function settingExists(settingSelector: SchemaSelector, appliedTo: DOMSelector[] | undefined): HTMLElement[] {
  const domElement = document.querySelectorAll<HTMLElement>(settingSelector.getAttributeSelector());

  if (!domElement || domElement.length === 0) {
    throw new AttributeNotFoundError(settingSelector, appliedTo, false);
  }

  return Array.from(domElement);
}

export function elementSettingExists(
  htmlElements: HTMLElement[] | null,
  elementSelector: SchemaSelector,
  appliedTo: ElementItemSelector[],
  isDefault: boolean
): boolean {
  let elementSettingFound = false;

  htmlElements &&
    htmlElements.forEach((htmlElement: HTMLElement) => {
      if (htmlElement.hasAttribute(elementSelector.getAttribute())) {
        elementSettingFound = true;
      }
    });

  if (isDefault) {
    return elementSettingFound;
  }

  if (!elementSettingFound) {
    const queryElement = document.querySelector<HTMLElement>(elementSelector.getAttributeSelector());
    if (queryElement) {
      elementSettingFound = true;
    }
  }

  if (!elementSettingFound && !isDefault) {
    const elementSelectors = appliedTo.map((value: ElementItemSelector) => value.elementAttribute.appliedTo).flat();

    throw new AttributeNotFoundError(elementSelector, elementSelectors, true);
  }

  if (!elementSettingFound && isDefault) {
    return false;
  }

  return true;
}

export function elementExists(elementSelector: SchemaSelector, elements: HTMLElement[], appliedTo: DOMSelector[]) {
  if (elements.length <= 0) {
    throw new AttributeNotFoundError(elementSelector, appliedTo, false);
  }
  return true;
}

export function domElementExists(elementSelector: SchemaSelector, appliedTo: DOMSelector[]) {
  let domElementExists = false;

  if (appliedTo.length <= 0) {
    return true;
  }

  appliedTo.forEach((appliedToSelector: DOMSelector) => {
    if (domElementExists === true) {
      return;
    }

    const selectors = appliedToSelector.selectors;

    selectors.forEach((selector: string) => {
      if (domElementExists === true) {
        return;
      }

      const element = document.querySelector(selector);

      if (element) {
        domElementExists = true;
      }
    });
  });

  if (domElementExists === false) {
    throw new DOMForAttributeNotFound(elementSelector, appliedTo);
  }
}

export function elementDuplicated(elements: HTMLElement[], elementSelector: SchemaSelector) {
  if (elements.length > 1) {
    throw new AttributeDuplicateError(elementSelector);
  }

  return true;
}

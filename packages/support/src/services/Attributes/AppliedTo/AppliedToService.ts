import type { DOMSelector } from '@global/types/schema';
import { assertAttributeIsAppliedToElement } from '@src/services/DOM/Assertions/AssertionsService';
import { queryElementWithAttribute } from '@src/services/DOM/Queries/QueriesService';
import type { SchemaSelector, ElementItemSelector } from '@src/types/Schema.types';

import AttributeNotMatchAppliedToError from './Errors/AttributeNotMatchAppliedToError';

export function elementAppliedTo(elements: HTMLElement[], appliedTo: DOMSelector[], elementSelector: SchemaSelector) {
  let status = false;

  elements.forEach((element: HTMLElement) => {
    appliedTo.forEach((domSelector: DOMSelector) => {
      const { selectors } = domSelector;

      selectors.forEach((selector: string) => {
        if (selector === '*') {
          status = true;
          return;
        }

        // validate classnames
        if (selector.match(/^\./) && element.classList.contains(selector.replace(/^\./, ''))) {
          status = true;
          return;
        }

        // validate tags
        if (!selector.match(/^\./) && element.tagName.toLowerCase() === selector) {
          status = true;
          return;
        }

        // validate both tags and classnames
        if (selector.includes('.')) {
          const [tagName, classNames] = selector.split('.');
          if (element.classList.contains(classNames) && element.tagName.toLowerCase() === tagName) {
            status = true;
            return;
          }
        }
      });
    });
  });

  if (!status) {
    throw new AttributeNotMatchAppliedToError(elementSelector, appliedTo);
  }

  return true;
}

export function elementSettingAppliedTo(elementSelector: SchemaSelector, appliedTo: ElementItemSelector[]) {
  let status = false;
  let element: null | HTMLElement = null;

  appliedTo
    .map((value: ElementItemSelector) => value.elementSelector)
    .forEach((appliedToElement: SchemaSelector) => {
      const selectors: string[] = appliedToElement.getElementSelector().split(',');

      selectors.forEach((selector: string) => {
        try {
          assertAttributeIsAppliedToElement(elementSelector.getAttributeSelector(), selector);

          element = queryElementWithAttribute(elementSelector.getAttributeSelector(), selector);

          status = true;
        } catch {
          if (!status) {
            status = false;
          }
        }
      });
    });

  if (!status) {
    const appliedToSelectors = appliedTo.map((value: ElementItemSelector) => value.elementAttribute.appliedTo).flat();

    throw new AttributeNotMatchAppliedToError(elementSelector, appliedToSelectors);
  }

  return element;
}

export function elementsSameNode(appliedToElements: HTMLElement[], elementsDOM: HTMLElement[]) {
  let status = false;
  elementsDOM.forEach((element: HTMLElement) => {
    appliedToElements.forEach((appliedToElement: HTMLElement) => {
      if (appliedToElement.isSameNode(element)) {
        status = true;
      }
    });
  });

  if (!status) {
    throw new Error('Unexpected error: Attribute being tested are not in the same node. Contact support.');
  }
  return status;
}

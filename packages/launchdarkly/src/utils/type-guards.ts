import {
  isHTMLButtonElement,
  isHTMLInputElement,
  isHTMLSelectElement,
  isHTMLTextAreaElement,
} from '@finsweet/ts-utils';

import { VALUE_PROPERTY } from './constants';

/**
 * Defines type guards for elements that must support a specific property.
 */
export const PROPERTIES_TYPE_GUARDS = {
  /**
   * Ensures that an element supports the `.value` property.
   * @param element
   */
  [VALUE_PROPERTY](
    element: Element
  ): element is HTMLInputElement | HTMLButtonElement | HTMLSelectElement | HTMLTextAreaElement {
    return (
      isHTMLInputElement(element) ||
      isHTMLButtonElement(element) ||
      isHTMLSelectElement(element) ||
      isHTMLTextAreaElement(element)
    );
  },
};

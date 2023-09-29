import type { CMSItem } from '@finsweet/attributes-cmscore';

import { highlightText } from '../utils/highlightText';

/**
 * Adds/removes highlighting to the maching prop elements of a specific `CMSItem`.
 *
 * @param item A {@link CMSItem} instance.
 * @param highlightCSSClass The CSS Class to appy.
 */
export const toggleHighlight = ({ props }: CMSItem) => {
  for (const propKey in props) {
    const { elements, values, highlightData } = props[propKey];

    if (!highlightData) continue;

    for (const propValue of values) {
      const elementData = elements.get(propValue);
      if (!elementData) continue;

      const { element, originalHTML } = elementData;

      const existingHighlightData = highlightData.get(propValue);

      if (!existingHighlightData) {
        element.innerHTML = originalHTML;

        continue;
      }

      const { filterValue, highlightCSSClass } = existingHighlightData;

      element.innerHTML = highlightText(originalHTML, filterValue || propValue, highlightCSSClass);
    }
  }
};

/**
 * Clears all highlightings of a `CMSItem`.
 *
 * @param item The {@link CMSItem} to clear.
 */
export const restartHighlight = ({ props }: CMSItem) => {
  for (const propKey in props) props[propKey].highlightData = new Map();
};

import type { CMSItem } from '$packages/cmscore';

import { ATTRIBUTES } from './constants';

/**
 * Constants
 */
const {
  pseudo: { key: pseudoKey },
  class: { key: classKey },
} = ATTRIBUTES;

/**
 * Adds/removes the required CSS classes to the items.
 * @param items An array of {@link CMSItem}.
 */
export const addCSSClasses = (items: CMSItem[]) => {
  for (const { element } of items) {
    const { attributes } = element;

    for (const { name } of attributes) {
      if (!name.startsWith(pseudoKey)) continue;

      const index: string | undefined = name.split(`${pseudoKey}-`)[1];

      const pseudoAttribute = `${pseudoKey}${index ? `-${index}` : ''}`;
      const cssClassAttribute = `${classKey}${index ? `-${index}` : ''}`;

      const rawPseudoSelector = element.getAttribute(pseudoAttribute);
      const rawCSSClass = element.getAttribute(cssClassAttribute);

      if (!rawPseudoSelector || !rawCSSClass) continue;

      const pseudoSelector = rawPseudoSelector.replace(/^\:/, '');
      const cssClass = rawCSSClass.replace(/^\./, '');

      const matchesQuery = element.matches(`[${pseudoAttribute}]:${pseudoSelector}`);

      element.classList[matchesQuery ? 'add' : 'remove'](cssClass);
    }
  }
};

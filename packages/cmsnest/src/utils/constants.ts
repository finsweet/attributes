import { CMS_NEST_ATTRIBUTE } from '$global/constants/attributes';
import { generateSelectors } from '$global/factory';

const ATTRIBUTES_PREFIX = `fs-${CMS_NEST_ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const COLLECTION_SETTING_KEY = 'collection';
export const EMPTY_SETTING_KEY = 'empty';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a list to be combined into the target.
       */
      list: LIST_ELEMENT_KEY,
    },
  },

  /**
   * Defines a Collection List that will be nested inside the target list element.
   */
  collection: { key: `${ATTRIBUTES_PREFIX}-${COLLECTION_SETTING_KEY}` },

  /**
   * Defines an `Empty State` element.
   */
  empty: { key: `${ATTRIBUTES_PREFIX}-${EMPTY_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

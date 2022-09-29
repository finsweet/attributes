import { generateSelectors } from '$global/factory';

export const ATTRIBUTE = 'cmssave';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const REMOVE_ELEMENT_KEY = 'list';

export const COLLECTION_SETTING_KEY = 'collection';
export const FIELD_SETTING_KEY = 'field';
export const EMPTY_SETTING_KEY = 'empty';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a list to be instantiated.
       */
      list: LIST_ELEMENT_KEY,

      /**
       * Defines an element that will remove the saved item on click.
       */
      remove: REMOVE_ELEMENT_KEY,
    },
  },

  /**
   * Defines a Collection List key that will store saved items.
   */
  collection: { key: `${ATTRIBUTES_PREFIX}-${COLLECTION_SETTING_KEY}` },

  /**
   * Defines a field key.
   */
  field: { key: `${ATTRIBUTES_PREFIX}-${FIELD_SETTING_KEY}` },

  /**
   * Defines an `Empty State` element.
   */
  empty: { key: `${ATTRIBUTES_PREFIX}-${EMPTY_SETTING_KEY}` },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const LOCALSTORAGE_KEY = ATTRIBUTES_PREFIX;

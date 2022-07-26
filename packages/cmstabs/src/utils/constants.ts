import { CMS_TABS_ATTRIBUTE } from '@global/constants/attributes';
import { generateDynamicAttibuteValue, generateSelectors } from '@global/factory';

const ATTRIBUTES_PREFIX = `fs-${CMS_TABS_ATTRIBUTE}`;

export const LIST_ELEMENT_KEY = 'list';
export const TABS_ELEMENT_KEY = 'tabs';
export const TAB_LINK_ELEMENT_KEY = 'tab-link';

export const RESET_IX_SETTING_KEY = 'resetix';
export const RESET_IX_SETTING_VALUES = { true: 'true' } as const;

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a list to be included into the target tabs.
       */
      list: generateDynamicAttibuteValue(LIST_ELEMENT_KEY),

      /**
       * Defines the target tabs where all lists will be included into.
       */
      tabs: generateDynamicAttibuteValue(TABS_ELEMENT_KEY),

      /**
       * Defines the content that will be placed inside the generated `Tab Link` in the `Tabs Menu`.
       */
      tabLink: TAB_LINK_ELEMENT_KEY,
    },
  },

  /**
   * Defines if Webflow should be restarted after populating the tabs.
   */
  resetIx: { key: `${ATTRIBUTES_PREFIX}-${RESET_IX_SETTING_KEY}`, values: RESET_IX_SETTING_VALUES },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

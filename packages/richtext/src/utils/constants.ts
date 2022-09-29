import { RICH_TEXT_ATTRIBUTE } from '$global/constants/attributes';
import { generateSelectors } from '$global/factory/selectors';

const ATTRIBUTES_PREFIX = `fs-${RICH_TEXT_ATTRIBUTE}`;

export const RICH_TEXT_ELEMENT_KEY = 'rich-text';
export const COMPONENT_SETTING_KEY = 'component';
export const SANITIZE_SETTING_KEY = 'sanitize';
export const RESET_IX_SETTING_KEY = 'resetix';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a rich text block instance.
       */
      richText: RICH_TEXT_ELEMENT_KEY,
    },
  },

  /**
   * Defines a custom component.
   */
  component: { key: `${ATTRIBUTES_PREFIX}-${COMPONENT_SETTING_KEY}` },

  /**
   * Defines if the HTML should be sanitized before rendering it.
   */
  sanitize: { key: `${ATTRIBUTES_PREFIX}-${SANITIZE_SETTING_KEY}`, values: { true: 'true' } },

  /**
   * Defines if Webflow should be restarted after loading new items.
   */
  resetIx: { key: `${ATTRIBUTES_PREFIX}-${RESET_IX_SETTING_KEY}`, values: { true: 'true' } },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const IGNORE_LINE_PREFIX = '&lt;!-- fs-richtext-ignore --&gt;';

export const DOMPURIFY_SRC = 'https://cdn.jsdelivr.net/npm/dompurify@2/dist/purify.es.min.js';

import { generateSelectors } from '@global/factory/selectors';

export const ATTRIBUTE = 'codehighlight';

const ATTRIBUTES_PREFIX = `fs-${ATTRIBUTE}`;

export const CODE_ELEMENT_KEY = 'code';
export const LANGUAGES_SETTING_KEY = 'languages';
export const THEME_SETTING_KEY = 'theme';

export const ATTRIBUTES = {
  element: {
    key: `${ATTRIBUTES_PREFIX}-element`,
    values: {
      /**
       * Defines a `<code>` element that holds the code to be highlighted.
       */
      code: CODE_ELEMENT_KEY,
    },
  },

  /**
   * Defines the highlighting theme.
   */
  theme: {
    key: `${ATTRIBUTES_PREFIX}-${THEME_SETTING_KEY}`,
  },
} as const;

export const [getSelector, queryElement] = generateSelectors(ATTRIBUTES);

export const HIGHLIGHTJS_VERISON = '11.4.0';

export const HIGHLIGHTJS_SCRIPT_URL = `//cdn.jsdelivr.net/gh/highlightjs/cdn-release@${HIGHLIGHTJS_VERISON}/build/highlight.min.js`;

export const HIGHLIGHTJS_THEME_URL = (theme: string) =>
  `//cdn.jsdelivr.net/gh/highlightjs/cdn-release@${HIGHLIGHTJS_VERISON}/build/styles/${theme}.min.css`;

export const HIGHLIGHTJS_CUSTOM_THEMES: Record<string, string> = {
  webflow: 'https://cdn.jsdelivr.net/npm/@finsweet/attributes-codehighlight@1/themes/webflow.min.css',
};

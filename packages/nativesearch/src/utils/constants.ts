import { type AttributeElements, type AttributeSettings } from '@finsweet/attributes-utils';

export const ELEMENTS = [
  /**
   * The native search input the user interacts with.
   */
  'input',
  /**
   * The search results container where we append the fetched list.
   */
  'results',
  /**
   * The loader element which is shown when the search is loading.
   */
  'loader',
] as const satisfies AttributeElements;

export const SETTINGS = {
  /**
   * Optionally add a class to all elements of the Search Result Wrapper.
   * Added to the component wrapper of the search input
   * This can be used to customize the style/layout of any results list. For example, I can add “is-contact-page” to the Search Result Wrapper and all nested elements
   */
  addclass: {
    key: 'addclass',
  },
} as const satisfies AttributeSettings;

export const SEARCH_RESULTS_WRAPPER_CLASS = 'search-result-wrapper';

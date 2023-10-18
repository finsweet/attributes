import type { FormField } from '@finsweet/attributes-utils';

import type { MATCHES, MODES, TAG_FORMATS } from './constants';

/**
 * Main
 */
type Modes = typeof MODES;
type FilterMode = keyof Modes;
type ElementMode = Modes[FilterMode][number];

type Match = (typeof MATCHES)[number];

/**
 * Filters
 */
export interface FilterElement {
  /**
   * Defines the element that holds the filter value.
   */
  element: FormField;

  /**
   * The filter value.
   */
  value: string;

  /**
   * The Form Field type of the element.
   */
  type: string;

  /**
   * The amount of results for this particular element.
   */
  resultsCount: number;

  /**
   * An text element where to display the `resultsCount`.
   */
  resultsElement?: HTMLElement | null;

  /**
   * Defines if the element should be hidden when there are no `resultsCount`.
   */
  hideEmpty?: HTMLElement;

  /**
   * Defines if the element is currently hidden.
   */
  hidden: boolean;

  /**
   * Defines a {@link ElementMode}.
   */
  mode?: ElementMode;

  /**
   * Defines the Active CSS Class to add when the element is active.
   */
  activeCSSClass: string;

  /**
   * Defines the debouncing for this specific element.
   */
  debouncing: number;
}

export interface FilterData {
  /**
   * The elements that filter by the `filterKeys` of this filter.
   */
  elements: FilterElement[];

  /**
   * The `filterKey` indentifiers.
   */
  originalFilterKeys: string[];

  /**
   * The normalized `filterKey` indentifiers.
   */
  filterKeys: string[];

  /**
   * The current active values.
   */
  values: Set<string>;

  /**
   * The {@link Match} rule.
   */
  match?: Match;

  /**
   * A {@link FilterMode}.
   */
  mode?: FilterMode;

  /**
   * Defines if matching `CMSItemProps` should be highlighted.
   */
  highlight: boolean;

  /**
   * Defines the Highlight CSS Class to add to highlight targets.
   */
  highlightCSSClass: string;

  /**
   * Defines an override for the tag format of the filter.
   */
  tagFormat?: TagFormat;

  /**
   * Defines an override for the identifier display in the `category` tag format.
   */
  tagCategory?: string;
}

export type FiltersData = FilterData[];

/**
 * Reset Buttons
 */
export type ResetButtonsData = Map<HTMLElement, string[]>;

/**
 * Tags
 */
export interface TagData {
  /**
   * The tag element.
   */
  element: HTMLElement;

  /**
   * Defines the node where the tag text will be displayed.
   */
  textNode: Element;

  /**
   * The related filter data.
   */
  filterData: FilterData;

  /**
   * The sliced {@link FilterData.values} that represent this tag.
   */
  values: string[];
}

export type TagsData = TagData[];

export type TagFormat = (typeof TAG_FORMATS)[number];

export interface CMSItem {
  /**
   * The `Collection Item` element.
   */
  element: HTMLDivElement;

  /**
   * The `Collection List` parent element.
   */
  list: HTMLDivElement;

  /**
   * The element's current index in the rendered list.
   */
  currentIndex?: number;

  /**
   * The element's static place.
   * If defined, it will convert the item to non-interactive.
   * Meaning that it can't be sorted, nor filtered. It will always stay at the same place.
   */
  staticIndex?: number;

  /**
   * The URL of the item's `Template Page`.
   */
  href?: string;

  /**
   * The item's properties.
   * Defined by {@link CMSItemProps}.
   */
  props: CMSItemProps;

  /**
   * Defines if the item is valid to be rendered.
   */
  valid: boolean;

  /**
   * Promise that fulfills when the item is rendered to the DOM.
   */
  rendering?: Promise<void>;

  /**
   * Promise that fulfills when the item's render animation is fully finished.
   */
  animating?: Promise<void>;

  /**
   * Defines if the item needs a Webflow modules restart.
   */
  needsWebflowRestart: boolean;

  /**
   * Collects the props from child elements and stores them.
   * @param attributeKeys The attribute keys to use to collect the props.
   * @returns Nothing, it mutates the passed `CMSItem` instances.
   */
  collectProps({ fieldKey, typeKey, rangeKey }: { fieldKey: string; typeKey?: string; rangeKey?: string }): void;
}

interface CMSItemProps {
  [key: string]: {
    /**
     * Defines the prop values.
     */
    values: Set<string>;

    /**
     * Defines the elements that hold the prop values.
     * The Map is used as [propValue, data].
     */
    elements: Map<
      string,
      {
        /**
         * The prop element.
         */
        element: HTMLElement;

        /**
         * Stores the original outer HTML of the element before any mutations.
         */
        originalHTML: string;
      }
    >;

    /**
     * Defines filter values to highlight in a Map like:
     * ```
     * [propValue, data]
     * ```
     */
    highlightData?: Map<string, { filterValue?: string; highlightCSSClass: string }>;

    /**
     * Defines the type of the value.
     * @example `date`
     */
    type?: string | null;

    /**
     * Defines the mode of the prop.
     * @example `from` | `to`.
     */
    range?: string | null;
  };
}

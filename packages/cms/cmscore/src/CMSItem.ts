import type { CollectionListElement, CollectionItemElement } from '@finsweet/ts-utils';
import type { CMSItemProps } from './types';

/**
 * An instance of a `Collection List Item`.
 */
export class CMSItem {
  /**
   * The URL of the item's `Template Page`.
   */
  public readonly href?: string;

  /**
   * The item's properties.
   * Defined by {@link CMSItemProps}.
   */
  public props: CMSItemProps = {};

  /**
   * Defines if the item is valid to be rendered.
   */
  public valid = true;

  /**
   * Promise that fulfills when the item is rendered to the DOM.
   */
  public rendering?: Promise<void>;

  /**
   * Promise that fulfills when the item's render animation is fully finished.
   */
  public animating?: Promise<void>;

  /**
   * Defines if the item needs a Webflow `ix2` module restart.
   */
  public needsIx2Restart: boolean;

  /**
   * Defines if the item needs a Webflow `commerce` module restart.
   */
  public needsCommerceRestart: boolean;

  /**
   * @param element The DOM element of the item.
   * @param list The parent Collection List.
   */
  constructor(
    /**
     * The `Collection Item` element.
     */
    public readonly element: CollectionItemElement,

    /**
     * The `Collection List` parent element.
     */
    public readonly list: CollectionListElement,

    /**
     * The element's current index in the rendered DOM.
     */
    public currentIndex?: number
  ) {
    this.href = element.querySelector('a')?.href;

    const rendered = typeof currentIndex === 'number';

    this.needsIx2Restart = this.needsCommerceRestart = !rendered;
  }

  /**
   * Collects the props from child elements and stores them.
   * @param attributeKeys The attribute keys to use to collect the props.
   * @returns Nothing, it mutates the passed `CMSItem` instances.
   */
  public collectProps({ fieldKey, typeKey, rangeKey }: { fieldKey: string; typeKey?: string; rangeKey?: string }) {
    const { element, props } = this;

    const fieldElements = [...element.querySelectorAll<HTMLElement>(`[${fieldKey}]`)];

    for (const element of fieldElements) {
      const filterKey = element.getAttribute(fieldKey);
      const type = typeKey ? element.getAttribute(typeKey) : undefined;
      const range = rangeKey ? element.getAttribute(rangeKey) : undefined;

      const { textContent: propValue, innerHTML: originalHTML } = element;

      if (!filterKey || !propValue) continue;

      props[filterKey] ||= { type, range, values: new Set(), elements: new Map() };

      const prop = props[filterKey];
      const { values, elements } = prop;

      if (range === 'from' || range === 'to') {
        const newValues = [...values];
        newValues[range === 'from' ? 0 : 1] = propValue;

        prop.values = new Set(newValues);
      }

      values.add(propValue);

      if (!elements.has(propValue)) elements.set(propValue, { element, originalHTML });
    }
  }
}

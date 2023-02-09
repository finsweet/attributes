import type { CollectionItemElement, CollectionListElement } from '@finsweet/ts-utils';

import { normalizePropKey } from '$global/helpers';

import type { CMSItemProps } from './utils/types';

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
   * The element's current index in the rendered DOM.
   */
  public currentIndex?: number;

  /**
   * Promise that fulfills when the item is rendered to the DOM.
   */
  public rendering?: Promise<void>;

  /**
   * Promise that fulfills when the item's render animation is fully finished.
   */
  public animating?: Promise<void>;

  /**
   * Defines if the item needs a Webflow modules restart.
   */
  public needsWebflowRestart: boolean;

  /**
   * @param element The DOM element of the item.
   * @param list The parent Collection List.
   * @param staticIndex The element's static place, if defined.
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
     * The element's static place.
     * If defined, it will convert the item to non-interactive.
     * Meaning that it can't be sorted, nor filtered. It will always stay at the same place.
     */
    public readonly staticIndex?: number
  ) {
    this.href = element.querySelector('a')?.href;

    this.currentIndex = [...list.children].indexOf(element);

    const rendered = this.currentIndex >= 0;

    this.needsWebflowRestart = !rendered;
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
      const propKey = normalizePropKey(element.getAttribute(fieldKey));
      if (!propKey) return;

      const { textContent: propValue, innerHTML: originalHTML } = element;
      if (!propValue) continue;

      const type = typeKey ? element.getAttribute(typeKey) : undefined;
      const range = rangeKey ? element.getAttribute(rangeKey) : undefined;

      props[propKey] ||= { type, range, values: new Set(), elements: new Map() };

      const prop = props[propKey];
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

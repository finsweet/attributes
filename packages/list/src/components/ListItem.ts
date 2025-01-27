import {
  type CollectionItemElement,
  type CollectionListElement,
  isHTMLAnchorElement,
  normalizeDate,
  normalizeNumber,
} from '@finsweet/attributes-utils';
import { nanoid } from 'nanoid';

import { getCMSElementSelector } from '../utils/dom';
import { getAttribute, getSettingSelector, queryElement } from '../utils/selectors';

declare module '@vue/reactivity' {
  export interface RefUnwrapBailTypes {
    classes: ListItem;
  }
}

export type ListItemField =
  | {
      fieldKey: string;
      type: 'text';
      value: string | string[];
    }
  | {
      fieldKey: string;
      type: 'date';
      value: Date | Date[];
    }
  | {
      fieldKey: string;
      type: 'number';
      value: number | number[];
    };

type ListItemFields = {
  [fieldKey: string]: ListItemField;
};

/**
 * An instance of a list item.
 */
export class ListItem {
  public readonly id = nanoid();

  /**
   * The URL of the item's `Template Page`.
   */
  public readonly href?: string;

  /**
   * The item's properties.
   * Defined by {@link ListItemFields}.
   */
  public fields: ListItemFields = {};

  /**
   * Defines an awaitable Promise that resolves when the item's nesting is complete.
   */
  public nesting?: Promise<void>;

  /**
   * @param element The DOM element of the item.
   * @param listElement The parent Collection List.
   */
  constructor(
    /**
     * The `Collection Item` element.
     */
    public readonly element: CollectionItemElement,

    /**
     * The `Collection List` parent element.
     */
    public readonly listElement: CollectionListElement,

    /**
     * The element's current index in the rendered DOM.
     */
    public currentIndex?: number
  ) {
    let link = queryElement<HTMLAnchorElement>('item-link', { scope: element });

    if (!isHTMLAnchorElement(link)) {
      link = element.querySelector('a');
    }

    this.href = link?.href;

    this.collectFields();
  }

  /**
   * Collects the field values from child elements and stores them.
   */
  public collectFields() {
    const fieldSelector = getSettingSelector('field');
    const fieldElements = [...this.element.querySelectorAll<HTMLElement>(fieldSelector)];

    for (const element of fieldElements) {
      const fieldKey = getAttribute(element, 'field');
      if (!fieldKey) continue;

      const rawValue = element.textContent;
      if (!rawValue) continue;

      const type = getAttribute(element, 'type', true) || 'text';
      const value =
        type === 'number' ? normalizeNumber(rawValue) : type === 'date' ? normalizeDate(rawValue) : rawValue.trim();

      if (value === undefined) continue;

      const listSelector = getCMSElementSelector('list');
      const parentList = element.closest(listSelector);
      const isInsideNestedList = parentList && parentList !== this.listElement;

      if (isInsideNestedList) {
        this.fields[fieldKey] ||= { fieldKey, type, value: [] };

        const field = this.fields[fieldKey];

        if (field.type !== type) continue; // TODO: why are we doing this?
        if (!Array.isArray(field.value)) continue;
        if (field.value.some((v) => v === value)) continue;

        // @ts-expect-error - Value is guaranteed to be the right type
        field.value.push(value);
      } else {
        // @ts-expect-error - Value is guaranteed to be the right type
        this.fields[fieldKey] ||= { fieldKey, type, value };
      }
    }
  }
}

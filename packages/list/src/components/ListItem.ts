import {
  type CollectionItemElement,
  isHTMLAnchorElement,
  normalizeDate,
  normalizeNumber,
} from '@finsweet/attributes-utils';
import { nanoid } from 'nanoid';

import type { FieldValue, FilterTaskMatchedFields } from '../filter/types';
import { getCMSElementSelector } from '../utils/dom';
import { getAttribute, getSettingSelector, queryElement } from '../utils/selectors';
import type { List } from './List';

declare module '@vue/reactivity' {
  export interface RefUnwrapBailTypes {
    classes: ListItem;
  }
}

export type ListItemField =
  | {
      type: 'text';
      value: string | string[];
    }
  | {
      type: 'date';
      value: Date | Date[];
    }
  | {
      type: 'number';
      value: number | number[];
    };

type ListItemFieldElements = {
  [fieldKey: string]: Array<{
    value: FieldValue;
    element: HTMLElement;
    originalHTML: string;
  }>;
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
   * The item's field elements.
   */
  public fieldElements: ListItemFieldElements = {};

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
    public readonly list: List,

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
    this.fields = {};
    this.fieldElements = {};

    const fieldSelector = getSettingSelector('field');
    const fieldElements = [...this.element.querySelectorAll<HTMLElement>(fieldSelector)];

    for (const element of fieldElements) {
      const fieldKey = getAttribute(element, 'field');
      if (!fieldKey) continue;

      const rawValue = element.textContent;
      if (!rawValue) continue;

      const type = getAttribute(element, 'fieldtype', { filterInvalid: true }) || 'text';
      const value =
        type === 'number' ? normalizeNumber(rawValue) : type === 'date' ? normalizeDate(rawValue) : rawValue.trim();

      if (value === undefined) continue;

      this.fieldElements[fieldKey] ||= [];
      this.fieldElements[fieldKey].push({ value, element, originalHTML: element.innerHTML });

      const listSelector = getCMSElementSelector('list');
      const parentList = element.closest(listSelector);
      const isInsideNestedList = this.list.listElement && parentList && parentList !== this.list.listElement; // TODO: support custom lists and nested lists via `fs-list-element="nest-target"`

      if (isInsideNestedList) {
        this.fields[fieldKey] ||= { type, value: [] };

        const field = this.fields[fieldKey];

        if (field.type !== type) continue;
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

  /**
   * Highlights the item's fields based on the matching values.
   * @param matchedFields
   */
  public highlight(matchedFields: FilterTaskMatchedFields) {
    if (!this.list.highlight) return;

    for (const fieldKey in this.fields) {
      const fieldElementsData = this.fieldElements[fieldKey];
      if (!fieldElementsData) continue;

      // If the field is not matched, reset the original HTML
      const matchedField = matchedFields[fieldKey];
      if (!matchedField) {
        for (const { element, originalHTML } of fieldElementsData) {
          element.innerHTML = originalHTML;
        }

        continue;
      }

      // If matched, highlight the corresponding elements
      for (const { value, element, originalHTML } of fieldElementsData) {
        const match = matchedField.find(({ fieldValue }) => fieldValue === value);
        if (!match) {
          element.innerHTML = originalHTML;
          continue;
        }

        const regex = new RegExp(match.filterValue, 'gi');

        element.innerHTML = originalHTML.replace(regex, `<span class="${this.list.highlightClass}">$&</span>`);
      }
    }
  }
}

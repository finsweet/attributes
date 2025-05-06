import {
  type CollectionItemElement,
  isHTMLAnchorElement,
  normalizeDate,
  normalizeNumber,
} from '@finsweet/attributes-utils';

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
      rawValue: string | string[];
      value: string | string[];
    }
  | {
      type: 'date';
      rawValue: string | string[];
      value: Date | Date[];
    }
  | {
      type: 'number';
      rawValue: string | string[];
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
  public readonly id = crypto.randomUUID();

  /**
   * The URL of the item's `Template Page`.
   */
  public readonly href?: string;

  /**
   * Defines the class to apply when highlighting matched fields.
   */
  public readonly highlightClass: string;

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
    this.highlightClass = getAttribute(element, 'highlightclass');

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
        this.fields[fieldKey] ||= { type, rawValue: [], value: [] };

        const field = this.fields[fieldKey];

        if (field.type !== type) continue;
        if (!Array.isArray(field.value)) continue;
        if (!Array.isArray(field.rawValue)) continue;
        if (field.value.some((v) => v === value)) continue;
        if (field.rawValue.some((v) => v === rawValue)) continue;

        // @ts-expect-error - Value is guaranteed to be the right type
        field.value.push(value);
        field.rawValue.push(rawValue);
      } else {
        // @ts-expect-error - Value is guaranteed to be the right type
        this.fields[fieldKey] ||= { fieldKey, type, rawValue, value };
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
        element.innerHTML = originalHTML;

        const match = matchedField.find(({ fieldValue }) => fieldValue === value);
        if (!match) continue;

        const regex = new RegExp(match.filterValue, 'gi');

        const walkNodes = (parent: Node) => {
          for (const node of Array.from(parent.childNodes)) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              walkNodes(node);
              continue;
            }

            if (node.nodeType !== Node.TEXT_NODE) continue;

            const text = node.textContent || '';

            if (!regex.test(text)) continue;

            const template = document.createElement('template');
            template.innerHTML = text.replace(regex, `<span class="${this.highlightClass}">$&</span>`);

            node.replaceWith(template.content);
          }
        };

        walkNodes(element);
      }
    }
  }
}

import {
  type CollectionItemElement,
  type CollectionListElement,
  normalizeDate,
  normalizeNumber,
} from '@finsweet/attributes-utils';

import { getAttribute, getSettingSelector } from '../utils/selectors';

type ListItemFields = {
  [field: string]:
    | {
        type: 'text';
        value: string[];
      }
    | {
        type: 'date';
        value: Date[];
      }
    | {
        type: 'number';
        value: number[];
      };
};

/**
 * An instance of a list item.
 */
export class ListItem {
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
   * The element's current index in the rendered DOM.
   */
  public currentIndex?: number;

  /**
   * Defines if the item needs a Webflow modules restart.
   */
  public needsWebflowRestart: boolean;

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
    public readonly listElement: CollectionListElement
  ) {
    this.href = element.querySelector('a')?.href;

    this.currentIndex = [...listElement.children].indexOf(element);

    const rendered = this.currentIndex >= 0;

    this.needsWebflowRestart = !rendered;

    this.collectFields();
  }

  /**
   * Collects the field values from child elements and stores them.
   */
  public collectFields() {
    const { element, fields } = this;

    const fieldElements = [...element.querySelectorAll<HTMLElement>(getSettingSelector('field'))];

    for (const element of fieldElements) {
      const fieldKey = getAttribute(element, 'field');
      if (!fieldKey) continue;

      const rawValue = element.textContent;
      if (!rawValue) continue;

      const type = getAttribute(element, 'type', true) || 'text';
      const value =
        type === 'number' ? normalizeNumber(rawValue) : type === 'date' ? normalizeDate(rawValue) : rawValue.trim();

      if (value === undefined) continue;

      fields[fieldKey] ||= { type, value: [] };

      if (fields[fieldKey].type === type) {
        // @ts-expect-error value is guaranteed to be the right type
        fields[fieldKey].value.push(value);
      }
    }
  }
}

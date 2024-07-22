import { isHTMLSelectElement } from '@finsweet/attributes-utils';

import type { List } from '../components';
import { queryAllElements } from '../utils/selectors';

/**
 * Inits the list select dropdowns.
 * @param list
 * @param selectElements
 */
export const initListSelects = (list: List, selectElements: HTMLElement[]) => {
  list.webflowModules.add('slider');

  selectElements.forEach((sliderReference) => initListSelect(list, sliderReference));
};

/**
 * Inits a list select dropdown.
 * @param list
 * @param selectElement
 */
const initListSelect = (list: List, selectElement: HTMLElement) => {
  if (!isHTMLSelectElement(selectElement)) return;

  // Store rendered options
  const renderedOptions = new Map<string, HTMLOptionElement>();

  // Handle items
  list.addHook('render', (items = []) => {
    const allOptionValues = new Set<string>();

    for (const item of items) {
      const optionValues = queryAllElements('select-value', { scope: item.element });

      for (const optionValue of optionValues) {
        allOptionValues.add(optionValue.innerText);
      }
    }

    for (const optionValue of allOptionValues) {
      if (renderedOptions.has(optionValue)) continue;

      const option = new Option(optionValue, optionValue);

      selectElement.options.add(option);
      renderedOptions.set(optionValue, option);
    }

    for (const [optionValue, option] of renderedOptions) {
      if (allOptionValues.has(optionValue)) continue;

      option?.remove();
      renderedOptions.delete(optionValue);
    }
  });
};

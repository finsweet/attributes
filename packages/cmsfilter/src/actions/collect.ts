import {
  extractCommaSeparatedValues,
  FORM_CSS_CLASSES,
  type FormBlockElement,
  isFormField,
  isHTMLInputElement,
  normalizePropKey,
  parseNumericAttribute,
  sameValues,
} from '@finsweet/attributes-utils';

import { ensureUniqueFormFieldId } from '../utils/a11y';
import {
  getAttribute,
  getSettingSelector,
  hasAttributeValue,
  queryAllElements,
  queryElement,
} from '../utils/selectors';
import type { FilterData, FilterElement, FiltersData, ResetButtonsData } from '../utils/types';
import { handleFilterInput } from './input';

/**
 * Collects the base elements of the Filters system: the form, submit button and reset buttons.
 * @param formBlock The Filters Form Block.
 */
export const collectFiltersElements = (
  formBlock: FormBlockElement
): {
  form: HTMLFormElement;
  submitButton: HTMLInputElement | null;
  resetButtonsData: ResetButtonsData;
} => {
  const form = formBlock.querySelector('form') as HTMLFormElement;
  const submitButton = formBlock.querySelector<HTMLInputElement>('input[type="submit"]');

  const resetButtonElements = [...queryAllElements('clear', { scope: formBlock })];

  const resetButtonsData: ResetButtonsData = new Map();

  for (const resetButton of resetButtonElements) {
    const rawFilterKeys = getAttribute(resetButton, 'clear');
    const filterKeys = rawFilterKeys
      ? [...new Set(extractCommaSeparatedValues(rawFilterKeys))].map((filterKey) => normalizePropKey(filterKey))
      : [];

    resetButtonsData.set(resetButton, filterKeys);
  }

  return { form, submitButton, resetButtonsData };
};

/**
 * Collects the data of each filter input:
 * - The filter elements.
 * - The filter keys.
 * - The filter mode.
 * - The fixed value, if existing.
 * - The highlight mode.
 *
 * @param form The form that contains the filter fields.
 * @param globalActiveCSSClass The global active CSS Class.
 * @param globalDebouncing The global debouncing value for `input` events.
 * @param highlightAll Defines if all matching values must be highlighted.
 * @param globalHighlightCSSClass The global highlight CSS Class.
 *
 * @returns A {@link FiltersData} Map and a {@link FilterKeyResults} object.
 */
export const collectFiltersData = (
  form: HTMLFormElement,
  globalActiveCSSClass: string,
  globalDebouncing: number,
  highlightAll: boolean,
  globalHighlightCSSClass: string
): FiltersData => {
  const filtersData: FiltersData = [];

  const elements = form.querySelectorAll<HTMLElement>(getSettingSelector('field'));

  elements.forEach((element, index) => {
    // Collect the filter keys
    const rawFilterKeys = getAttribute(element, 'field');
    if (!rawFilterKeys) return;

    const originalFilterKeys = [...new Set(extractCommaSeparatedValues(rawFilterKeys))];

    const filterKeys = originalFilterKeys.map((filterKey) => normalizePropKey(filterKey));

    if (!filterKeys.length) return;

    // Collect settings
    const settings = collectGlobalFilterSettings(
      element,
      originalFilterKeys,
      filterKeys,
      globalActiveCSSClass,
      globalDebouncing,
      highlightAll,
      globalHighlightCSSClass
    );

    if (!settings) return;

    const [globalFilterData, globalElementData] = settings;

    // Collect existing data
    const existingData = filtersData.find((data) => sameValues(filterKeys, data.filterKeys));

    const filterData = existingData || {
      ...globalFilterData,
      elements: [],
    };

    if (!existingData) filtersData.push(filterData);

    // Handle Checkboxes or Radios
    const checkboxOrRadioField = element.closest<HTMLLabelElement>(
      `.${FORM_CSS_CLASSES.checkboxField}, .${FORM_CSS_CLASSES.radioField}`
    );

    if (checkboxOrRadioField) {
      const isCheckbox = isHTMLInputElement(element);

      const value = isCheckbox ? 'true' : element.textContent || '';

      const fieldElement = isCheckbox ? element : (checkboxOrRadioField.querySelector('input') as HTMLInputElement);

      ensureUniqueFormFieldId(fieldElement, index);

      const resultsElement = queryElement('filter-results-count', {
        scope: checkboxOrRadioField,
      });

      const mustHideEmpty = hasAttributeValue(element, 'hideempty', 'true');
      const hideEmpty = mustHideEmpty ? checkboxOrRadioField : undefined;

      const elementData: FilterElement = {
        ...globalElementData,
        value,
        resultsElement,
        hideEmpty,
        element: fieldElement,
        type: fieldElement.type,
      } as const;

      filterData.elements.push(elementData);

      // Collect initial value
      handleFilterInput(fieldElement, filterData, elementData);

      return;
    }

    // Handle other Form Fields
    if (!isFormField(element) || element.type === 'submit') return;

    const { type, value } = element;

    ensureUniqueFormFieldId(element, index);

    const elementData: FilterElement = {
      ...globalElementData,
      element,
      type,
      value,
    };

    filterData.elements.push(elementData);

    // Collect initial value
    if (type === 'select-one') handleFilterInput(element, filterData, elementData);
  });

  return filtersData;
};

/**
 * Collects the global settings from a filter element.
 *
 * @param element The filter element.
 * @param originalFilterKeys The filter keys.
 * @param filterKeys The normalized filter keys.
 * @param globalActiveCSSClass The global active CSS Class.
 * @param globalDebouncing The global debouncing value for `input` events.
 * @param highlightAll Defines if all matching values must be highlighted.
 * @param globalHighlightCSSClass The global highlight CSS Class.
 *
 * @returns A tuple with [globalFilterData, globalElementData].
 */
const collectGlobalFilterSettings = (
  element: HTMLElement,
  originalFilterKeys: string[],
  filterKeys: string[],
  globalActiveCSSClass: string,
  globalDebouncing: number,
  highlightAll: boolean,
  globalHighlightCSSClass: string
) => {
  const match = getAttribute(element, 'match', true);
  const tagFormat = getAttribute(element, 'tagformat', true);
  const tagCategory = getAttribute(element, 'tagcategory');
  const highlight = highlightAll || hasAttributeValue(element, 'highlight', 'true');

  const rawActiveCSSClass = getAttribute(element, 'active');
  const rawDebouncing = getAttribute(element, 'debounce');
  const rawHighlightCSSClass = getAttribute(element, 'highlightclass');

  const activeCSSClass = rawActiveCSSClass || globalActiveCSSClass;
  const debouncing = parseNumericAttribute(rawDebouncing, globalDebouncing);
  const highlightCSSClass = rawHighlightCSSClass || globalHighlightCSSClass;

  const rangeMode = getAttribute(element, 'range', true);

  const filterMode = rangeMode ? 'range' : undefined;
  const elementMode = rangeMode;

  // Collect global data
  const globalFilterData: Omit<FilterData, 'elements'> = {
    match,
    filterKeys,
    originalFilterKeys,
    highlight,
    tagFormat,
    tagCategory,
    highlightCSSClass,
    mode: filterMode,
    values: new Set(),
  };

  const globalElementData: Omit<FilterElement, 'element' | 'value' | 'type'> = {
    activeCSSClass,
    debouncing,
    resultsCount: 0,
    mode: elementMode,
    hidden: false,
  };

  return [globalFilterData, globalElementData] as const;
};

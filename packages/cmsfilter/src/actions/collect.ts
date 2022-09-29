import {
  extractCommaSeparatedValues,
  FORM_CSS_CLASSES,
  getObjectEntries,
  isFormField,
  isKeyOf,
  sameValues,
} from '@finsweet/ts-utils';
import type { FormBlockElement } from '@finsweet/ts-utils';

import { normalizePropKey } from '$packages/cmscore';

import { ensureUniqueFormFieldId } from '../utils/a11ty';
import { ATTRIBUTES, getSelector, MATCHES, MODES, queryElement, TAG_FORMATS } from '../utils/constants';
import type { FilterData, FilterElement, FiltersData, ResetButtonsData } from '../utils/types';
import { handleFilterInput } from './input';

// Constants
const {
  field: { key: fieldKey },
  reset: { key: resetKey },
  range: { key: rangeKey },
  match: { key: matchKey },
  tagFormat: { key: tagFormatKey },
  tagCategory: { key: tagCategoryKey },
  hideEmpty: { key: hideEmptyKey, values: hideEmptyValues },
  highlight: { key: highlightKey, values: highlightValues },
  highlightCSS: { key: highlightCSSKey },
  activeCSS: { key: activeCSSKey },
  debouncing: { key: debouncingKey },
} = ATTRIBUTES;

const { checkboxField: checkboxFieldCSSClass, radioField: radioFieldCSSClass } = FORM_CSS_CLASSES;

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

  const resetButtonElements = formBlock.querySelectorAll<HTMLElement>(
    getSelector('element', 'reset', { operator: 'prefixed' })
  );
  const resetButtonsData: ResetButtonsData = new Map();

  for (const resetButton of resetButtonElements) {
    const rawFilterKeys = resetButton.getAttribute(resetKey);
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

  const elements = form.querySelectorAll<HTMLElement>(getSelector('field'));

  elements.forEach((element, index) => {
    // Collect the filter keys
    const rawFilterKeys = element.getAttribute(fieldKey);
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
    const checkboxOrRadioField = element.closest<HTMLLabelElement>(`.${checkboxFieldCSSClass}, .${radioFieldCSSClass}`);

    if (checkboxOrRadioField) {
      const isCheckbox = element instanceof HTMLInputElement;

      const value = isCheckbox ? 'true' : element.textContent || '';

      const fieldElement = isCheckbox ? element : (checkboxOrRadioField.querySelector('input') as HTMLInputElement);

      ensureUniqueFormFieldId(fieldElement, index);

      const resultsElement = queryElement<HTMLElement>('filterResultsCount', {
        operator: 'prefixed',
        scope: checkboxOrRadioField,
      });

      const mustHideEmpty = element.getAttribute(hideEmptyKey) === hideEmptyValues.true;
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
  const [rawMatch, rawTagFormat, rawActiveCSSClass, rawDebouncing, rawHighlight, rawHighlightCSSClass] = [
    matchKey,
    tagFormatKey,
    activeCSSKey,
    debouncingKey,
    highlightKey,
    highlightCSSKey,
  ].map((key) => element.getAttribute(key));

  const match = isKeyOf(rawMatch, MATCHES) ? rawMatch : undefined;
  const tagFormat = isKeyOf(rawTagFormat, TAG_FORMATS) ? rawTagFormat : undefined;
  const tagCategory = element.getAttribute(tagCategoryKey);
  const activeCSSClass = rawActiveCSSClass || globalActiveCSSClass;
  const debouncing = rawDebouncing ? parseFloat(rawDebouncing) : globalDebouncing;
  const highlight = highlightAll || rawHighlight === highlightValues.true;
  const highlightCSSClass = rawHighlightCSSClass || globalHighlightCSSClass;

  const rawMode = element.getAttribute(rangeKey);

  let filterMode: FilterData['mode'] | undefined;
  let elementMode: FilterElement['mode'] | undefined;

  for (const [key, value] of getObjectEntries(MODES)) {
    if (isKeyOf(rawMode, value)) {
      filterMode = key;
      elementMode = rawMode;
      break;
    }
  }

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

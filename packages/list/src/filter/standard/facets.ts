import { isHTMLInputElement, isHTMLSelectElement } from '@finsweet/attributes-utils';
import { toRaw, watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { ListItem } from '../../components';
import type { List } from '../../components/List';
import { getAttribute, getElementSelector, getSettingSelector, queryElement } from '../../utils/selectors';
import { filterItems } from '../filter';
import type { FilterOperator, Filters } from '../types';
import { getConditionOperator } from './conditions';

/**
 * Initializes a specific filter's results count.
 * @param list
 * @param form
 * @param groupIndex
 */
export const initFacets = (list: List, form: HTMLFormElement, groupIndex: number) => {
  const cleanups = [...form.elements].map((formField) => {
    const isInput = isHTMLInputElement(formField);
    const isSelect = isHTMLSelectElement(formField);
    if (!isInput && !isSelect) return;

    const handler = isInput
      ? createInputFacetsHandler(list, formField, groupIndex)
      : createSelectOptionsFacetsHandler(list, formField, groupIndex);

    if (!handler) return;

    const itemsCleanup = watch(list.items, (items) => handler({ items }));
    const filtersCleanup = watch(list.filters, (filters) => handler({ filters }), { deep: true, immediate: true });

    return () => {
      itemsCleanup();
      filtersCleanup();
    };
  });

  return () => {
    for (const cleanup of cleanups) {
      cleanup?.();
    }
  };
};

/**
 * Creates a handler for input facets.
 * @param list
 * @param formField
 * @param groupIndex
 */
const createInputFacetsHandler = (list: List, formField: HTMLInputElement, groupIndex: number) => {
  const fieldKey = getAttribute(formField, 'field');
  if (!fieldKey) return;

  const facetCountElement = queryElement('facet-count', { scope: formField.parentElement });
  const hideOnEmptyETarget = formField.closest<HTMLElement>(getSettingSelector('emptyfacet', 'hide'));
  const addClassOnEmptyTarget = formField.closest<HTMLElement>(getSettingSelector('emptyfacet', 'add-class'));

  if (!facetCountElement && !hideOnEmptyETarget && !addClassOnEmptyTarget) return;

  const op = getConditionOperator(formField);
  const value = getAttribute(formField, 'value') || formField.value || '';
  const emptyClassName = getAttribute(addClassOnEmptyTarget, 'emptyfacetclass');

  const handler = debounce(
    ({ filters = list.filters.value, items = list.items.value }: { filters?: Filters; items?: ListItem[] }) => {
      triggerFacetFilter({
        filters,
        items,
        fieldKey,
        op,
        groupIndex,
        value,
      })?.then((filteredItems) => {
        const hasResults = filteredItems.length > 0;

        if (facetCountElement) {
          facetCountElement.textContent = `${filteredItems.length}`;
        }

        if (hideOnEmptyETarget) {
          hideOnEmptyETarget.style.display = hasResults ? '' : 'none';
        }

        if (addClassOnEmptyTarget) {
          addClassOnEmptyTarget.classList.toggle(emptyClassName, !hasResults);
        }
      });
    },
    0
  );

  return handler;
};

/**
 * Creates a handler for select options facets.
 * @param list
 * @param formField
 * @param groupIndex
 */
const createSelectOptionsFacetsHandler = (list: List, formField: HTMLSelectElement, groupIndex: number) => {
  const fieldKey = getAttribute(formField, 'field');
  if (!fieldKey) return;

  const op = getConditionOperator(formField);
  const displayFacetCounts = formField.matches(getElementSelector('facet-count'));
  const hideOnEmpty = getAttribute(formField, 'emptyfacet', { filterInvalid: true }) === 'hide';

  const options: HTMLOptionElement[] = [...formField.options];
  const optionLabels = options.reduce(
    (acc, option) => acc.set(option, option.value),
    new Map<HTMLOptionElement, string>()
  );

  if (!options.length) return;

  const handler = debounce(
    ({ filters = list.filters.value, items = list.items.value }: { filters?: Filters; items?: ListItem[] }) => {
      for (const option of options) {
        const { value } = option;
        if (!value) continue;

        triggerFacetFilter({
          filters,
          items,
          fieldKey,
          op,
          groupIndex,
          value,
        })?.then((filteredItems) => {
          const disabled = !filteredItems.length;

          if (displayFacetCounts) {
            const label = optionLabels.get(option) || '';
            option.label = `${label} (${filteredItems.length})`;
          }

          if (hideOnEmpty && !option.selected) {
            option.style.display = disabled ? 'none' : '';
            option.disabled = disabled;
          }
        });
      }
    },
    0
  );

  return handler;
};

/**
 * Triggers a facet search.
 * @param params
 * @returns The promise of the filtered items.
 */
const triggerFacetFilter = ({
  filters,
  items,
  fieldKey,
  op,
  groupIndex,
  value,
}: {
  filters: Filters;
  items: ListItem[];
  fieldKey: string;
  op: FilterOperator;
  groupIndex: number;
  value: string;
}) => {
  const filtersClone = structuredClone(toRaw(filters)) as Filters;

  const conditionsGroup = filtersClone.groups[groupIndex];
  if (!conditionsGroup) return;

  const { conditions = [] } = conditionsGroup;
  const conditionIndex = conditions.findIndex((c) => c.fieldKey === fieldKey && c.op === op);

  const condition = conditions[conditionIndex];
  if (!condition) return;

  // Inject the condition value
  if (Array.isArray(condition.value)) {
    if (condition.filterMatch === 'and') {
      condition.value.push(value);
    } else {
      condition.value = [value];
    }
  } else {
    condition.value = value;
  }

  return filterItems(filtersClone, items);
};

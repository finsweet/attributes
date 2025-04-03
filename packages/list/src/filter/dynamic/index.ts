import { cloneNode } from '@finsweet/attributes-utils';
import { computed, shallowRef, watch } from '@vue/reactivity';

import type { List } from '../../components/List';
import { queryElement } from '../../utils/selectors';
import type { AllFieldsData, FilterMatch } from '../types';
import { type ConditionGroup, initConditionGroup, initConditionGroupsAdd, initConditionGroupsMatch } from './groups';
import { getFilterMatchValue } from './utils';

/**
 * Inits dynamic filters for a list.
 * @param list
 * @param form
 * @returns A cleanup function
 */
export const initDynamicFilters = (list: List, form: HTMLFormElement) => {
  const conditionGroupElement = queryElement('condition-group', { scope: form });
  if (!conditionGroupElement) return;

  const conditionGroupsWrapper = conditionGroupElement.parentElement;
  if (!conditionGroupsWrapper) return;

  watch(list.filters, (f) => console.log(f), { deep: true });

  const conditionGroupTemplate = cloneNode(conditionGroupElement);
  const conditionGroups = shallowRef<ConditionGroup[]>([]);

  const cleanups = new Set<() => void>();

  // Collect all fields' data
  const allFieldsData = computed(() =>
    list.items.value.reduce<AllFieldsData>((acc, item) => {
      for (const [key, field] of Object.entries(item.fields)) {
        acc[key] ||= {
          type: field.type,
          valueType: Array.isArray(field.value) ? 'multiple' : 'single',
          rawValues: new Set<string>(),
        };

        const fieldRawValues = Array.isArray(field.rawValue) ? field.rawValue : [field.rawValue];

        for (const rawValue of fieldRawValues) {
          acc[key].rawValues.add(rawValue);
        }
      }

      return acc;
    }, {})
  );

  // Handle adding condition groups
  const conditionGroupAddButton =
    queryElement('condition-group-add', { scope: form }) || queryElement('condition-groups-add', { scope: form });

  if (conditionGroupAddButton) {
    const cleanup = initConditionGroupsAdd(
      list,
      conditionGroupAddButton,
      conditionGroupTemplate,
      conditionGroupsWrapper,
      conditionGroups,
      allFieldsData
    );

    cleanups.add(cleanup);
  }

  // Handle condition groups matching
  let groupsMatch: FilterMatch = 'and';

  const conditionGroupMatchSelect =
    queryElement<HTMLSelectElement>('condition-group-match', { scope: form }) ||
    queryElement<HTMLSelectElement>('condition-groups-match', { scope: form });

  if (conditionGroupMatchSelect) {
    groupsMatch = getFilterMatchValue(conditionGroupMatchSelect);

    const cleanup = initConditionGroupsMatch(list, conditionGroupMatchSelect, conditionGroups);
    cleanups.add(cleanup);
  }

  list.filters.value.groupsMatch = groupsMatch;

  // Init default condition group
  initConditionGroup(list, conditionGroupElement, conditionGroups, allFieldsData);

  return () => {
    for (const conditionGroup of conditionGroups.value) {
      conditionGroup.cleanup();
    }

    for (const cleanup of cleanups) {
      cleanup();
    }

    cleanups.clear();
  };
};

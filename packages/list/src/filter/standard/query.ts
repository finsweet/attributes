import { isNotEmpty } from '@finsweet/attributes-utils';

import type { List } from '../../components';
import { SETTINGS } from '../../utils/constants';
import { listInstancesStore } from '../../utils/store';

/**
 * @param list
 * @returns A regex to match the filters query string.
 */
const getListFiltersQueryRegex = (list: List) => {
  const allFieldKeys = Object.keys(list.allFieldsData.value);

  const regex = new RegExp(`^(?:([0-9]+)_)?(${allFieldKeys.join('|')})(?:_(${SETTINGS.operator.values.join('|')}))?$`);
  return regex;
};

/**
 * Gets the filters query string for the list.
 * @param list
 */
export const getListFiltersQuery = async (list: List) => {
  const usePrefix = listInstancesStore.size > 1;
  const existingParams = await list.getAllSearchParams(usePrefix);

  const regex = getListFiltersQueryRegex(list);
  const params = existingParams.filter(([key]) => key.match(regex));

  for (const [key, value] of params) {
    const match = key.match(regex);
    if (!match) continue;

    const groupIndex = match[1] ? parseInt(match[1]) : 0;
    const fieldKey = match[2];
    const op = match[3] ? match[3] : undefined;

    const condition = list.filters.value.groups[groupIndex]?.conditions.find(
      (c) => c.fieldKey === fieldKey && c.op === op
    );

    if (!condition) continue;

    try {
      condition.value = JSON.parse(value);
      condition.interacted = true;
    } catch {
      // Skip
    }
  }
};

/**
 * Sets the filters query string for the list.
 * @param list
 */
export const setListFiltersQuery = async (list: List) => {
  const usePrefix = listInstancesStore.size > 1;
  const existingParams = await list.getAllSearchParams(usePrefix);

  const regex = getListFiltersQueryRegex(list);

  for (const [key] of existingParams) {
    if (!key.match(regex)) continue;

    await list.setSearchParam(key, null, usePrefix);
  }

  const multipleGroups = list.filters.value.groups.length > 1;

  list.filters.value.groups.forEach((group, index) => {
    group.conditions.forEach(({ fieldKey, op, value, interacted }) => {
      if (!value || !interacted) return;

      const key = [multipleGroups ? index : undefined, fieldKey, op].filter(isNotEmpty).join('_');

      try {
        list.setSearchParam(key, JSON.stringify(value), usePrefix);
      } catch {
        // Skip
      }
    });
  });
};

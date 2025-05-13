import type { List } from '../components';
import { listInstancesStore } from '../utils/store';
import type { SortingDirection } from './types';

/**
 * @param list
 * @returns A regex to match the filters query string.
 */
const getListSortingQueryRegex = (list: List) => {
  const allFieldKeys = Object.keys(list.allFieldsData.value);

  const regex = new RegExp(`sort_(${allFieldKeys.join('|')})$`);
  return regex;
};

/**
 * Gets the filters query string for the list.
 * @param list
 */
export const getListSortingQuery = async (list: List) => {
  const usePrefix = listInstancesStore.size > 1;
  const existingParams = await list.getAllSearchParams(usePrefix);

  const regex = getListSortingQueryRegex(list);

  const param = existingParams.find(([key, value]) => key.match(regex) && (value === 'asc' || value === 'desc'));
  if (!param) return;

  const [key, value] = param;

  const match = key.match(regex);
  if (!match) return;

  const fieldKey = match[1];

  list.sorting.value.fieldKey = fieldKey;
  list.sorting.value.direction = value as SortingDirection;
  list.sorting.value.interacted = true;
};

/**
 * Sets the filters query string for the list.
 * @param list
 */
export const setListSortingQuery = async (list: List) => {
  const usePrefix = listInstancesStore.size > 1;
  const existingParams = await list.getAllSearchParams(usePrefix);

  const regex = getListSortingQueryRegex(list);

  for (const [key] of existingParams) {
    if (!key.match(regex)) continue;

    await list.setSearchParam(key, null, usePrefix);
  }

  const { fieldKey, direction } = list.sorting.value;
  if (!fieldKey || !direction) return;

  const key = `sort_${fieldKey}`;

  list.setSearchParam(key, direction, usePrefix);
};

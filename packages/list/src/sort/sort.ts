import type { ListItem } from '../components/ListItem';
import type { Sorting } from './types';

/**
 * Sorts the items of a `CMSList`.
 * **Important:** This method mutates the {@link ListItem.items} property.
 *
 * @param listInstance The {@link CMSList} instance.
 * @param direction The direction to sort.
 * @param sortKey The key of the field to use as sorting reference.
 */
export const sortListItems = (items: ListItem[], { field, direction }: Sorting): ListItem[] | undefined => {
  const validField = !!direction && !!field && items.some(({ fields }) => field in fields);
  if (!validField) return;

  const sorted = [...items].sort((firstItem, secondItem) => {
    const firstItemProp = firstItem.fields[field];
    const secondItemProp = secondItem.fields[field];

    if (!firstItemProp) return 1;
    if (!secondItemProp) return -1;

    // Number sorting
    if (firstItemProp.type === 'number' && secondItemProp.type === 'number') {
      const firstItemValue = getItemValue(firstItemProp.value);
      const secondItemValue = getItemValue(secondItemProp.value);

      if (isNaN(firstItemValue)) return 1;
      if (isNaN(secondItemValue)) return -1;

      if (direction === 'asc') return firstItemValue - secondItemValue;

      return secondItemValue - firstItemValue;
    }

    // Dates sorting
    if (firstItemProp.type === 'date' && secondItemProp.type === 'date') {
      const firstItemValue = getItemValue(firstItemProp.value).getTime();
      const secondItemValue = getItemValue(secondItemProp.value).getTime();

      if (direction === 'asc') return firstItemValue - secondItemValue;

      return secondItemValue - firstItemValue;
    }

    // Text sorting
    if (firstItemProp.type === 'text' && secondItemProp.type === 'text') {
      const firstItemValue = getItemValue(firstItemProp.value);
      const secondItemValue = getItemValue(secondItemProp.value);

      const collatorOptions: Intl.CollatorOptions = {
        numeric: true,
        sensitivity: 'base',
      };

      if (direction === 'asc') return firstItemValue.localeCompare(secondItemValue, undefined, collatorOptions);

      return secondItemValue.localeCompare(firstItemValue, undefined, collatorOptions);
    }

    return 0;
  });

  return sorted;
};

/**
 * @returns The first value of the array or the value itself.
 * @param value
 */
const getItemValue = <
  Value extends number | string | Date | number[] | string[] | Date[],
  ReturnValue = Value extends (infer U)[] ? U : Value,
>(
  value: Value
) => {
  const [firstValue] = Array.isArray(value) ? value : [value];
  return firstValue as ReturnValue;
};

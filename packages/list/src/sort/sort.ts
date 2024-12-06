import type { ListItem } from '../components/ListItem';
import type { SortingDirection } from './types';

/**
 * Sorts the items of a `CMSList`.
 * **Important:** This method mutates the {@link ListItem.items} property.
 *
 * @param listInstance The {@link CMSList} instance.
 * @param direction The direction to sort.
 * @param sortKey The key of the field to use as sorting reference.
 */
export const sortListItems = (
  items: ListItem[],
  sortKey?: string,
  direction?: SortingDirection
): ListItem[] | undefined => {
  const validSortKey = !!direction && !!sortKey && items.some(({ fields }) => sortKey in fields);
  if (!validSortKey) return;

  const sorted = [...items].sort((firstItem, secondItem) => {
    const firstItemProp = firstItem.fields[sortKey];
    const secondItemProp = secondItem.fields[sortKey];

    // Number sorting
    if (firstItemProp.type === 'number' && secondItemProp.type === 'number') {
      const [firstItemValue] = firstItemProp.value;
      const [secondItemValue] = secondItemProp.value;

      if (isNaN(firstItemValue)) return 1;
      if (isNaN(secondItemValue)) return -1;

      if (direction === 'asc') return firstItemValue - secondItemValue;

      return secondItemValue - firstItemValue;
    }

    // Dates sorting
    if (firstItemProp.type === 'date' && secondItemProp.type === 'date') {
      const firstItemValue = firstItemProp.value[0].getTime();
      const secondItemValue = secondItemProp.value[0].getTime();

      if (direction === 'asc') return firstItemValue - secondItemValue;

      return secondItemValue - firstItemValue;
    }

    // Text sorting
    if (firstItemProp.type === 'text' && secondItemProp.type === 'text') {
      const [firstItemValue] = firstItemProp.value;
      const [secondItemValue] = secondItemProp.value;

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

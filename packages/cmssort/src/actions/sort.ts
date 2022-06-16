import type { CMSList } from '@finsweet/attributes-cmscore';

import type { SortingDirection } from '../utils/types';

/**
 * Sorts the items of a `CMSList`.
 * **Important:** This method mutates the {@link CMSList.items} property.
 *
 * @param listInstance The {@link CMSList} instance.
 * @param params.direction The direction to sort.
 * @param params.sortKey The key of the field to use as sorting reference.
 * @param params.addingItems Defines if new items are being added.
 * In that case, the rendering responsibilities are handled by the {@link CMSList} controller.
 */
export const sortListItems = async (
  listInstance: CMSList,
  {
    direction,
    sortKey,
    addingItems,
  }: {
    direction?: SortingDirection;
    sortKey?: string;
    addingItems?: boolean;
  }
) => {
  const { items } = listInstance;

  const validSortKey = direction && sortKey && items.some(({ props }) => sortKey in props);

  if (!validSortKey) listInstance.restoreItemsOrder();
  else {
    items.sort((firstItem, secondItem) => {
      const firstItemProp = firstItem.props[sortKey];
      const secondItemProp = secondItem.props[sortKey];

      const [firstItemValue] = firstItemProp?.values || [];
      const [secondItemValue] = secondItemProp?.values || [];

      if (!firstItemValue) return 1;
      if (!secondItemValue) return -1;

      const { type } = firstItemProp;

      // Date & Number sorting
      const isDate = type === 'date';
      const isNumber = type === 'number';

      if (isDate || isNumber) {
        const [firstItemNumber, secondItemNumber] = [firstItemValue, secondItemValue].map((value) =>
          isDate ? new Date(value).getTime() : parseFloat(value)
        );

        if (isNaN(firstItemNumber)) return 1;
        if (isNaN(secondItemNumber)) return -1;

        if (direction === 'asc') return firstItemNumber - secondItemNumber;

        return secondItemNumber - firstItemNumber;
      }

      // String sorting
      const collatorOptions: Intl.CollatorOptions = {
        numeric: true,
        sensitivity: 'base',
      };

      if (direction === 'asc') return firstItemValue.localeCompare(secondItemValue, undefined, collatorOptions);

      return secondItemValue.localeCompare(firstItemValue, undefined, collatorOptions);
    });
  }

  // Render the new order
  if (!addingItems) {
    await listInstance.switchPage(1, false);

    listInstance.scrollToAnchor();

    await listInstance.renderItems();
  }
};

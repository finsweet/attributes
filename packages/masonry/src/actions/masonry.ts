import { getCollectionElements } from '@finsweet/attributes-utils';

/**
 * Initializes a masonry layout for a list.
 * @param list - The container element containing the list of items.
 */

export const initMasonryLayout = (list: HTMLElement) => {
  const items = getCollectionElements(list, 'items');
  const gapStyle = window.getComputedStyle(list).getPropertyValue('grid-gap');
  const gutter = parseFloat(gapStyle);
  const numColumns: number = Math.floor(list.offsetWidth / items[0].offsetWidth);
  const columnWidth: number = Math.floor((list.offsetWidth - (numColumns - 1) * gutter) / numColumns);
  const columns: HTMLElement[][] = Array.from({ length: numColumns }, () => []);

  items.forEach((item, index) => {
    const columnIndex: number = index % numColumns;
    columns[columnIndex].push(item);
  });

  columns.forEach((column, columnIndex) => {
    const xOffset: number = columnIndex * (columnWidth + gutter);
    let yOffset = 0;

    column.forEach((item) => {
      const image = item.querySelector('img') as HTMLImageElement;
      const aspectRatio = image.naturalWidth / image.naturalHeight;

      const itemHeight = columnWidth / aspectRatio;
      item.style.position = 'absolute';
      item.style.left = xOffset + 'px';
      item.style.top = yOffset + 'px';
      item.style.width = columnWidth + 'px';
      item.style.height = itemHeight + 'px';

      yOffset += itemHeight + gutter;
    });
  });

  const tallestColumnHeight: number = Math.max(
    ...columns.map((column) => column.reduce((sum, item) => sum + parseFloat(item.style.height) + gutter, 0))
  );
  list.style.height = tallestColumnHeight + 'px';
  list.style.position = 'relative';
};

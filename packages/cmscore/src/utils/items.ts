/**
 * Updates an element's content with an items count.
 * @param element The element to update.
 * @count The items count value.
 */
export const updateItemsCount = (element: HTMLElement, count: number) => {
  element.textContent = `${count}`;
};

/**
 * Removes an item from the favorite list based on the provided link.
 * @param favoriteList - The HTML element representing the favorite list container.
 * @param linkToRemove - The URL link associated with the item to be removed.
 */
export const removeItemFromList = (favoriteList: HTMLElement, linkToRemove: string) => {
  const listItems = favoriteList.querySelectorAll<HTMLElement>('[role="listitem"]');

  listItems.forEach((item) => {
    const link = item.querySelector('a'); // Assuming the link is an anchor tag
    if (link && link.getAttribute('href') === linkToRemove) {
      item.remove();
    }
  });
};

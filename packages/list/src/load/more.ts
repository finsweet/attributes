import { addListener } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { queryElement } from '../utils/selectors';
import { loadPaginatedItems } from './load';

/**
 * Inits the default mode.
 * @param list The {@link List} instance.
 *
 * @returns A callback to remove event listeners.
 */
export const initMoreMode = (list: List) => {
  const { paginationNextElement, paginationPreviousElement, paginationCountElement, itemsPerPage, instance } = list;

  const paginationNextButton = paginationNextElement.value;
  if (!paginationNextButton) return;

  paginationCountElement?.remove();

  const paginationPreviousButton = paginationPreviousElement.value;
  if (paginationPreviousButton) {
    paginationPreviousButton.style.display = 'none';
  }

  const initialItemsPerPage = itemsPerPage.value;
  const loadRemainingButton = queryElement('load-remaining', { instance });

  let isLoading = true;
  let loadRemainingClicked = false;

  list.addHook('paginate', (items) => {
    const paginatedItems = items.slice(0, itemsPerPage.value);
    const allItemsDisplayed = paginatedItems.length === items.length;

    paginationNextButton.style.display = allItemsDisplayed ? 'none' : '';

    if (!isLoading && allItemsDisplayed) {
      cleanup();
      return;
    }

    return paginatedItems;
  });

  // Listeners
  const cleanupPaginationNextButton = addListener(paginationNextButton, 'click', async (e) => {
    e.preventDefault();

    itemsPerPage.value += initialItemsPerPage;
    list.triggerHook('paginate');
  });

  const cleanupLoadRemainingButton = loadRemainingButton
    ? addListener(
        loadRemainingButton,
        'click',
        async (e) => {
          e.preventDefault();

          loadRemainingClicked = true;

          itemsPerPage.value = list.items.value.length;

          list.triggerHook('paginate');
        },
        { once: true }
      )
    : undefined;

  // Init
  loadPaginatedItems(list).then(() => {
    isLoading = false;

    if (loadRemainingClicked) {
      itemsPerPage.value = list.items.value.length;
    }
  });

  /**
   * Destroys the listeners.
   */
  const cleanup = () => {
    cleanupPaginationNextButton();
    cleanupLoadRemainingButton?.();
  };

  return cleanup;
};

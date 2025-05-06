import { addListener } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { loadPaginatedCMSItems } from './load';

/**
 * Inits the `Load All` mode.
 * @param list The {@link List} instance.
 * @returns A cleanup function.
 */
export const initAllMode = (list: List) => {
  loadPaginatedCMSItems(list).then(() => {
    list.itemsPerPage.value = list.items.value.length;
  });

  const cleanupClick = addListener(
    [...list.allPaginationPreviousElements.value, ...list.allPaginationNextElements.value],
    'click',
    (e) => {
      e.preventDefault();
    }
  );

  return () => {
    cleanupClick();
  };
};

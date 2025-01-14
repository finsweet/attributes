import type { List } from '../components/List';
import { loadPaginatedCMSItems } from './load';

/**
 * Inits the `Load All` mode.
 * @param list The {@link List} instance.
 */
export const initAllMode = (list: List) => {
  loadPaginatedCMSItems(list).then(() => {
    list.itemsPerPage.value = list.items.value.length;
  });
};

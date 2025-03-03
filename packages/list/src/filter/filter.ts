import { toRaw } from '@vue/reactivity';

import type { ListItem } from '../components/ListItem';
// @ts-expect-error - Worker is not recognized by TypeScript
import FilterWorker from './filter.worker.js';
import type { FilterResponseMessage, Filters } from './types';

const filterWorker = new FilterWorker() as Worker;

let messageCount = 0;

export const filterItems = (filters: Filters, items: ListItem[]) => {
  const itemsMap = new Map<string, ListItem>();
  const itemsData = items.map((item) => {
    itemsMap.set(item.id, item);

    const { id, fields } = item;
    return { id, fields };
  });

  messageCount += 1;

  const id = messageCount;

  const controller = new AbortController();

  return new Promise<ListItem[]>((resolve) => {
    filterWorker.addEventListener(
      'message',
      (e: MessageEvent<FilterResponseMessage>) => {
        if (e.data.id !== id) return;

        controller.abort();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- The map is guaranteed to have the item
        const result = e.data.filteredItems.map(({ id }) => itemsMap.get(id)!);

        resolve(result);
      },
      {
        signal: controller.signal,
      }
    );

    filterWorker.postMessage({ id, items: itemsData, filters: toRaw(filters) });
  });
};

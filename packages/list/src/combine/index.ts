import type { List } from '../components';
import { listInstancesStore } from '../utils/store';

/**
 * Initializes the list combine feature.
 * @param targetList
 * @returns A cleanup function.
 */
export const initListCombine = (targetList: List) => {
  const sourceLists = [...listInstancesStore.values()].filter(
    (sourceList) =>
      sourceList !== targetList &&
      sourceList.wrapperElement !== targetList.wrapperElement &&
      targetList.instance === sourceList.instance
  );

  console.log({ sourceLists, instances: [...listInstancesStore.values()] });

  if (!sourceLists.length) return;

  const cleanups = new Set<() => void>();

  for (const sourceList of sourceLists) {
    const cleanup = sourceList.items.subscribe((items, changed) => {
      console.log(items);
      if (!items.length) return;

      const elements = items.map((item) => item.element);

      targetList.addItems(elements);
      sourceList.items.set([]);

      console.log({ items, changed });
    });

    cleanups.add(cleanup);
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }

    cleanups.clear();
  };
};

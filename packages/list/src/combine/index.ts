import type { List } from '../components';
import { listInstancesStore } from '../utils/store';

/**
 * Initializes the list combine feature.
 * @param sourceList The source list.
 * @param targetInstance The target list instance.
 * @returns A cleanup function.
 */
export const initListCombine = (sourceList: List, targetInstance: string) => {
  const targetList = [...listInstancesStore.values()].find(
    (list) =>
      list.instance === targetInstance && list !== sourceList && list.wrapperElement !== sourceList.wrapperElement
  );
  if (!targetList) return;

  const cleanup = sourceList.items.subscribe((items) => {
    if (!items.length) return;

    const elements = items.map((item) => item.element);

    targetList.addItems(elements);
    sourceList.items.set([]);
  });

  return cleanup;
};

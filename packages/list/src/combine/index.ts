import { extractCommaSeparatedValues } from '@finsweet/attributes-utils';
import { effect } from '@vue/reactivity';

import type { List } from '../components';
import { listInstancesStore } from '../utils/store';

/**
 * Initializes the list combine feature.
 * @param targetList The target list.
 * @param rawSourceInstances A comma-separated list of source instances.
 * @returns A cleanup function.
 */
export const initListCombine = (targetList: List, rawSourceInstances: string) => {
  const sourceInstances = extractCommaSeparatedValues(rawSourceInstances);

  const sourceLists = [...listInstancesStore.values()].filter(
    (list) => list !== targetList && list.instance && sourceInstances.includes(list.instance)
  );

  if (!sourceLists.length) return;

  const cleanups = sourceLists.map((sourceList) => {
    const cleanup = effect(() => {
      if (!sourceList.items.value.length) return;

      const elements = sourceList.items.value.map((item) => item.element);

      targetList.addItems(elements);
      sourceList.items.value.length = 0;
    });

    return cleanup;
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
};

import { effect } from '@vue/reactivity';

import type { List } from '../components';

/**
 * Handles the load-specific elements.
 * @param list
 * @returns A cleanup function.
 */
export const handleLoadElements = (list: List) => {
  const runner = effect(() => {
    const filteredItems = list.hooks.filter.result.value;

    if (list.visibleCountElement) {
      const visibleCountTotal = Math.min(list.itemsPerPage.value, filteredItems.length);

      list.visibleCountElement.textContent = `${visibleCountTotal}`;
    }

    if (list.visibleCountFromElement) {
      const visibleCountFrom = Math.min(
        (list.currentPage.value - 1) * list.itemsPerPage.value + 1,
        filteredItems.length
      );

      list.visibleCountFromElement.textContent = `${visibleCountFrom}`;
    }

    if (list.visibleCountToElement) {
      const visibleCountTo = Math.min(list.currentPage.value * list.itemsPerPage.value, filteredItems.length);

      list.visibleCountToElement.textContent = `${visibleCountTo}`;
    }
  });

  return () => {
    runner.effect.stop();
  };
};

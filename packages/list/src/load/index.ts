import { effect } from '@vue/reactivity';

import type { List } from '../components/List';
import type { SETTINGS } from '../utils/constants';
import { getAttribute } from '../utils/selectors';
import { initAllMode } from './all';
import { initInfiniteMode } from './infinite';
import { initMoreMode } from './more';
import { initPaginationMode } from './pagination';

type LoadModeValues = (typeof SETTINGS)['load']['values'];
type LoadMode = LoadModeValues[keyof LoadModeValues];

/**
 * Inits loading functionality for the list.
 * @param list
 * @param mode
 */
export const initListLoading = (list: List, mode: LoadMode) => {
  // Handle elements
  const elementsRunner = effect(() => {
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

  // Init mode
  const loadModeCleanup =
    mode === 'all'
      ? initAllMode(list)
      : mode === 'more'
      ? initMoreMode(list)
      : mode === 'infinite'
      ? initInfiniteMode(list)
      : initPaginationMode(list);

  const beforeRenderHookCleanup = list.addHook('beforeRender', async (items) => {
    if (list.triggeredHook === 'pagination') {
      const className = getAttribute(list.listElement, 'loadingclass');

      list.wrapperElement.classList.add(className);

      const animations = list.wrapperElement.getAnimations({ subtree: true });

      await Promise.all(animations.map((a) => a.finished));
    }

    return items;
  });

  const afterRenderHookCleanup = list.addHook('afterRender', (items) => {
    const className = getAttribute(list.listElement, 'loadingclass');
    list.wrapperElement.classList.remove(className);

    return items;
  });

  return () => {
    loadModeCleanup?.();
    beforeRenderHookCleanup();
    afterRenderHookCleanup();
    elementsRunner.effect.stop();
  };
};

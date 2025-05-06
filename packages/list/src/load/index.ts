import type { List } from '../components/List';
import type { SETTINGS } from '../utils/constants';
import { getAttribute, hasAttributeValue } from '../utils/selectors';
import { initAllMode } from './all';
import { handleLoadElements } from './elements';
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
  const loadingClass = getAttribute(list.listElement, 'loadingclass');
  const resetIx = hasAttributeValue(list.listOrWrapper, 'resetix', 'true');

  if (resetIx) {
    list.webflowModules.add('ix2');
  }

  // Handle elements
  const elementsCleanup = handleLoadElements(list);

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
      list.wrapperElement.classList.add(loadingClass);

      const animations = list.wrapperElement.getAnimations({ subtree: true });

      await Promise.all(animations.map((a) => a.finished));
    }

    return items;
  });

  const afterRenderHookCleanup = list.addHook('afterRender', (items) => {
    list.wrapperElement.classList.remove(loadingClass);

    return items;
  });

  return () => {
    loadModeCleanup?.();
    beforeRenderHookCleanup();
    afterRenderHookCleanup();
    elementsCleanup();
  };
};

import type { List } from '../components/List';
import type { SETTINGS } from '../utils/constants';
import { initInfiniteMode } from './infinite';
import { initLoadUnderMode } from './load-under';
import { initPaginationMode } from './pagination';
import { initRenderAllMode } from './render-all';

type LoadModeValues = (typeof SETTINGS)['loadmode']['values'];
type LoadMode = LoadModeValues[keyof LoadModeValues];

/**
 * Inits loading functionality for the list.
 * @param list
 * @param mode
 */
export const initListLoading = async (list: List, mode: LoadMode) => {
  const cleanup =
    mode === 'render-all'
      ? await initRenderAllMode(list)
      : mode === 'load-under'
      ? await initLoadUnderMode(list)
      : mode === 'infinite'
      ? await initInfiniteMode(list)
      : await initPaginationMode(list);

  return cleanup;
};

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
export const initListLoading = (list: List, mode: LoadMode) => {
  const cleanup =
    mode === 'render-all'
      ? initRenderAllMode(list)
      : mode === 'load-under'
      ? initLoadUnderMode(list)
      : mode === 'infinite'
      ? initInfiniteMode(list)
      : initPaginationMode(list);

  return cleanup;
};

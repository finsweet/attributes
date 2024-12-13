import type { List } from '../components/List';
import type { SETTINGS } from '../utils/constants';
import { initAllMode } from './all';
import { initInfiniteMode } from './infinite';
import { initMoreMode } from './more';
import { initPaginationMode } from './pagination';
import { initRemainingMode } from './remaining';

type LoadModeValues = (typeof SETTINGS)['load']['values'];
type LoadMode = LoadModeValues[keyof LoadModeValues];

/**
 * Inits loading functionality for the list.
 * @param list
 * @param mode
 */
export const initListLoading = (list: List, mode: LoadMode) => {
  const cleanup =
    mode === 'all'
      ? initAllMode(list)
      : mode === 'remaining'
      ? initRemainingMode(list)
      : mode === 'more'
      ? initMoreMode(list)
      : mode === 'infinite'
      ? initInfiniteMode(list)
      : initPaginationMode(list);

  return cleanup;
};

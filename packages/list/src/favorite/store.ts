import { shallowReactive, watch } from '@vue/reactivity';

import { FAVORITE_STORAGE_KEY } from '../utils/constants';

export const favoritedItemsStore = (() => {
  let storedFavoritesArray = [];

  try {
    const rawStoredFavorites = localStorage.getItem(FAVORITE_STORAGE_KEY);
    const storedFavorites = rawStoredFavorites ? JSON.parse(rawStoredFavorites) : [];

    if (Array.isArray(storedFavorites)) {
      storedFavoritesArray = storedFavorites;
    }
  } catch {
    //
  }

  const set = new Set<string>(storedFavoritesArray);
  const store = shallowReactive(set);

  watch(store, (newSet) => {
    try {
      localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify([...newSet]));
    } catch {
      //
    }
  });

  return store;
})();

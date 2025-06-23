import { shallowReactive, watch } from '@vue/reactivity';

const STORAGE_KEY = 'fs-list-favorite';

export const favoritedItemsStore = (() => {
  let storedFavoritesArray = [];

  try {
    const rawStoredFavorites = localStorage.getItem(STORAGE_KEY);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...newSet]));
    } catch {
      //
    }
  });

  return store;
})();

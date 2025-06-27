import { reactive, watch } from '@vue/reactivity';
import * as z from 'zod/v4-mini';

import { LOCAL_STORAGE_KEY } from './constants';

const StoredFavoritesSchema = z.record(z.string(), z.array(z.string()));

type StoredFavorites = z.infer<typeof StoredFavoritesSchema>;

export const favoritedItemsStore = (() => {
  let storedFavorites: StoredFavorites;

  try {
    const rawStoredFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedStoredFavorites = rawStoredFavorites ? JSON.parse(rawStoredFavorites) : {};

    StoredFavoritesSchema.parse(parsedStoredFavorites);

    storedFavorites = parsedStoredFavorites;
  } catch {
    storedFavorites = {};
  }

  const store = reactive(storedFavorites);

  watch(
    store,
    (newValue: StoredFavorites) => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
      } catch {
        //
      }
    },
    { deep: true }
  );

  return store;
})();

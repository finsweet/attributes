import { effect, watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { List, ListItem } from '../../../packages/list/src/components';
import {
  FAVORITE_ADD_BUTTON,
  FAVORITE_CLASS,
  FAVORITE_DISABLED_CLASS,
  FAVORITE_DISPLAY_ATTRIBUTE,
  FAVORITE_INSTANCE_ATTRIBUTE,
  FAVORITE_REMOVE_BUTTON,
  FAVORITE_TOGGLE_BUTTON,
  FAVORITING_CLASS,
  LIST_ELEMENT_ATTRIBUTE,
  LIST_ITEM,
} from './constants';
import { favoritedItemsStore } from './store';

window.FinsweetAttributes = window.FinsweetAttributes || [];
window.FinsweetAttributes.push([
  'list',
  (listInstances: List[]) => {
    for (const list of listInstances) {
      const favoriteInstance = list.listOrWrapper.getAttribute(FAVORITE_INSTANCE_ATTRIBUTE);
      if (!favoriteInstance) continue;

      const isDisplay = list.listOrWrapper.getAttribute(FAVORITE_DISPLAY_ATTRIBUTE) === 'true';

      // call cleanup() when destroying the functionality
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cleanup = initListFavoriting(list, favoriteInstance, isDisplay);
    }
  },
]);

/**
 * Initializes favoriting functionality for the list.
 * @param list
 * @param instance
 * @param isDisplay
 * @returns A cleanup function
 */
const initListFavoriting = (list: List, instance: string, isDisplay?: boolean) => {
  const controller = new AbortController();
  const { signal } = controller;

  list.listOrWrapper.addEventListener(
    'click',
    ({ target }) => {
      if (!(target instanceof Element)) return;

      const favoriteButtonAdd = target.closest(`[${LIST_ELEMENT_ATTRIBUTE}="${FAVORITE_ADD_BUTTON}"]`);
      const favoriteButtonRemove = target.closest(`[${LIST_ELEMENT_ATTRIBUTE}="${FAVORITE_REMOVE_BUTTON}"]`);
      const favoriteButtonToggle = target.closest(`[${LIST_ELEMENT_ATTRIBUTE}="${FAVORITE_TOGGLE_BUTTON}"]`);
      const favoriteButton = favoriteButtonAdd || favoriteButtonRemove || favoriteButtonToggle;

      if (!favoriteButton) return;

      const itemElement = favoriteButton.closest(`:is(.w-dyn-item, [${LIST_ELEMENT_ATTRIBUTE}="${LIST_ITEM}"])`);
      if (!itemElement) return;

      const item = list.items.value.find((item) => item.element === itemElement);
      if (!item?.url?.pathname) return;

      const favorites = (favoritedItemsStore[instance] ||= []);

      const index = favorites.indexOf(item.url.pathname);

      if (index >= 0) {
        if (favoriteButtonRemove || favoriteButtonToggle) {
          favorites.splice(index, 1);
        }
      } else {
        if (favoriteButtonAdd || favoriteButtonToggle) {
          favorites.push(item.url.pathname);
        }
      }
    },
    { signal }
  );

  const listCleanup = isDisplay
    ? initDisplayerFavoritesList(list, instance)
    : initControllerFavoritesList(list, instance);

  return () => {
    listCleanup();
    controller.abort();
  };
};

/**
 * Initializes a list that controls the favorited items.
 * @param list
 * @returns A cleanup function
 */
const initControllerFavoritesList = (list: List, instance: string) => {
  const handler = debounce(
    ({
      favoritedItems = favoritedItemsStore[instance] || [],
      items = list.items.value,
    }: {
      favoritedItems?: string[];
      items?: ListItem[];
    }) => {
      for (const item of items) {
        if (!item.url?.pathname) continue;

        const isFavorited = favoritedItems.includes(item.url.pathname);

        const favoriteAddButtons = item.element.querySelectorAll(
          `[${LIST_ELEMENT_ATTRIBUTE}="${FAVORITE_ADD_BUTTON}"]`
        );
        const favoriteRemoveButtons = item.element.querySelectorAll(
          `[${LIST_ELEMENT_ATTRIBUTE}="${FAVORITE_REMOVE_BUTTON}"]`
        );

        if (isFavorited) {
          item.element.classList.add(FAVORITE_CLASS);
        } else {
          item.element.classList.remove(FAVORITE_CLASS);
        }

        for (const button of favoriteAddButtons) {
          button.classList.toggle(FAVORITE_DISABLED_CLASS, isFavorited);
        }

        for (const button of favoriteRemoveButtons) {
          button.classList.toggle(FAVORITE_DISABLED_CLASS, !isFavorited);
        }
      }
    },
    0
  );

  const itemsCleanup = watch(list.items, (items: ListItem[]) => handler({ items }));
  const favoritedItemsCleanup = watch(
    () => favoritedItemsStore[instance],
    (favoritedItems: string[] = []) => handler({ favoritedItems }),
    { immediate: true, deep: true }
  );

  return () => {
    itemsCleanup();
    favoritedItemsCleanup();
  };
};

/**
 * Initializes a list that displays favorited items.
 * @param list
 * @param instance
 * @returns A cleanup function
 */
const initDisplayerFavoritesList = (list: List, instance: string) => {
  let renderedItems = new Set<string>();

  const handler = debounce(async (favoritedItems: string[] = []) => {
    const itemsToPreserve = list.items.value.filter((item) => {
      if (!item.url?.pathname) return false;

      return favoritedItems.includes(item.url.pathname);
    });

    const itemsPathsToAdd = [...favoritedItems].filter((pathname) => !renderedItems.has(pathname));

    list.loading.value = !!itemsPathsToAdd.length;

    const itemsToAddPromise = Promise.all(
      itemsPathsToAdd.map(async (pathname) => {
        let url;

        try {
          url = new URL(pathname, window.location.origin);
        } catch {
          //
        }

        if (!url) return;

        const page = await window.FinsweetAttributes.utils.fetchPage(url, { cache: list.cache });
        if (!page) return;

        const itemElement = page.querySelector<HTMLElement>(
          `[${LIST_ELEMENT_ATTRIBUTE}="${LIST_ITEM}"][${FAVORITE_INSTANCE_ATTRIBUTE}="${instance}"]`
        );
        if (!itemElement) return;

        await window.FinsweetAttributes.utils.attachExternalStylesheets(page);

        const item = list.createItem(itemElement);
        return item;
      })
    );

    renderedItems = new Set(favoritedItems);

    const itemsToAdd = (await itemsToAddPromise).filter(isNotEmpty);

    list.items.value = [...itemsToPreserve, ...itemsToAdd];

    list.loading.value = false;
  }, 0);

  const favoritedItemsCleanup = watch(() => favoritedItemsStore[instance], handler, { immediate: true, deep: true });

  const favoritingClassEffect = effect(() => {
    list.wrapperElement.classList.toggle(FAVORITING_CLASS, list.loading.value);
  });

  return () => {
    favoritedItemsCleanup();
    favoritingClassEffect.effect.stop();
    renderedItems.clear();
  };
};

const isNotEmpty = <T>(value: T | null | undefined): value is T => value !== undefined && value !== null;

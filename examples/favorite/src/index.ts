import { effect, watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { List, ListItem } from '../../../packages/list/src/components';
import {
  FAVORITE_ADD_BUTTON,
  FAVORITE_CLASS,
  FAVORITE_DISABLED_CLASS,
  FAVORITE_ELEMENT_ATTRIBUTE,
  FAVORITE_REMOVE_BUTTON,
  FAVORITE_TARGET_ATTRIBUTE,
  FAVORITE_TOGGLE_BUTTON,
  FAVORITING_CLASS,
  LIST_INSTANCE_ATTRIBUTE,
  LIST_ITEM,
} from './constants';
import { favoritedItemsStore } from './store';

window.FinsweetAttributes = window.FinsweetAttributes || [];
window.FinsweetAttributes.push([
  'list',
  (listInstances: List[]) => {
    for (const list of listInstances) {
      const items = list.items.value;
      const firstItemElement = items[0]?.element;

      const favoriteInstance = list.listOrWrapper.getAttribute(FAVORITE_TARGET_ATTRIBUTE);
      const favoriteButtonSelectors = [FAVORITE_ADD_BUTTON, FAVORITE_REMOVE_BUTTON, FAVORITE_TOGGLE_BUTTON] as const;

      const hasFavoriteButton =
        !!firstItemElement &&
        favoriteButtonSelectors.some((selector) =>
          firstItemElement.querySelector(`[${FAVORITE_ELEMENT_ATTRIBUTE}="${selector}"]`)
        );

      if (favoriteInstance || hasFavoriteButton) {
        initListFavoriting(list, favoriteInstance);
      }
    }
  },
]);

/**
 * Initializes favoriting functionality for the list.
 * @param list
 * @param instance
 * @returns A cleanup function
 */
const initListFavoriting = (list: List, instance: string | null) => {
  const controller = new AbortController();
  const { signal } = controller;

  list.listOrWrapper.addEventListener(
    'click',
    ({ target }) => {
      if (!(target instanceof Element)) return;

      const favoriteButtonAdd = target.closest(`[${FAVORITE_ELEMENT_ATTRIBUTE}="${FAVORITE_ADD_BUTTON}"]`);
      const favoriteButtonRemove = target.closest(`[${FAVORITE_ELEMENT_ATTRIBUTE}="${FAVORITE_REMOVE_BUTTON}"]`);
      const favoriteButtonToggle = target.closest(`[${FAVORITE_ELEMENT_ATTRIBUTE}="${FAVORITE_TOGGLE_BUTTON}"]`);
      const favoriteButton = favoriteButtonAdd || favoriteButtonRemove || favoriteButtonToggle;

      if (!favoriteButton) return;

      const itemElement = favoriteButton.closest(`:is(.w-dyn-item, [${FAVORITE_ELEMENT_ATTRIBUTE}="${LIST_ITEM}"])`);
      if (!itemElement) return;

      const item = list.items.value.find((item) => item.element === itemElement);
      if (!item?.url?.pathname) return;

      if (favoritedItemsStore.has(item.url.pathname)) {
        if (favoriteButtonRemove || favoriteButtonToggle) {
          favoritedItemsStore.delete(item.url.pathname);
        }
      } else {
        if (favoriteButtonAdd || favoriteButtonToggle) {
          favoritedItemsStore.add(item.url.pathname);
        }
      }
    },
    { signal }
  );

  const listCleanup = instance ? initDisplayerFavoritesList(list, instance) : initControllerFavoritesList(list);

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
const initControllerFavoritesList = (list: List) => {
  const handler = debounce(
    ({
      favoritedItems = favoritedItemsStore,
      items = list.items.value,
    }: {
      favoritedItems?: Set<string>;
      items?: ListItem[];
    }) => {
      for (const item of items) {
        if (!item.url?.pathname) continue;

        const isFavorited = favoritedItems.has(item.url.pathname);

        const favoriteAddButtons = item.element.querySelectorAll(
          `[${FAVORITE_ELEMENT_ATTRIBUTE}="${FAVORITE_ADD_BUTTON}"]`
        );
        const favoriteRemoveButtons = item.element.querySelectorAll(
          `[${FAVORITE_ELEMENT_ATTRIBUTE}="${FAVORITE_REMOVE_BUTTON}"]`
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
    favoritedItemsStore,
    (favoritedItems: Set<string>) => handler({ favoritedItems }),
    { immediate: true }
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

  const handler = debounce(async (favoritedItems: Set<string>) => {
    const itemsToPreserve = list.items.value.filter((item) => {
      if (!item.url?.pathname) return false;

      return favoritedItems.has(item.url.pathname);
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
          `[${FAVORITE_ELEMENT_ATTRIBUTE}="${LIST_ITEM}"][${LIST_INSTANCE_ATTRIBUTE}="${instance}"]`
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

  const favoritedItemsCleanup = watch(favoritedItemsStore, handler, { immediate: true });

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

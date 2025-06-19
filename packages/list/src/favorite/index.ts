import { addListener, fetchPageDocument, isElement, isNotEmpty } from '@finsweet/attributes-utils';
import { effect, watch } from '@vue/reactivity';
import debounce from 'just-debounce';

import type { List, ListItem } from '../components';
import { attachExternalStylesheets } from '../utils/css';
import { getCMSElementSelector } from '../utils/dom';
import { getAttribute, getElementSelector, queryElement } from '../utils/selectors';
import { favoritedItemsStore } from './store';

export const initListFavoriting = (list: List, instance?: string) => {
  const clickCleanup = addListener(list.listOrWrapper, 'click', ({ target }) => {
    if (!isElement(target)) return;

    const favoriteButtonAdd = target.closest<HTMLElement>(getElementSelector('favorite-add'));
    const favoriteButtonRemove = target.closest<HTMLElement>(getElementSelector('favorite-remove'));
    const favoriteButtonToggle = target.closest<HTMLElement>(getElementSelector('favorite-toggle'));
    const favoriteButton = favoriteButtonAdd || favoriteButtonRemove || favoriteButtonToggle;

    if (!favoriteButton) return;

    const itemSelector = getCMSElementSelector('item');
    const itemElement = favoriteButton.closest<HTMLElement>(itemSelector);
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
  });

  const listCleanup = instance ? initFavoritesListDisplayer(list, instance) : initFavoritesListController(list);

  return () => {
    clickCleanup();
    listCleanup();
  };
};

export const initFavoritesListController = (list: List) => {
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

        item.setFavorited(isFavorited);
      }
    },
    0
  );

  const itemsCleanup = watch(list.items, (items: ListItem[]) => handler({ items }));
  const favoritedItemsCleanup = watch(
    favoritedItemsStore,
    (favoritedItems: Set<string>) => handler({ favoritedItems }),
    {
      immediate: true,
    }
  );

  return () => {
    itemsCleanup();
    favoritedItemsCleanup();
  };
};

export const initFavoritesListDisplayer = (list: List, instance: string) => {
  let renderedItems = new Set<string>();

  const handler = debounce(async (favoritedItems: Set<string>) => {
    const itemsToPreserve = list.items.value.filter((item) => {
      if (!item.url?.pathname) return false;

      return favoritedItems.has(item.url.pathname);
    });

    const itemsPathsToAdd = [...favoritedItems].filter((pathname) => !renderedItems.has(pathname));

    list.favoriting.value = !!itemsPathsToAdd.length;

    const itemsToAddPromise = Promise.all(
      itemsPathsToAdd.map(async (pathname) => {
        let url;

        try {
          url = new URL(pathname, window.location.origin);
        } catch {
          //
        }

        if (!url) return;

        const page = await fetchPageDocument(url, { cache: list.cache });
        if (!page) return;

        const itemElement = queryElement('item', { instance, scope: page });
        if (!itemElement) return;

        await attachExternalStylesheets(page);

        const item = list.createItem(itemElement);
        return item;
      })
    );

    renderedItems = new Set(favoritedItems);

    const itemsToAdd = (await itemsToAddPromise).filter(isNotEmpty);

    list.items.value = [...itemsToPreserve, ...itemsToAdd];

    list.favoriting.value = false;
  }, 0);

  const favoritedItemsCleanup = watch(favoritedItemsStore, handler, { immediate: true });

  const favoritingClassEffect = effect(() => {
    const favoritingClass = getAttribute(list.listOrWrapper, 'favoritingclass');
    if (!favoritingClass) return;

    list.wrapperElement.classList.toggle(favoritingClass, list.favoriting.value);
  });

  return () => {
    favoritedItemsCleanup();
    favoritingClassEffect.effect.stop();
    renderedItems.clear();
  };
};

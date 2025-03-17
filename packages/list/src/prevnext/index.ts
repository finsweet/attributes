import { cloneNode } from '@finsweet/attributes-utils';
import { watch } from '@vue/reactivity';

import type { List, ListItem } from '../components';
import { queryElement } from '../utils/selectors';

/**
 * Initializes the previous and next items for a collection template page.
 * @param list
 * @param previousItemTarget
 * @param nextItemTarget
 * @returns A cleanup function.
 */
export const initPrevNext = (
  list: List,
  previousItemTarget: HTMLElement | null,
  nextItemTarget: HTMLElement | null
) => {
  const previousEmptyPlaceholder = queryElement('previous-empty', { instance: list.instance });
  const nextEmptyPlaceholder = queryElement('next-empty', { instance: list.instance });

  previousEmptyPlaceholder?.remove();
  nextEmptyPlaceholder?.remove();

  let loadingItems = !!list.loadingPaginatedItems;
  let previousItem: ListItem | undefined;
  let nextItem: ListItem | undefined;

  list.loadingPaginatedItems?.then(() => {
    loadingItems = false;
    handleItems(list.items.value);
  });

  /**
   * Handles items for the previous and next functionality.
   * @param items
   */
  const handleItems = (items: ListItem[]) => {
    if (previousItem && nextItem) {
      return;
    }

    const href = window.location.origin + window.location.pathname;
    const currentItemIndex = items.findIndex((item) => item.href === href);

    // Display empty placeholders if the current item is not found
    if (currentItemIndex === -1 && !loadingItems) {
      if (previousEmptyPlaceholder) {
        previousItemTarget?.append(previousEmptyPlaceholder);
      }

      if (nextEmptyPlaceholder) {
        nextItemTarget?.append(nextEmptyPlaceholder);
      }
    }

    if (currentItemIndex === -1) return;

    // Previous item
    if (!previousItem) {
      previousItem = items[currentItemIndex - 1];

      // If found, clone the element and append it to the target
      if (previousItem) {
        const clone = cloneNode(previousItem.element);

        previousEmptyPlaceholder?.remove();
        previousItemTarget?.append(clone);
      }

      // If not found, show the empty placeholder only if the items have finished loading
      else if (!loadingItems && previousEmptyPlaceholder) {
        previousItemTarget?.append(previousEmptyPlaceholder);
      }
    }

    // Next item
    if (!nextItem) {
      nextItem = items[currentItemIndex + 1];

      // If found, clone the element and append it to the target
      if (nextItem) {
        const clone = cloneNode(nextItem.element);

        nextEmptyPlaceholder?.remove();
        nextItemTarget?.append(clone);
      }

      // If not found, show the empty placeholder only if the items have finished loading
      else if (!loadingItems && nextEmptyPlaceholder) {
        nextItemTarget?.append(nextEmptyPlaceholder);
      }
    }
  };

  const cleanup = watch(list.items, handleItems, { immediate: true });
  return cleanup;
};

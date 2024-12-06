import {
  addListener,
  ARIA_ROLE_KEY,
  ARIA_ROLE_VALUES,
  ARIA_SORT_KEY,
  ARIA_SORT_VALUES,
  isNotEmpty,
  TABINDEX_KEY,
} from '@finsweet/attributes-utils';
import { computed, effect, ref } from '@vue/reactivity';

import type { List } from '../components/List';
import { SETTINGS } from '../utils/constants';
import { getAttribute, hasAttributeValue } from '../utils/selectors';
import { sortListItems } from './sort';
import type { SortingDirection } from './types';

/**
 * Inits the sorting with a group of Buttons.
 * @param buttons The button elements.
 * @param list The {@link List} instance.

 */
export const initButtons = (buttons: HTMLElement[], list: List) => {
  const activeButton = ref<HTMLElement | undefined>();

  let sortDirection: SortingDirection | undefined;
  let sortKey: string;

  list.addHook('sort', (items) => sortListItems(items, sortKey, sortDirection));

  const cleanups = buttons
    .flatMap((button) => {
      const buttonSortKey = getAttribute(button, 'field');
      if (!buttonSortKey) return;

      const reverse = hasAttributeValue(button, 'reverse', 'true');
      const ascClass = getAttribute(button, 'ascclass') || SETTINGS.ascclass.values.default;
      const desClass = getAttribute(button, 'descclass') || SETTINGS.descclass.values.default;

      const currentDirection = ref<SortingDirection | undefined>();

      button.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.columnheader);
      button.setAttribute(TABINDEX_KEY, '0');

      // Dynamically set the `aria-sort` attribute
      const ariaSort = computed(() => {
        if (activeButton.value !== button) return 'none';

        return currentDirection.value === 'asc' ? ARIA_SORT_VALUES.ascending : ARIA_SORT_VALUES.descending;
      });

      const ariaSortCleanup = effect(() => {
        button.setAttribute(ARIA_SORT_KEY, ariaSort.value);
      });

      // Dynamically set the direction CSS class
      const cssClass = computed(() => {
        if (activeButton.value !== button) return null;

        return currentDirection.value === 'asc' ? ascClass : desClass;
      });

      const cssClassCleanup = effect(() => {
        button.classList.remove(ascClass, desClass);

        if (cssClass.value) {
          button.classList.add(cssClass.value);
        }
      });

      // Sort on click
      const clickCleanup = addListener(button, 'click', async (e) => {
        e.preventDefault();

        sortKey = buttonSortKey;
        sortDirection = getNextDirection(currentDirection.value, reverse);

        activeButton.value = button;
        currentDirection.value = sortDirection;

        await list.triggerHook('sort');
      });

      return [ariaSortCleanup, cssClassCleanup, clickCleanup];
    })
    .filter(isNotEmpty);

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
};

/**
 * @returns The new direction of a button.
 * @param currentDirection The current direction of a button.
 */
const getNextDirection = (currentDirection: SortingDirection | undefined, reverse: boolean): SortingDirection => {
  if (!currentDirection) return reverse ? 'desc' : 'asc';

  return currentDirection === 'desc' ? 'asc' : 'desc';
};

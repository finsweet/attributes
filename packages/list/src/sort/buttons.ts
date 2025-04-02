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
import { getAttribute, hasAttributeValue } from '../utils/selectors';
import type { SortingDirection } from './types';

/**
 * Inits the sorting with a group of Buttons.
 * @param buttons The button elements.
 * @param list The {@link List} instance.

 */
export const initButtons = (buttons: HTMLElement[], list: List) => {
  const activeButton = ref<HTMLElement | undefined>();

  const cleanups = buttons
    .flatMap((button) => {
      const field = getAttribute(button, 'field');
      if (!field) return;

      const reverse = hasAttributeValue(button, 'reverse', 'true');
      const ascClass = getAttribute(button, 'ascclass');
      const desClass = getAttribute(button, 'descclass');

      const currentDirection = ref<SortingDirection | undefined>();

      button.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.columnheader);
      button.setAttribute(TABINDEX_KEY, '0');

      // Dynamically set the `aria-sort` attribute
      const ariaSort = computed(() => {
        if (activeButton.value !== button) return 'none';

        return currentDirection.value === 'asc' ? ARIA_SORT_VALUES.ascending : ARIA_SORT_VALUES.descending;
      });

      const ariaSortRunner = effect(() => {
        button.setAttribute(ARIA_SORT_KEY, ariaSort.value);
      });

      // Dynamically set the direction CSS class
      const cssClass = computed(() => {
        if (activeButton.value !== button) return null;

        return currentDirection.value === 'asc' ? ascClass : desClass;
      });

      const cssClassRunner = effect(() => {
        button.classList.remove(ascClass, desClass);

        if (cssClass.value) {
          button.classList.add(cssClass.value);
        }
      });

      // Sort on click
      const clickCleanup = addListener(button, 'click', async (e) => {
        e.preventDefault();

        activeButton.value = button;
        currentDirection.value = getNextDirection(currentDirection.value, reverse);

        list.sorting.value = {
          field,
          direction: currentDirection.value,
          interacted: true,
        };
      });

      return [() => ariaSortRunner.effect.stop(), () => cssClassRunner.effect.stop(), clickCleanup];
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

import type { CMSList } from '@finsweet/attributes-cmscore';
import { normalizePropKey } from '@finsweet/attributes-cmscore';
import type { MapEntries } from '@finsweet/ts-utils';
import {
  ARIA_ROLE_KEY,
  ARIA_ROLE_VALUES,
  ARIA_SORT_KEY,
  ARIA_SORT_VALUES,
  TABINDEX_KEY,
} from '@global/constants/a11ty';

import { sortListItems } from '../actions/sort';
import { ATTRIBUTES } from '../utils/constants';
import type { ButtonState, ButtonsState, CSSClasses, SortingDirection, SortItemsCallback } from '../utils/types';

// Constants destructuring
const {
  ascClass: { key: ascClassKey },
  descClass: { key: descClassKey },
  reverse: { key: reverseKey, values: reverseValues },
} = ATTRIBUTES;

/**
 * Inits the sorting with a group of Buttons.
 * @param buttons The button elements.
 * @param listInstance The {@link CMSList} instance.
 * @param globalCSSClasses The state CSS classes (`asc` and `desc`) globally defined on the list.
 */
export const initButtons = (buttons: NodeListOf<HTMLElement>, listInstance: CMSList, globalCSSClasses: CSSClasses) => {
  const buttonsState: ButtonsState = new Map();

  let sorting = false;
  let activeButton: HTMLElement | undefined;
  let direction: SortingDirection | undefined;
  let sortKey: string;

  /**
   * Sorts the items based on the current selected `sortKey` and `direction`.
   * @param addingItems Defines if new items are being added.
   * In that case, the rendering responsibilities are handled by another controller.
   */
  const sortItems: SortItemsCallback = async (addingItems) => {
    await sortListItems(listInstance, { sortKey, direction, addingItems });
  };

  for (const button of buttons) {
    prepareButton(button, buttonsState, globalCSSClasses);

    button.addEventListener('click', async (e) => {
      e.preventDefault();

      if (sorting) return;

      sorting = true;

      const buttonState = buttonsState.get(button);
      if (!buttonState) {
        sorting = false;
        return;
      }

      sortKey = buttonState.sortKey;
      direction = getNextDirection(buttonState.direction, buttonState.reverse);

      if (activeButton && button !== activeButton) updateButton(activeButton, undefined, buttonsState);

      activeButton = button;

      updateButton(button, direction, buttonsState);

      await sortItems();

      sorting = false;
    });
  }

  return sortItems;
};

/**
 * - Inits the button state.
 * - Clears state CSS classes.
 * - Adds `a11ty` attributes.
 * - Stores CSS Class overrides.
 * @param button The button element.
 * @param buttonsState The {@link ButtonsState} object.
 * @param globalCSSClasses The state CSS classes (`asc` and `desc`) globally defined on the list.
 */
const prepareButton = (button: HTMLElement, buttonsState: ButtonsState, globalCSSClasses: CSSClasses) => {
  const rawSortKey = button.getAttribute(ATTRIBUTES.field.key);
  if (!rawSortKey) return;

  const sortKey = normalizePropKey(rawSortKey);

  const reverse = button.getAttribute(reverseKey) === reverseValues.true;
  const ascCSSClassOverride = button.getAttribute(ascClassKey);
  const descCSSClassOverride = button.getAttribute(descClassKey);

  const buttonState: ButtonState = {
    sortKey,
    reverse,
    cssClasses: {
      asc: ascCSSClassOverride || globalCSSClasses.asc,
      desc: descCSSClassOverride || globalCSSClasses.desc,
    },
  };

  button.setAttribute(ARIA_ROLE_KEY, ARIA_ROLE_VALUES.columnheader);
  button.setAttribute(TABINDEX_KEY, '0');

  setAria(button);

  buttonsState.set(button, buttonState);

  clearClasses(button, buttonState);
};

/**
 * Clears the state CSS classes of a button.
 * @param button The button element.
 * @param cssClasses The state CSS classes (`asc` and `desc`).
 */
const clearClasses = (...[button, { cssClasses }]: MapEntries<ButtonsState>[number]) => {
  for (const cssClass of Object.values(cssClasses)) button.classList.remove(cssClass);
};

/**
 * Sets `a11ty` attributes to a button.
 * @param button The button element.
 * @param direction The direction state of the button.
 */
const setAria = (button: HTMLElement, direction?: SortingDirection | undefined) => {
  button.setAttribute(
    ARIA_SORT_KEY,
    direction ? (direction === 'asc' ? ARIA_SORT_VALUES.ascending : ARIA_SORT_VALUES.descending) : 'none'
  );
};

/**
 * Updates the state of a button.
 * @param button The button element.
 * @param direction The new direction.
 * @param buttonsState The {@link ButtonsState} object.
 */
const updateButton = (button: HTMLElement, direction: SortingDirection | undefined, buttonsState: ButtonsState) => {
  const buttonState = buttonsState.get(button);
  if (!buttonState) return;

  const { cssClasses } = buttonState;

  clearClasses(button, buttonState);

  if (direction) button.classList.add(cssClasses[direction]);

  setAria(button, direction);

  buttonState.direction = direction;
};

/**
 * @returns The new direction of a button.
 * @param currentDirection The current direction of a button.
 */
const getNextDirection = (currentDirection: SortingDirection | undefined, reverse: boolean): SortingDirection => {
  if (!currentDirection) return reverse ? 'desc' : 'asc';

  return currentDirection === 'desc' ? 'asc' : 'desc';
};

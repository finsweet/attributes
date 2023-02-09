import { setFormFieldValue } from '@finsweet/ts-utils';

import { ARIA_ACTIVEDESCENDANT_KEY, ARIA_EXPANDED_KEY, ID_KEY, TABINDEX_KEY } from '$global/constants/a11y';
import { ARROW_DOWN_KEY, ARROW_UP_KEY, CLICK, ENTER_KEY, ESCAPE_KEY, TAB_KEY } from '$global/constants/keyboard';

import { focusOnInput, getClickedOptionData, setActiveDescendant, toggleDropdown } from '../../utils';
import { CONTROL_KEYS } from '../../utils/constants';
import type { OptionData, Settings } from '../../utils/types';
import { handleClearInput } from '../input';
import { updateOptionsState } from '../state';
import { cleanupBubble } from './../../utils/dropdowns';

let lastCursorPos = { x: 0, y: 0 };

/**
 * Handles click events on the dropdown list.
 * @param e The Event object.
 * @param settings The instance {@link Settings}.
 */
const handleDropdownListClickEvents = (e: MouseEvent | KeyboardEvent, optionData: OptionData, settings: Settings) => {
  if (!optionData.selected) updateOptionsState(settings, optionData);

  setFormFieldValue(settings.inputElement, optionData.text);
  toggleDropdown(settings);
};

/**
 * Handles dropdown mouse events: hover
 * Updates input field aria-activedescendant attribute with the option id.
 * @param e The Event object.
 * @param settings The instance {@link Settings}.
 */
export const handleDropdownListMouseEvents = (e: MouseEvent | KeyboardEvent, settings: Settings) => {
  const target = e.target as HTMLElement;

  if (target === settings.selectElement) return;

  e.preventDefault();

  if (target.tagName === 'A' && e.type === 'mousemove') {
    const mouseEvent = e as MouseEvent;
    const currentCursorPos = { x: mouseEvent.clientX, y: mouseEvent.clientY };
    if (lastCursorPos.x !== currentCursorPos.x || lastCursorPos.y !== currentCursorPos.y) {
      // mouse moved
      lastCursorPos = currentCursorPos;

      handleDropdownListFocusEvents(e as FocusEvent, true, settings);
    }
  }

  const optionData = getClickedOptionData(e, settings);
  if (!optionData) return;

  const optionId = optionData?.element?.getAttribute(ID_KEY);
  settings.inputElement.setAttribute(ARIA_ACTIVEDESCENDANT_KEY, `${optionId || ''}`);

  const isClick = e.type === CLICK;

  if (isClick) handleDropdownListClickEvents(e, optionData, settings);
};

/**
 * Handles focus events on the dropdown list.
 * @param e The Event object.
 * @param settings The instance {@link Settings}.
 */
export const handleDropdownListFocusEvents = (e: FocusEvent, focused: boolean, settings: Settings) => {
  const optionData = getClickedOptionData(e, settings);

  if (!optionData) return;

  if (e.type === 'focusout') return;

  const previouslyFocused = settings.optionsStore.find(({ focused }) => focused);

  if (previouslyFocused) {
    previouslyFocused?.element.setAttribute(TABINDEX_KEY, '-1');
    previouslyFocused.focused = false;
  }

  optionData.element.setAttribute(TABINDEX_KEY, '0');
  optionData.focused = focused;
  optionData.element.focus();

  setActiveDescendant(settings.inputElement, optionData.element);
};

/**
 * Handles tab key events on the dropdown list.
 * @param e The Event object.
 * @param settings The instance {@link Settings}.
 */
const handleTabKeyEvents = (e: KeyboardEvent, settings: Settings) => {
  const { shiftKey } = e;

  if (shiftKey) e.preventDefault();

  if (e.target) {
    (e.target as HTMLAnchorElement).click();
    focusOnInput(settings);
  }
  toggleDropdown(settings);
};

/**
 * Handles arrow keys events on the dropdown list.
 * @param e The Event object.
 * @param settings The instance {@link Settings}.
 */
const handleDropdownListArrowKeyEvents = (e: KeyboardEvent, settings: Settings) => {
  cleanupBubble(e);
  const { optionsStore, inputElement, navListElement } = settings;

  const { key } = e;
  const focusedOptionIndex = optionsStore.findIndex(({ focused }) => focused);
  if (focusedOptionIndex < 0) return;

  const nextOption = optionsStore[key === ARROW_UP_KEY ? focusedOptionIndex - 1 : focusedOptionIndex + 1];

  if (key === ARROW_UP_KEY && !nextOption) {
    toggleDropdown(settings);

    return;
  }

  navListElement.style.pointerEvents = 'none';

  const nextEl = nextOption?.element;

  if (!nextEl) return;

  const nextElBox = nextEl.getBoundingClientRect();
  const navListBox = navListElement.getBoundingClientRect();

  const navListBottom = navListBox.bottom - nextEl.offsetHeight;
  const navListTop = navListBox.top + nextEl.offsetHeight;

  const isAtBottom = nextElBox.bottom >= navListBottom;
  const isAtTop = navListTop >= nextElBox.top;

  nextEl.focus();

  if (isAtTop) {
    const optionBottom = nextEl.offsetTop + nextEl.offsetHeight;
    const currentBottom = navListElement.scrollTop + navListElement.offsetHeight;

    if (optionBottom > currentBottom) {
      navListElement.scrollTop = optionBottom - navListElement.offsetHeight;
      return;
    }

    if (nextEl.offsetTop < navListElement.scrollTop) {
      navListElement.scrollTop = nextEl.offsetTop;
      return;
    }

    navListElement.scrollTop = nextEl.offsetTop;
  }

  if (isAtBottom && key !== ARROW_UP_KEY) {
    const optionBottom = nextEl.offsetTop + nextEl.offsetHeight;
    const currentBottom = navListElement.scrollTop + navListElement.offsetHeight;

    if (optionBottom < currentBottom) {
      navListElement.scrollTop = optionBottom - navListElement.offsetHeight;
      return;
    }

    if (nextEl.offsetTop > navListElement.scrollTop) {
      navListElement.scrollTop = nextEl.offsetTop;
      return;
    }

    navListElement.scrollTop = nextEl.offsetTop;
  }

  setActiveDescendant(inputElement, nextOption?.element);
};

/**
 * Handles keyboard keydown events on the dropdown list.
 * @param e The Event object.
 * @param settings The instance {@link Settings}.
 */
export const handleDropdownListKeydownEvents = (e: KeyboardEvent, settings: Settings) => {
  const { key } = e;

  cleanupBubble(e);

  if (key === ESCAPE_KEY) {
    handleClearInput(e, settings);

    const dropdownIsOpen = settings.dropdownToggle.getAttribute(ARIA_EXPANDED_KEY) === 'true';

    if (dropdownIsOpen) {
      toggleDropdown(settings);
    }
    return;
  }

  const enterKeyPressed = key === ENTER_KEY;

  const optionData = getClickedOptionData(e, settings);

  if (enterKeyPressed && optionData) handleDropdownListClickEvents(e, optionData, settings);

  if (!CONTROL_KEYS.includes(key)) return;

  if (key === TAB_KEY) handleTabKeyEvents(e, settings);
  else if (key === ARROW_UP_KEY || key === ARROW_DOWN_KEY) handleDropdownListArrowKeyEvents(e, settings);
};

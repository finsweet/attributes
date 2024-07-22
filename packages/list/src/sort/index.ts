import { DROPDOWN_CSS_CLASSES, type DropdownElement, isHTMLSelectElement } from '@finsweet/attributes-utils';

import type { List } from '../components/List';
import { initButtons } from './buttons';
import { initDropdown } from './dropdown';
import { initHTMLSelect } from './select';

/**
 * Inits sorting functionality for the list.
 */
export const initListSorting = (list: List, triggers: HTMLElement[]) => {
  // Init mode
  const [firstTrigger] = triggers;
  const isSelect = isHTMLSelectElement(firstTrigger);
  const isDropdown = firstTrigger.closest<DropdownElement>(`.${DROPDOWN_CSS_CLASSES.dropdown}`);

  const cleanup = isSelect
    ? initHTMLSelect(firstTrigger, list)
    : isDropdown
    ? initDropdown(isDropdown, list)
    : initButtons(triggers, list);

  return cleanup;
};

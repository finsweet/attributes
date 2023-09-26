import { addListAnimation, type CMSList } from '@finsweet/attributes-cmscore';
import { type Dropdown, DROPDOWN_CSS_CLASSES, isHTMLSelectElement } from '@finsweet/attributes-utils';

import { listenListEvents } from './actions/events';
import { initButtons } from './modes/buttons';
import { initDropdown } from './modes/dropdown';
import { initHTMLSelect } from './modes/select';
import { DEFAULT_ASC_CLASS, DEFAULT_DESC_CLASS } from './utils/constants';
import {
  getAttribute,
  getInstanceIndex,
  getSettingAttributeName,
  queryAllElements,
  queryElement,
} from './utils/selectors';
import type { CSSClasses } from './utils/types';

/**
 * Inits sorting on a `CMSList`.
 * @param listInstance The {@link CMSList} instance.
 *
 * @returns A cleanup callback.
 */
export const initListSorting = (listInstance: CMSList) => {
  const { listOrWrapper } = listInstance;

  const instanceIndex = getInstanceIndex(listOrWrapper);

  const triggers = queryAllElements('trigger', { instanceIndex });
  if (!triggers.length) return;

  const { items } = listInstance;

  // Store item props
  for (const item of items)
    item.collectProps({ fieldKey: getSettingAttributeName('field'), typeKey: getSettingAttributeName('type') });

  // Animation
  addListAnimation(listInstance, {
    durationKey: getSettingAttributeName('duration'),
    easingKey: getSettingAttributeName('easing'),
  });

  // Scroll Anchor Element
  if (!listInstance.scrollAnchor) {
    const scrollAnchor = queryElement('scroll-anchor', { instanceIndex });
    if (scrollAnchor) listInstance.scrollAnchor = scrollAnchor;
  }

  // CSS Classes
  const cssClasses: CSSClasses = {
    asc: getAttribute(listOrWrapper, 'asc') || DEFAULT_ASC_CLASS,
    desc: getAttribute(listOrWrapper, 'desc') || DEFAULT_DESC_CLASS,
  };

  // Init mode
  const [firstTrigger] = triggers;
  const isSelect = isHTMLSelectElement(firstTrigger);
  const isDropdown = firstTrigger.closest<Dropdown>(`.${DROPDOWN_CSS_CLASSES.dropdown}`);

  const sortActions = isSelect
    ? initHTMLSelect(firstTrigger, listInstance)
    : isDropdown
    ? initDropdown(isDropdown, listInstance)
    : initButtons(triggers, listInstance, cssClasses);

  if (!sortActions) return;

  // Listen events
  listenListEvents(listInstance, sortActions.sortItems);

  return sortActions.cleanup;
};

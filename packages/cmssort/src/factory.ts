import type { Dropdown } from '@finsweet/ts-utils';
import { DROPDOWN_CSS_CLASSES, isHTMLSelectElement } from '@finsweet/ts-utils';

import type { CMSCore, CMSList } from '$packages/cmscore';

import { listenListEvents } from './actions/events';
import { initButtons } from './modes/buttons';
import { initDropdown } from './modes/dropdown';
import { initHTMLSelect } from './modes/select';
import { ATTRIBUTES, DEFAULT_ASC_CLASS, DEFAULT_DESC_CLASS, queryElement } from './utils/constants';
import type { CSSClasses } from './utils/types';

// Constants destructuring
const {
  element: { key: elementKey },
  field: { key: fieldKey },
  type: { key: typeKey },
  duration: { key: durationKey },
  easing: { key: easingKey },
  ascClass: { key: ascClassKey },
  descClass: { key: descClassKey },
} = ATTRIBUTES;

/**
 * Inits sorting on a `CMSList`.
 * @param listInstance The {@link CMSList} instance.
 *
 * @returns A cleanup callback.
 */
export const initListSorting = async (listInstance: CMSList, cmsCore: CMSCore) => {
  const instanceIndex = listInstance.getInstanceIndex(elementKey);

  const triggers = queryElement<HTMLElement>('trigger', { instanceIndex, all: true });
  if (!triggers.length) return;

  const { items } = listInstance;

  // Store item props
  for (const item of items) item.collectProps({ fieldKey, typeKey });

  // Animation
  cmsCore.addListAnimation(listInstance, { durationKey, easingKey });

  // Scroll Anchor Element
  if (!listInstance.scrollAnchor) {
    const scrollAnchor = queryElement<HTMLElement>('scrollAnchor', { instanceIndex });
    if (scrollAnchor) listInstance.scrollAnchor = scrollAnchor;
  }

  // CSS Classes
  const cssClasses: CSSClasses = {
    asc: listInstance.getAttribute(ascClassKey) || DEFAULT_ASC_CLASS,
    desc: listInstance.getAttribute(descClassKey) || DEFAULT_DESC_CLASS,
  };

  // Init mode
  const [firstTrigger] = triggers;
  const isSelect = isHTMLSelectElement(firstTrigger);
  const isDropdown = firstTrigger.closest<Dropdown>(`.${DROPDOWN_CSS_CLASSES.dropdown}`);

  const sortActions = isSelect
    ? await initHTMLSelect(firstTrigger, listInstance)
    : isDropdown
    ? initDropdown(isDropdown, listInstance)
    : initButtons(triggers, listInstance, cssClasses);

  if (!sortActions) return;

  // Listen events
  listenListEvents(listInstance, sortActions.sortItems);

  return sortActions.cleanup;
};

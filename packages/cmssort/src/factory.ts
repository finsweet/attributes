import type { CMSList } from '@finsweet/attributes-cmscore';
import { addListAnimation } from '@finsweet/attributes-cmscore';
import { DROPDOWN_CSS_CLASSES } from '@finsweet/ts-utils';
import type { Dropdown } from '@finsweet/ts-utils';

import { listenListEvents } from './actions/events';
import { initButtons } from './modes/buttons';
import { initDropdown } from './modes/dropdown';
import { initHTMLSelect } from './modes/select';
import { ATTRIBUTES, DEFAULT_ASC_CLASS, DEFAULT_DESC_CLASS, getSelector, queryElement } from './utils/constants';
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
 * @returns An awaitable Promise.
 */
export const initListSorting = async (listInstance: CMSList) => {
  const instanceIndex = listInstance.getInstanceIndex(elementKey);

  const triggers = document.querySelectorAll<HTMLElement>(getSelector('element', 'trigger', { instanceIndex }));
  if (!triggers.length) return;

  const { items } = listInstance;

  // Store item props
  for (const item of items) item.collectProps({ fieldKey, typeKey });

  // Animation
  addListAnimation(listInstance, { durationKey, easingKey });

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
  const isSelect = firstTrigger instanceof HTMLSelectElement;
  const isDropdown = firstTrigger.closest<Dropdown>(`.${DROPDOWN_CSS_CLASSES.dropdown}`);

  const sortItems = isSelect
    ? await initHTMLSelect(firstTrigger, listInstance)
    : isDropdown
    ? initDropdown(isDropdown, listInstance)
    : initButtons(triggers, listInstance, cssClasses);

  if (!sortItems) return;

  // Listen events
  listenListEvents(listInstance, sortItems);
};

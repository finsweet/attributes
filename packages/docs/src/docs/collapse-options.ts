import { isElement, simulateEvent } from '@finsweet/ts-utils';

import { OPTIONS_TRIGGER_SELECTOR, queryElement } from '../utils/constants';

/**
 * Enables the `Collapse All` floating button.
 */
export const initCollapseOptions = () => {
  const collapseAllDropdownsTrigger = queryElement<HTMLAnchorElement>('collapseAllDropdowns');

  if (!collapseAllDropdownsTrigger) return;

  let collapsing = false;

  const { href } = collapseAllDropdownsTrigger;
  const { hash } = new URL(href);

  const scrollAnchor = hash ? document.querySelector(hash) : null;

  const expandedToggles: Set<Element> = new Set();

  const displayTrigger = (display = true) => {
    collapseAllDropdownsTrigger.style.display = display ? 'flex' : 'none';
  };

  displayTrigger(false);

  window.addEventListener('click', (e) => {
    if (collapsing) return;

    const { target } = e;

    if (!isElement(target)) return;

    const isToggleElement = target.closest(OPTIONS_TRIGGER_SELECTOR);
    if (!isToggleElement) return;

    collapsing = true;

    const wasExpanded = expandedToggles.has(isToggleElement);

    if (wasExpanded) {
      expandedToggles.delete(isToggleElement);

      if (!expandedToggles.size) displayTrigger(false);

      collapsing = false;

      return;
    }

    expandedToggles.add(isToggleElement);

    displayTrigger();

    collapsing = false;
  });

  collapseAllDropdownsTrigger.addEventListener('click', (e) => {
    if (collapsing) return;

    collapsing = true;

    e.preventDefault();
    e.stopImmediatePropagation();

    for (const toggle of expandedToggles) simulateEvent(toggle, ['click']);

    expandedToggles.clear();

    displayTrigger(false);

    scrollAnchor?.scrollIntoView({ block: 'start', behavior: 'smooth' });

    collapsing = false;
  });
};

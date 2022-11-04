import { addListener, isVisible, NAVBAR_CSS_CLASSES } from '@finsweet/ts-utils';
import debounce from 'just-debounce';

import { ATTRIBUTES, getSelector, NAV_MEDIAS } from './constants';
import { disableScrolling, enableScrolling, findFirstScrollableElement } from './scroll';

// Contants destructuring
const { navMenu: navMenuCSSClass } = NAVBAR_CSS_CLASSES;

// Store
const displayTriggersStore: Map<
  HTMLElement,
  { visible: boolean; firstScrollableElement: HTMLElement; matchMedia?: string | null }
> = new Map();

/**
 * Handle the state change
 * @param trigger
 * @param preserveScrollTargets
 */
const handleStateChange = (trigger: HTMLElement, preserveScrollTargets: NodeListOf<Element>) => {
  // Get the trigger data
  const triggerData = displayTriggersStore.get(trigger);
  if (!triggerData) return;

  // Extract values
  const { matchMedia, firstScrollableElement, visible: wasVisibleBefore } = triggerData;

  // Make sure the matchMedia requirement is valid
  if (matchMedia && !window.matchMedia(matchMedia).matches) return;

  // Check visibility
  const visible = isVisible(trigger);
  if (visible === wasVisibleBefore) return;

  // Perform actions
  if (wasVisibleBefore) enableScrolling();
  else if (visible) {
    for (const target of new Set([...preserveScrollTargets, firstScrollableElement])) disableScrolling(target);
  }

  // Store new state
  triggerData.visible = visible;
};

/**
 * Handle the display triggers
 * @param preserveScrollTargets
 *
 * @returns A callback to destroy the observers and listeners.
 */
export const initDisplayTriggers = (preserveScrollTargets: NodeListOf<Element>): (() => void) => {
  // DOM Elements
  const smartNavSelector = getSelector('element', 'nav');

  const displayTriggers = document.querySelectorAll<HTMLElement>(
    `${getSelector(
      'element',
      'whenVisible'
    )}, ${smartNavSelector}.${navMenuCSSClass}, ${smartNavSelector} .${navMenuCSSClass}`
  );

  // Define MutationObserver's callback
  const callback: MutationCallback = (mutations) => {
    const trigger = mutations[0].target as HTMLElement;
    handleStateChange(trigger, preserveScrollTargets);
  };

  const debouncedCallback = debounce(callback, 25);

  // Create MutationObserver
  const observer = new MutationObserver(debouncedCallback);

  // Init
  for (const trigger of displayTriggers) {
    // Get the trigger's matchMedia requisite
    let matchMedia = trigger.getAttribute(ATTRIBUTES.matchMedia.key);

    // Navbar special
    const navbar = trigger.closest<HTMLDivElement>('.w-nav');
    if (navbar) {
      const collapsesAt = navbar.dataset.collapse as keyof typeof NAV_MEDIAS | undefined;
      if (collapsesAt) matchMedia = NAV_MEDIAS[collapsesAt];
    }

    // Get the first scrollable element
    const firstScrollableElement = findFirstScrollableElement(trigger) || trigger;

    // Store the trigger's data
    displayTriggersStore.set(trigger, {
      visible: isVisible(trigger),
      firstScrollableElement,
      matchMedia,
    });

    // Trigger a state change check
    handleStateChange(trigger, preserveScrollTargets);

    // Observe the element
    observer.observe(trigger, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
  }

  // Handle window resize events
  const debouncedStateChangeHandler = debounce(() => {
    for (const trigger of displayTriggers) {
      handleStateChange(trigger, preserveScrollTargets);
    }
  }, 250);

  const resizeCleanup = addListener(window, 'resize', debouncedStateChangeHandler);

  return () => {
    observer.disconnect();
    resizeCleanup();
  };
};

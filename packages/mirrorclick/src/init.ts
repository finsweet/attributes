import {
  addListener,
  type FsAttributeInit,
  isElement,
  isHTMLElement,
  parseNumericAttribute,
} from '@finsweet/attributes-utils';

import { getAttribute, getElementSelector, getInstance, queryAllElements } from './utils/selectors';

/**
 * Inits click events mirroring.
 */
export const init: FsAttributeInit = () => {
  const clickCleanup = addListener(window, 'click', ({ target }) => {
    if (!isElement(target)) return;

    const mirrorTrigger = target.closest(getElementSelector('trigger'));
    if (!mirrorTrigger) return;

    // Get the instance index
    const instance = getInstance(mirrorTrigger);

    const mirrorTargets = queryAllElements('target', { instance });

    for (const mirrorTarget of mirrorTargets) {
      if (!isHTMLElement(mirrorTarget)) continue;

      const rawDelay = getAttribute(mirrorTarget, 'delay') || getAttribute(mirrorTrigger, 'delay');
      const delay = parseNumericAttribute(rawDelay);

      if (delay) window.setTimeout(() => mirrorTarget.click(), delay);
      else mirrorTarget.click();
    }
  });

  return {
    destroy() {
      clickCleanup();
    },
  };
};

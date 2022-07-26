import { MIRROR_CLICK_ATTRIBUTE } from '@global/constants/attributes';
import { getInstanceIndex } from '@global/helpers';

import { ATTRIBUTES, getSelector } from './constants';

// Constants  destructuring
const {
  element: { key: elementKey },
  delay: { key: delayKey },
} = ATTRIBUTES;

/**
 * Inits click events mirroring.
 */
export const init = (): void => {
  window.addEventListener('click', ({ target }) => {
    if (!(target instanceof Element)) return;

    const mirrorTrigger = target.closest(getSelector('element', 'trigger', { operator: 'prefixed' }));
    if (!mirrorTrigger) return;

    // Get the instance index
    const instanceIndex = getInstanceIndex(mirrorTrigger, elementKey);

    const mirrorTargets = document.querySelectorAll(getSelector('element', 'target', { instanceIndex }));

    for (const mirrorTarget of mirrorTargets) {
      if (!(mirrorTarget instanceof HTMLElement)) continue;

      const rawDelay = mirrorTarget.getAttribute(delayKey) || mirrorTrigger.getAttribute(delayKey);
      const delay = rawDelay ? parseInt(rawDelay) : undefined;

      if (delay) window.setTimeout(() => mirrorTarget.click(), delay);
      else mirrorTarget.click();
    }
  });

  window.fsAttributes[MIRROR_CLICK_ATTRIBUTE].resolve?.(undefined);
};

import { simulateEvent } from '@finsweet/ts-utils';
import { TABINDEX_KEY } from 'global/constants/a11ty';

/**
 * Makes sure all `div` and `li` elements that have a `tabindex` attribute emit a click event on Enter and Space keydown.
 */
export const emitClickEvents = (): void => {
  window.addEventListener('keydown', ({ target, key }) => {
    if (key !== 'Enter' && key !== ' ') return;
    if (!(target instanceof HTMLDivElement || target instanceof HTMLLIElement)) return;
    if (!target.getAttribute(TABINDEX_KEY)) return;

    simulateEvent(target, 'click');
  });
};

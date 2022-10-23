import { addListener, isFormField } from '@finsweet/ts-utils';

import { getSelector } from '../utils/constants';
import { syncValue } from './sync';

/**
 * Listens for input events.
 * @returns A callback to remove the event listeners.
 */
export const listenEvents = () => {
  const removeListener = addListener(window, 'input', ({ target }: Event) => {
    if (!(target instanceof Element)) return;

    const sourceElement = target.closest(getSelector('element', 'source', { operator: 'prefixed' }));

    if (isFormField(sourceElement)) {
      syncValue(sourceElement);
    }
  });

  return removeListener;
};

import { initReadTime } from './factory';
import { ATTRIBUTE, queryElement } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = (): void => {
  const timeElements = queryElement('time', { operator: 'prefixed', all: true });

  for (const timeElement of timeElements) {
    initReadTime(timeElement);
  }

  window.fsAttributes[ATTRIBUTE].resolve?.(undefined);
};

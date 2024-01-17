import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initReadTime } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const timeElements = queryAllElements('time');

  for (const timeElement of timeElements) {
    initReadTime(timeElement);
  }

  return {};
};

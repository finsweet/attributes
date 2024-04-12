import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initDateElement } from './factory';
import { queryAllElements } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  // localize date elements
  const dateElements = queryAllElements('date');

  dateElements.map(initDateElement);

  return {};
};

import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { logHello } from './actions/console';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  logHello();

  return {};
};

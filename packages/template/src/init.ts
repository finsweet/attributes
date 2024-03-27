import { type FsAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { logHello } from './actions/console';

/**
 * Inits the attribute.
 */
export const init: FsAttributeInit = async () => {
  await waitWebflowReady();

  logHello();

  return {};
};

import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initializeClient } from './actions/client';
import { hideLoaders } from './actions/loaders';
import { initFlags } from './factory';
import { IS_STAGING, SETTINGS } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit<typeof SETTINGS> = async ({
  devclientid,
  prodclientid,
  eventstotrack,
} = {}) => {
  await waitWebflowReady();

  const clientId = IS_STAGING ? devclientid || prodclientid : prodclientid || devclientid;
  if (!clientId) {
    throw new Error('Client ID is required');
  }

  const client = await initializeClient(clientId, eventstotrack);
  const flags = client.allFlags();

  initFlags(flags);
  hideLoaders();

  return {
    result: client,
  };
};

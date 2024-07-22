import { type FinsweetAttributeInit, waitWebflowReady } from '@finsweet/attributes-utils';

import { initializeClient } from './actions/client';
import { hideLoaders } from './actions/loaders';
import { initFlags } from './factory';
import { IS_STAGING } from './utils/constants';
import { getAttribute } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const devclientid = getAttribute(null, 'devclientid');
  const prodclientid = getAttribute(null, 'prodclientid');
  const eventstotrack = getAttribute(null, 'eventstotrack');

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

import type { LDClient } from 'launchdarkly-js-client-sdk';

import { CMS_ATTRIBUTE_ATTRIBUTE, LAUNCHDARKLY_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import type { LaunchDarklyAttributes } from '../src/utils/types';
import { initializeClient } from './actions/client';
import { hideLoaders } from './actions/loaders';
import { initFlags } from './factory';
import { IS_STAGING } from './utils/constants';

/**
 * Inits the attribute.
 */
export const init = async ({ devClientId, prodClientId, eventsToTrack }: LaunchDarklyAttributes): Promise<LDClient> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const clientId = IS_STAGING ? devClientId || prodClientId : prodClientId || devClientId;
  if (!clientId) {
    throw new Error('Client ID is required');
  }

  const client = await initializeClient(clientId, eventsToTrack);
  const flags = client.allFlags();

  initFlags(flags);
  hideLoaders();

  return finalizeAttribute(LAUNCHDARKLY_ATTRIBUTE, client);
};

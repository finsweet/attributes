import { extractCommaSeparatedValues } from '@finsweet/ts-utils';
import { initialize, LDClient } from 'launchdarkly-js-client-sdk';

import type { LaunchDarklyAttributes } from '../utils/types';

/**
 * Initializes the Launch Darkly client.
 * Starts tracking any events passed.
 *
 * @param clientId
 * @param eventsToTrack
 */
export const initializeClient = async (
  clientId: string,
  eventsToTrack: LaunchDarklyAttributes['eventsToTrack']
): Promise<LDClient> => {
  const client = initialize(clientId, { anonymous: true });
  await client.waitForInitialization();

  if (eventsToTrack) {
    const events = Array.isArray(eventsToTrack) ? eventsToTrack : extractCommaSeparatedValues(eventsToTrack);
    events.forEach((event) => client.track(event));
  }

  return client;
};

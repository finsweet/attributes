import { extractCommaSeparatedValues } from '@finsweet/attributes-utils';
import { initialize, type LDClient } from 'launchdarkly-js-client-sdk';

/**
 * Initializes the Launch Darkly client.
 * Starts tracking any events passed.
 *
 * @param clientId
 * @param eventsToTrack
 */
export const initializeClient = async (clientId: string, eventsToTrack?: string): Promise<LDClient> => {
  const client = initialize(clientId, { anonymous: true });
  await client.waitForInitialization();

  if (eventsToTrack) {
    const events = Array.isArray(eventsToTrack) ? eventsToTrack : extractCommaSeparatedValues(eventsToTrack);
    events.forEach((event) => client.track(event));
  }

  return client;
};

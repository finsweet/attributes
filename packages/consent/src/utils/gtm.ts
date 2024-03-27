import { Debug } from '../components';
import { CONSENTS } from './constants';
import type { Consents } from './types';

/**
 * Fire GTM Event, making sure it's unique and has not been fired before
 * @param eventName
 */
export const fireUniqueGTMEvent = (eventName: string): void => {
  window.dataLayer = window.dataLayer || [];
  if (!window.dataLayer.find((data) => data.event === eventName)) {
    window.dataLayer.push({ event: eventName });
    Debug.alert(`The GTM event ${eventName} has been fired.`, 'info');
  }
};

/**
 * Get the status of a consent category
 * @param category
 * @param consents
 */
export const getConsentStatus = (
  category: (typeof CONSENTS)[number],
  consents: Partial<Consents>
): 'granted' | 'denied' => {
  // Default to 'denied' if the category is not explicitly granted
  return consents[category] ? 'granted' : 'denied';
};

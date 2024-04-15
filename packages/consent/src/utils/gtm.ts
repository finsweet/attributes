import Debug from '../components/Debug';
import type { ConsentMode } from './types';

/**
 * Set the consent mode for GTM
 * @param consentMode
 */
export const setConsentMode = (action: 'default' | 'update', consentMode: ConsentMode) => {
  gtag('consent', action, consentMode);
};

/**
 * Fire GTM Event, making sure it's unique and has not been fired before
 * @param event
 */
export const fireUniqueGTMEvent = (event: string): void => {
  window.dataLayer = window.dataLayer || [];

  const hasFired = window.dataLayer.find((data) => typeof data === 'object' && 'event' in data && data.event === event);
  if (hasFired) return;

  window.dataLayer.push({ event });

  Debug.alert(`The GTM event ${event} has been fired with its equivalent consent mode.`, 'info');
};

/**
 * Pushes the function arguments to the GTM dataLayer.
 * @param args
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];

  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

import { Debug } from '../components';

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

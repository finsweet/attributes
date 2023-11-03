/* eslint-disable @typescript-eslint/ban-ts-comment */
import { extractCommaSeparatedValues, isNotEmpty } from '@finsweet/attributes-utils';
import Emittery from 'emittery';
import { nanoid } from 'nanoid';

import { alert } from './components/Debug';
import { useStore } from './Store';
import {
  type Action,
  CONSENTS,
  type Consents,
  createNewIFrameElement,
  createNewScriptElement,
  DYNAMIC_KEYS,
  fireUniqueGTMEvent,
  getAttribute,
  getConsentsCookie,
  getSettingSelector,
  getUpdatedStateCookie,
  MAIN_KEY,
  POSTConsentsToEndpoint,
  queryElement,
  removeAllCookies,
  setConsentsCookie,
  setUpdatedStateCookie,
} from './utils';

// Types
interface ConsentManagerEvents {
  updateconsents: undefined;
}

/**
 * Handles all the logic related to:
 * - Storing all the `type="fs-consent"` script.
 * - Storing and managing all the consents from the user.
 * - Firing the correspondent scripts and GTM events.
 */
export const useConsentController = (store: ReturnType<typeof useStore>) => {
  if (!store) return;

  const emitter = new Emittery<ConsentManagerEvents>();

  const storeElements = () => {
    // Get all the scripts and iFrames
    const existingElements = document.querySelectorAll<HTMLScriptElement | HTMLIFrameElement>(
      `script[type="${MAIN_KEY}"], iframe${getSettingSelector('src')}`
    );

    // Make sure we store them just once
    const storedElements = store.getStoredElements();
    // prettier-ignore
    const unstoredElements = [...existingElements].filter((existingElement) => !storedElements.find(({ element }) => existingElement === element));

    unstoredElements.forEach((element) => {
      // Get the categories
      const categories = extractCommaSeparatedValues(
        getAttribute(element, 'category') || getAttribute(element, 'categories'),
        true
      ) as (typeof CONSENTS)[number][];

      // Scripts
      if (element instanceof HTMLScriptElement) {
        store.storeScript({
          categories,
          element,
          active: false,
        });
      }

      // iFrames
      if (element instanceof HTMLIFrameElement) {
        // Get the src
        const src = getAttribute(element, 'src');
        if (!src) return;

        element.src = '';

        // Get the placeholder
        const placeholder = queryElement('placeholder') ?? undefined;

        store.storeIFrame({
          categories,
          element,
          src,
          placeholder,
          active: false,
        });
      }

      // Debug mode
      alert(`Stored the element: ${element.outerHTML} in the categories: ${categories.join(', ')}`, 'info');
    });
  };

  /**
   * Loads the stored consents from the cookies
   */
  const loadConsents = () => {
    // Get the consents
    const consents = getConsentsCookie();

    if (!consents) return;

    // Debug mode
    alert(`The following consents were loaded from the stored cookies: ${JSON.stringify(consents)}`, 'info');

    // Store the consents
    store.storeConsents(consents);

    // If the user updated the consents on the previous page load, remove all cookies before loading the scripts
    const consentsWereUpdated = getUpdatedStateCookie();
    if (consentsWereUpdated) {
      removeAllCookies();

      // Debug mode
      alert('Previously denied cookies have been deleted.', 'info');
    }
  };

  /**
   * Activates the correspondent scripts.
   * Fires a GTM event when a consent is activated.
   */
  const applyConsents = async () => {
    const consents = getConsentsCookie();

    if (consents) store.storeConsents(consents);

    // Activate the correspondent elements
    const activables = store.getActivableElements();

    for (const elementData of activables) {
      await new Promise((resolve) => {
        const { element } = elementData;
        const { src, parentElement } = element;

        let newElement: HTMLScriptElement | HTMLIFrameElement;

        if (elementData.type === 'script') newElement = createNewScriptElement(elementData);
        else if (elementData.type === 'iframe') newElement = createNewIFrameElement(elementData);
        else {
          resolve(undefined);
          return;
        }

        /**
         * Handles when the element has loaded to the DOM.
         */
        const handleLoad = () => {
          // Store data
          elementData.element = newElement;
          elementData.active = true;

          resolve(undefined);
        };

        if (src) newElement.addEventListener('load', handleLoad);

        // Insert new script and remove the old one
        parentElement?.insertBefore(newElement, element);
        element.remove();

        if (!src) handleLoad();
      });
    }

    // Fire the correspondent GTM events
    const consentEntries = store.getConsentsEntries();

    consentEntries.forEach(([consentKey, value]) => {
      if (value) fireUniqueGTMEvent(DYNAMIC_KEYS.gtmEvent(consentKey));
    });
  };

  /**
   * Updates the stored consents
   * @param consents
   */
  const updateConsents = (consents: Partial<Consents>, action: Action): void => {
    const { cookieMaxAge, endpoint, domain } = store;

    const checkboxEssential = queryElement('checkbox-essential');

    // if essential checkbox is checked by default, hidden input, Essential cookies are required by default.
    const essentialIsMandatory = checkboxEssential?.hasAttribute('checked');

    if (checkboxEssential && essentialIsMandatory && !consents.essential) {
      // we make sure essential is always true
      consents = {
        ...consents,
        essential: true,
      };
    }

    // Store the consents
    const updatedConsents = store.storeConsents(consents);

    const consentId = nanoid();
    setConsentsCookie(consentId, store.getConsents(), cookieMaxAge, domain);

    // POST the consents to the endpoint
    if (endpoint) {
      POSTConsentsToEndpoint({
        action,
        endpoint,
        id: consentId,
        consents: store.getConsents(),
        bannerText: store.getBannerText() || '',
      });
    }
    // If any consent was updated, set an updatedState cookie and apply the consents
    if (updatedConsents.length) {
      setUpdatedStateCookie(cookieMaxAge, domain);
      applyConsents();

      // Debug mode
      alert(`The following consents were updated: ${updatedConsents.join(', ')}`, 'info');
    }

    emitter.emit('updateconsents');
  };

  /**
   * Function to set consent mode and update it based on the consent controller.
   * Ref: https://www.youtube.com/watch?v=MqAEbshMv84&t=493s
   * Consent Mode Docs: https://support.google.com/analytics/answer/9976101
   */
  const setConsentMode = (): void => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments);
    }

    const consents = store.getConsents();

    const consentMode = {
      /**
       * Example: User language
       */
      functionality_storage: consents?.essential ? 'granted' : 'denied',

      /**
       * Mostly Authorization or Authentication
       */
      security_storage: consents?.essential ? 'granted' : 'denied',

      /**
       * Related to Google Analytics/Ads
       */
      ad_storage: consents?.marketing ? 'granted' : 'denied',

      /**
       * Related to Google Analytics
       */
      analytics_storage: consents?.analytics ? 'granted' : 'denied',

      /**
       * Example: User recommendations
       */
      personalization_storage: consents?.personalization ? 'granted' : 'denied',

      /**
       * Uncategorised: This is not part of the default consent modes, can be added as a custom required consent under GTM consent settings.
       */
      uncategorized_storage: consents?.uncategorized ? 'granted' : 'denied',
    };

    // @ts-ignore
    gtag('consent', !consents ? 'default' : 'update', {
      ...consentMode,
    });
  };

  /**
   * Initializes the Consent Mode and updates it when the consent controller changes.
   * Ref: https://support.google.com/analytics/answer/9976101
   */
  const initConsentMode = (): void => {
    setConsentMode();

    emitter.on('updateconsents', () => {
      setConsentMode();
    });
  };

  loadConsents();

  initConsentMode();

  storeElements();

  applyConsents();

  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => {
      storeElements();
      applyConsents();
    });
  }

  return {
    storeElements,
    loadConsents,
    applyConsents,
    updateConsents,
    on: emitter.on.bind(emitter),
  };
};

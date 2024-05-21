import { extractCommaSeparatedValues } from '@finsweet/attributes-utils';
import Emittery from 'emittery';
import { nanoid } from 'nanoid';

import { Debug } from './components';
import Store from './Store';
import {
  type Action,
  type ConsentMode,
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
  setConsentMode,
  setConsentModeCookies,
  setConsentsCookie,
  setUpdatedStateCookie,
  UNCATEGORIZED_CONSENT,
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
export default class ConsentController extends Emittery<ConsentManagerEvents> {
  /**
   * Create a new Consent Controller instance.
   * @param store A Store instance where all the data will be stored.
   */
  constructor(private store: Store) {
    super();

    this.loadConsents();

    this.storeElements();

    this.applyConsents();
  }

  /**
   * Stores all the third party scripts and iFrames
   */
  private storeElements() {
    const { store } = this;

    // Get all the scripts and iFrames
    const existingElements = document.querySelectorAll<HTMLScriptElement | HTMLIFrameElement>(
      `script[type="${MAIN_KEY}"], iframe${getSettingSelector('src')}`
    );

    // Make sure we store them just once
    const storedElements = store.getStoredElements();

    const unstoredElements = [...existingElements].filter(
      (existingElement) => !storedElements.find(({ element }) => existingElement === element)
    );

    unstoredElements.forEach((element) => {
      // Get the categories
      let categories = [] as (typeof CONSENTS)[number][];

      if (getAttribute(element, 'categories', true)) {
        categories = extractCommaSeparatedValues(
          `${getAttribute(element, 'categories', true)}`,
          true
        ) as (typeof CONSENTS)[number][];
      } else {
        categories = extractCommaSeparatedValues(`${UNCATEGORIZED_CONSENT}`, true) as (typeof CONSENTS)[number][];
      }

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
        const src = getAttribute(element, 'src', true);
        if (!src) return;

        element.src = '';

        // Get the placeholder
        const placeholder = queryElement('placeholder') as HTMLElement;

        store.storeIFrame({
          categories,
          element,
          src,
          placeholder,
          active: false,
        });
      }

      // Debug mode
      Debug.alert(`Stored the element: ${element.outerHTML} in the categories: ${categories.join(', ')}`, 'info');
    });
  }

  /**
   * Loads the stored consents from the cookies
   */
  private loadConsents() {
    // Get the consents
    const consents = getConsentsCookie();

    // Set consent mode for GTM
    const consentModes: ConsentMode = {
      ad_storage: consents?.marketing ? 'granted' : 'denied',
      ad_user_data: consents?.marketing ? 'granted' : 'denied',
      ad_personalization: consents?.marketing ? 'granted' : 'denied',
      analytics_storage: consents?.analytics ? 'granted' : 'denied',
      functionality_storage: consents?.personalization ? 'granted' : 'denied',
      personalization_storage: consents?.personalization ? 'granted' : 'denied',
      security_storage: 'granted',
    };

    // Set consent mode cookies
    setConsentModeCookies(consentModes, 120, this.store.domain);

    // Set consent mode for GTM
    setConsentMode('default', consentModes);

    if (!consents) return;

    // Fire the correspondent GTM events
    for (const consentKey in consents || {}) {
      const key = consentKey as keyof Consents;
      const consented = consents[key];

      if (consented) {
        const event = DYNAMIC_KEYS.gtmEvent(key);
        fireUniqueGTMEvent(event);
      }
    }

    // Debug mode
    Debug.alert(`The following consents were loaded from the stored cookies: ${JSON.stringify(consents)}`, 'info');

    // Store the consents
    this.store.storeConsents(consents);

    // If the user updated the consents on the previous page load, remove all cookies before loading the scripts
    const consentsWereUpdated = getUpdatedStateCookie();
    if (consentsWereUpdated) {
      removeAllCookies();

      // Debug mode
      Debug.alert('Previously denied cookies have been deleted.', 'info');
    }
  }

  /**
   * Activates the correspondent scripts.
   * Fires a GTM event when a consent is activated.
   */
  private async applyConsents() {
    const { store } = this;

    // Activate the correspondent elements
    for (const elementData of store.getActivableElements()) {
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
  }

  /**
   * Updates the stored consents
   * @param consents
   */
  public updateConsents(consents: Partial<Consents>, action: Action): void {
    const { store } = this;
    const { cookieMaxAge, endpoint, domain } = store;

    if (!consents.essential) {
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

    // Set consent mode for GTM and fire the correspondent GTM events
    const consentMode: ConsentMode = {};

    for (const updatedConsent of updatedConsents) {
      const consented = consents[updatedConsent];
      const value = consented ? 'granted' : 'denied';

      if (updatedConsent === 'marketing') {
        consentMode.ad_storage = value;
        consentMode.ad_user_data = value;
        consentMode.ad_personalization = value;
      }

      if (updatedConsent === 'analytics') {
        consentMode.analytics_storage = value;
      }

      if (updatedConsent === 'personalization') {
        consentMode.functionality_storage = value;
        consentMode.personalization_storage = value;
      }

      if (consented) {
        const event = DYNAMIC_KEYS.gtmEvent(updatedConsent);
        fireUniqueGTMEvent(event);
      }
    }

    // Set consent mode cookies
    setConsentModeCookies(consentMode, 120, domain);

    // Set consent mode for GTM
    setConsentMode('update', consentMode);

    // POST the consents to the endpoint
    if (endpoint)
      POSTConsentsToEndpoint({
        action,
        endpoint,
        id: consentId,
        consents: store.getConsents(),
        bannerText: store.getBannerText() || '',
      });

    // If any consent was updated, set an updatedState cookie and apply the consents
    if (updatedConsents.length) {
      setUpdatedStateCookie(cookieMaxAge, domain);
      this.applyConsents();

      // Debug mode
      Debug.alert(`The following consents were updated: ${updatedConsents.join(', ')}`, 'info');
    }

    this.emit('updateconsents');
  }
}

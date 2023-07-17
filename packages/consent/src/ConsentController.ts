import Emittery from 'emittery';
import { nanoid } from 'nanoid';

import { Debug } from './components';
import { ATTRIBUTES, CONSENTS, DYNAMIC_KEYS, MAIN_KEY, UNCATEGORIZED_CONSENT } from './constants';
import Store from './Store';
import type { Action, Consents } from './types';
import {
  createNewIFrameElement,
  createNewScriptElement,
  extractCommaSeparatedValues,
  fireUniqueGTMEvent,
  getConsentsCookie,
  getUpdatedStateCookie,
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
export default class ConsentController extends Emittery<ConsentManagerEvents> {
  /**
   * Create a new Consent Controller instance.
   * @param store A Store instance where all the data will be stored.
   */
  constructor(private store: Store) {
    super();

    this.loadConsents();

    this.storeElements();

    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => {
        this.storeElements();
        this.applyConsents();
      });
    }

    this.applyConsents();
  }

  /**
   * Stores all the third party scripts and iFrames
   */
  private storeElements() {
    const { store } = this;

    // Get all the scripts and iFrames
    const existingElements = document.querySelectorAll<HTMLScriptElement | HTMLIFrameElement>(
      `script[type="${MAIN_KEY}"], iframe[${ATTRIBUTES.src}]`
    );

    // Make sure we store them just once
    const storedElements = store.getStoredElements();
    // prettier-ignore
    const unstoredElements = [...existingElements].filter((existingElement) => !storedElements.find(({ element }) => existingElement === element));

    unstoredElements.forEach((element) => {
      // Get the categories
      const categories = extractCommaSeparatedValues(
        element.getAttribute(ATTRIBUTES.categories[0]) || element.getAttribute(ATTRIBUTES.categories[1]),
        CONSENTS,
        UNCATEGORIZED_CONSENT
      );

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
        const src = element.getAttribute(ATTRIBUTES.src);
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
    if (!consents) return;

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

    // Fire the correspondent GTM events
    store.getConsentsEntries().forEach(([consentKey, value]) => {
      if (value) fireUniqueGTMEvent(DYNAMIC_KEYS.gtmEvent(consentKey));
    });
  }

  /**
   * Updates the stored consents
   * @param consents
   */
  public updateConsents(consents: Partial<Consents>, action: Action): void {
    const { store } = this;
    const { cookieMaxAge, endpoint, domain } = store;

    // Store the consents
    const updatedConsents = store.storeConsents(consents);

    const consentId = nanoid();
    setConsentsCookie(consentId, store.getConsents(), cookieMaxAge, domain);

    console.log('updateConsents', {
      action,
      endpoint,
      id: consentId,
      consents: store.getConsents(),
      bannerText: store.getBannerText() || '',
    });

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

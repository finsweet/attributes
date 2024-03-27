import { extractCommaSeparatedValues } from '@finsweet/attributes-utils';
import Emittery from 'emittery';
import { nanoid } from 'nanoid';

import { Debug } from './components';
import Store from './Store';
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
  getConsentStatus,
  getSettingSelector,
  getUpdatedStateCookie,
  MAIN_KEY,
  POSTConsentsToEndpoint,
  queryElement,
  removeAllCookies,
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

    this.setConsentMode();

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
   * Initializes the Consent Mode and updates it when the consent controller changes.
   * Ref: https://support.google.com/analytics/answer/9976101
   * Ref: https://www.youtube.com/watch?v=MqAEbshMv84&t=493s
   * Consent Mode Docs: https://support.google.com/analytics/answer/9976101
   * Article: https://www.simoahava.com/analytics/consent-settings-google-tag-manager/
   */
  public setConsentMode() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments);
    }

    const consents = this.store.getConsents();
    console.log('consents', consents);

    const consentMode = {
      /**
       * Google Analytics: Enables storage that supports the functionality of the website or app e.g. language settings.
       */
      functionality_storage: getConsentStatus('essential', consents),

      /**
       * Google Analytics: Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.
       */
      security_storage: getConsentStatus('essential', consents),

      /**
       * Google Analytics: : Enables storage (such as cookies) related to advertising.
       */
      ad_storage: getConsentStatus('essential', consents),

      /**
       * Google Analytics: Enables storage (such as cookies) related to analytics e.g. visit duration.
       */
      analytics_storage: getConsentStatus('analytics', consents),

      /**
       * Google Analytics: Enables storage related to personalization e.g. video recommendations
       */
      personalization_storage: getConsentStatus('personalization', consents),

      /**
       * Uncategorised: This is not part of the default consent modes, can be added as a custom required consent under GTM consent settings.
       */
      uncategorized_storage: getConsentStatus('uncategorized', consents),

      /**
       * Google Analytics: Sets consent for sending user data related to advertising to Google.
       */
      ad_user_data: getConsentStatus('personalization', consents),

      /**
       * Google Analytics: Sets consent for personalized advertising.
       */
      ad_personalization: getConsentStatus('personalization', consents),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    gtag('consent', !consents ? 'default' : 'update', {
      ...consentMode,
    });
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

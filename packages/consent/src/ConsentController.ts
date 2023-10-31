import { extractCommaSeparatedValues } from '@finsweet/attributes-utils';
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
      applyConsents();

      // Debug mode
      alert(`The following consents were updated: ${updatedConsents.join(', ')}`, 'info');
    }

    emitter.emit('updateconsents');
  };

  loadConsents();

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

import { waitDOMReady } from '@finsweet/attributes-utils';

import { useComponent } from './components/Component';
import { alert } from './components/Debug';
import { useConsentController } from './ConsentController';
import { useStore } from './Store';
import {
  ACTIONS,
  CONSENT_ALL,
  CONSENT_REQUIRED,
  FS_CONSENT_CSS,
  getElementSelector,
  type GlobalSettings,
  hasEnabledDNT,
  queryElement,
  renderComponentsFromSource,
} from './utils';

interface Handler {
  store: ReturnType<typeof useStore>;
  consentController: ReturnType<typeof useConsentController>;
  banner: ReturnType<typeof useComponent> | undefined;
  manager: ReturnType<typeof useComponent> | undefined;
  preferences: ReturnType<typeof useComponent> | undefined;
}

let banner: ReturnType<typeof useComponent> | undefined;
let preferences: ReturnType<typeof useComponent> | undefined;
let manager: ReturnType<typeof useComponent> | undefined;

export interface UseConsents {
  banner: ReturnType<typeof useComponent> | undefined;
  manager: ReturnType<typeof useComponent> | undefined;
  preferences: ReturnType<typeof useComponent> | undefined;
  store: ReturnType<typeof useStore>;
  consentController: ReturnType<typeof useConsentController>;
  initComponents: () => Promise<void>;
  listenEvents: (params: Handler) => void;
}

export const useConsents = async (settings: GlobalSettings): Promise<UseConsents> => {
  const store = useStore(settings);

  if (!store) return {} as UseConsents;

  const consentController = useConsentController(store);

  /**
   * Inits the components.
   * If the fs-consent-source attribute is found, it fetches them from the specified source.
   */
  const initComponents = async () => {
    // Check if the user is a bot or has DoNotTrack option active
    const isBot = /bot|crawler|spider|crawling/i.test(navigator.userAgent);
    const dntEnabled = hasEnabledDNT();

    if (dntEnabled) {
      alert(`DoNotTrack is enabled in your browser setting.`, 'warning');
    }

    if (isBot) return;

    document.head.insertAdjacentHTML('beforeend', FS_CONSENT_CSS);

    const { componentsSource, resetix } = store;

    if (componentsSource) await renderComponentsFromSource(componentsSource, resetix === 'true');

    await waitDOMReady();

    const bannerElement = queryElement('banner');

    if (bannerElement) {
      banner = useComponent(bannerElement, store, 'banner');
    } else {
      alert(`No [fs-consent-element="banner"] element was found, it is required to have it!`, 'error');
      return;
    }

    const preferencesElement = queryElement('preferences');
    if (preferencesElement) {
      preferences = useComponent(preferencesElement, store, 'preferences');
    } else {
      alert(
        `No [fs-consent-element="preferences"] element was found, did you want to use the Preferences component?`,
        'info'
      );
    }

    const managerElement = queryElement('fixed-preferences');
    if (managerElement) {
      manager = useComponent(managerElement, store, 'fixed-preferences');
    } else {
      alert(
        `No [fs-consent-element="fixed-preferences"] element was found, did you want to use the Manager component?`,
        'info'
      );
    }

    store.confirmed = store.userHasConfirmed();

    // If user has already confirmed, show the manager, otherwise show the banner
    if (store.confirmed) manager?.open();
    else banner?.open();

    const params = { store, consentController, banner, manager, preferences };
    listenEvents(params);
  };

  /**
   * Listens for internal events.
   */
  const listenEvents = (params: Handler) => {
    const { store, consentController, banner, manager } = params;
    const { allow, deny, submit } = ACTIONS;
    const componentsKeys = ['banner', 'manager', 'preferences'] as const;

    if (!consentController) return;

    // Listen for click and keydown events
    document.addEventListener('click', (e) => handleMouseAndKeyboard(e, params));
    document.addEventListener('keydown', (e) => handleMouseAndKeyboard(e, params));

    // Banner
    if (store) store.bannerText = store?.storeBannerText(banner?.element);

    // Consent Controller
    consentController.on('updateconsents', () => {
      componentsKeys.forEach((componentKey) => {
        if (componentKey === params[componentKey]?.selector) params[componentKey]?.form?.updateCheckboxes();
      });
    });

    // All Components
    componentsKeys.forEach((componentKey) => {
      // Allow
      params[componentKey]?.on('allow', () => {
        // Debug mode
        alert(`Allow button was clicked in the ${componentKey} component.`, 'info');

        consentController.updateConsents(CONSENT_ALL, allow);
      });

      // Deny
      params[componentKey]?.on('deny', () => {
        // Debug mode
        alert(`Deny button was clicked in the ${componentKey} component.`, 'info');

        consentController.updateConsents(CONSENT_REQUIRED, deny);
      });

      // Submit
      params[componentKey]?.on('formsubmit', (newConsents) => {
        // Debug mode
        alert(
          `Consents Form was submitted in the ${componentKey} component with the following consents: ${JSON.stringify(
            newConsents
          )}`,
          'info'
        );

        consentController.updateConsents(newConsents, submit);
      });

      // Close
      if (componentKey !== 'manager') {
        params[componentKey]?.on('close', () => {
          // Debug mode
          alert(`The ${componentKey} component was closed.`, 'info');

          if (store?.mode === 'informational') {
            // Debug mode
            alert(`All cookies were accepted because the mode is set to ${store.mode}.`, 'warning');

            consentController.updateConsents(CONSENT_ALL, allow);
          }

          manager?.open();
        });
      }
    });
  };

  /**
   * Handles mouse and keyboard events.
   * @param e The event object.
   */
  const handleMouseAndKeyboard = (e: MouseEvent | KeyboardEvent, params: Handler) => {
    const { target } = e;
    const { banner, manager, preferences } = params;

    if (!(target instanceof Element)) return;
    if ('key' in e && e.key !== 'Enter') return;

    const openPreference = getElementSelector('open-preferences');

    const closest = target.closest(openPreference);

    if (closest) {
      banner?.close();
      manager?.close();
      preferences?.open();

      // Debug mode
      alert(`Open Preferences button was clicked.`, 'info');
    }
  };

  await initComponents();

  return {
    banner,
    manager,
    preferences,
    store,
    consentController,
    initComponents,
    listenEvents,
  };
};

import { waitDOMReady } from '@finsweet/attributes-utils';

import Component from './components/Component';
import Debug from './components/Debug';
import ConsentController from './ConsentController';
import Store from './Store';
import {
  ACTIONS,
  CONSENT_ALL,
  CONSENT_REQUIRED,
  FS_CONSENT_CSS,
  getElementSelector,
  queryElement,
  renderComponentsFromSource,
} from './utils';

/**
 * The main component of the consent.
 * Controls all the sub components.
 */
export default class FsCookieConsent {
  private readonly consentController;
  private readonly store: Store;
  private banner!: Component;
  private preferences?: Component;
  private manager?: Component;

  constructor() {
    // Initialize store with attributes values
    this.store = new Store();

    // Consent controller
    this.consentController = new ConsentController(this.store);

    // Init
    this.initComponents();
  }

  /**
   * Inits the components.
   * If the fs-consent-source attribute is found, it fetches them from the specified source.
   */
  private async initComponents() {
    // Check if the user is a bot or has DoNotTrack option active
    const isBot = /bot|crawler|spider|crawling/i.test(navigator.userAgent);

    if (isBot) return;

    document.head.insertAdjacentHTML('beforeend', FS_CONSENT_CSS);

    const { store } = this;
    const { componentsSource } = store;

    if (componentsSource) await renderComponentsFromSource(componentsSource, store?.resetix === 'true');

    await waitDOMReady();

    const bannerElement = queryElement('banner');
    if (bannerElement) {
      this.banner = new Component(bannerElement, store);
    } else {
      Debug.alert(`No [fs-consent-element="banner"] element was found, it is required to have it!`, 'error');
      return;
    }
    const preferencesElement = queryElement('preferences');
    if (preferencesElement) {
      this.preferences = new Component(preferencesElement, store);
    } else {
      Debug.alert(
        `No [fs-consent-element="preferences"] element was found, did you want to use the Preferences component?`,
        'info'
      );
    }
    const managerElement = queryElement('fixed-preferences');
    if (managerElement) {
      this.manager = new Component(managerElement, store);
    } else {
      Debug.alert(
        `No [fs-consent-element="fixed-preferences"] element was found, did you want to use the Manager component?`,
        'info'
      );
    }

    const { manager, banner } = this;

    // If user has already confirmed, show the manager, otherwise show the banner
    if (store.userHasConfirmed()) manager?.open();
    else banner?.open();

    this.listenEvents();
  }

  /**
   * Listens for internal events.
   */
  private listenEvents() {
    const { allow, deny, submit } = ACTIONS;
    const componentsKeys = ['banner', 'manager', 'preferences'] as const;
    const { store, consentController, banner, manager } = this;

    // Listen for click and keydown events
    document.addEventListener('click', (e) => this.handleMouseAndKeyboard(e));
    document.addEventListener('keydown', (e) => this.handleMouseAndKeyboard(e));

    // Banner
    store.storeBannerText(banner?.element);

    // Consent Controller
    consentController.on('updateconsents', () => {
      componentsKeys.forEach((componentKey) => this[componentKey]?.form?.updateCheckboxes());
    });

    // All Components
    componentsKeys.forEach((componentKey) => {
      // Allow
      this[componentKey]?.on('allow', () => {
        // Debug mode
        Debug.alert(`Allow button was clicked in the ${componentKey} component.`, 'info');

        consentController.updateConsents(CONSENT_ALL, allow);
      });

      // Deny
      this[componentKey]?.on('deny', () => {
        // Debug mode
        Debug.alert(`Deny button was clicked in the ${componentKey} component.`, 'info');

        consentController.updateConsents(CONSENT_REQUIRED, deny);
      });

      // Submit
      this[componentKey]?.on('formsubmit', (newConsents) => {
        // Debug mode
        Debug.alert(
          `Consents Form was submitted in the ${componentKey} component with the following consents: ${JSON.stringify(
            newConsents
          )}`,
          'info'
        );

        consentController.updateConsents(newConsents, submit);
      });

      // Close
      if (componentKey !== 'manager') {
        this[componentKey]?.on('close', () => {
          // Debug mode
          Debug.alert(`The ${componentKey} component was closed.`, 'info');

          if (store.mode === 'informational') {
            // Debug mode
            Debug.alert(`All cookies were accepted because the mode is set to ${store.mode}.`, 'warning');

            consentController.updateConsents(CONSENT_ALL, allow);
          }

          manager?.open();
        });
      }
    });
  }

  /**
   * Handles mouse and keyboard events.
   * @param e The event object.
   */
  private handleMouseAndKeyboard(e: MouseEvent | KeyboardEvent): void {
    const { target } = e;
    const { banner, manager, preferences } = this;

    if (!(target instanceof Element)) return;
    if ('key' in e && e.key !== 'Enter') return;

    const openPreference = getElementSelector('open-preferences');

    const closest = target.closest(openPreference);

    if (closest) {
      banner?.close();
      manager?.close();
      preferences?.open();

      // Debug mode
      Debug.alert(`Open Preferences button was clicked.`, 'info');
    }
  }
}

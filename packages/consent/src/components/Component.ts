import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import Emittery from 'emittery';

import { createDisplayController } from '../components';
import type { useStore } from '../Store';
import {
  type Consents,
  findFirstScrollableElement,
  getAttribute,
  getElementSelector,
  queryAllElements,
  queryElement,
} from '../utils';
import { useConsentForm } from './ConsentsForm';

// Types
interface ComponentEvents {
  ready: HTMLElement;
  open: undefined;
  close: undefined;
  allow: undefined;
  deny: undefined;
  openpreferences: undefined;
  formsubmit: Partial<Consents>;
}

export const useComponent = (element: HTMLElement, store: ReturnType<typeof useStore>, selector: string) => {
  let formSetting: ReturnType<typeof useConsentForm> | undefined;
  let scrollableElementSetting: Element | undefined;
  let disableScrollOnOpenSetting = false;
  let displayController: ReturnType<typeof createDisplayController> | undefined;

  const emitter = new Emittery<ComponentEvents>();
  /**
   * Inits the component.
   */
  const init = () => {
    // Get DOM Elements
    initElements();

    // Handle Accessibility
    handleAccessibility();

    // Listen events
    listenEvents();
  };

  /**
   * Gets DOM elements and their properties.
   * @returns `true` if elements are correctly setup.
   */
  const initElements = (): boolean => {
    // Preferences form
    const form = queryElement<HTMLFormElement>('form', { scope: element });

    if (form) formSetting = useConsentForm(form, store);

    disableScrollOnOpenSetting = getAttribute(element, 'scroll', true) === 'disable';

    if (disableScrollOnOpenSetting) {
      scrollableElementSetting = findFirstScrollableElement(element);
    }

    // Create the display controller
    const interactionTrigger = queryElement<HTMLElement>('interaction', { scope: element });

    displayController = createDisplayController({
      element,
      interaction: interactionTrigger ? { element: interactionTrigger } : undefined,
      displayProperty: getAttribute(element, 'display', true),
      startsHidden: true,
      animation: getAttribute(element, 'animation', true),
    });

    return true;
  };

  /**
   * Makes sure all buttons are accessible.
   */
  const handleAccessibility = () => {
    if (!element) return;

    const buttons = [
      queryAllElements('allow', { scope: element }),
      queryAllElements('deny', { scope: element }),
      queryAllElements('submit', { scope: element }),
      queryAllElements('close', { scope: element }),
    ].flat();

    buttons.forEach((button) => {
      if (!button) return;

      button.setAttribute('role', 'button');
      button.setAttribute('tabindex', '0');
    });
  };

  /**
   * Listen for mouse and keyboard events
   */
  const listenEvents = (): void => {
    if (!element) return;

    element.addEventListener('click', (e) => handleMouseAndKeyboard(e));
    element.addEventListener('keydown', (e) => handleMouseAndKeyboard(e));
    formSetting?.on('submit', (newConsents: Partial<Consents>) => handleFormSubmit(newConsents));
  };

  /**
   * Handles mouse and keyboard events.
   * @param e The event object.
   */
  const handleMouseAndKeyboard = (e: MouseEvent | KeyboardEvent): void => {
    const { target } = e;

    const [allowSelector, denySelector, closeSelector, submitSelector] = [
      getElementSelector('allow'),
      getElementSelector('deny'),
      getElementSelector('close'),
      getElementSelector('submit'),
    ];

    if (!(target instanceof Element)) return;
    if ('key' in e && e.key !== 'Enter') return;

    if (target.closest(allowSelector)) {
      emitter.emit('allow');
      close();
    } else if (target.closest(denySelector)) {
      emitter.emit('deny');
      close();
    } else if (target.closest(closeSelector)) close();
    else if (target.closest(submitSelector)) formSetting?.submit(formSetting.form);
  };

  /**
   * Handle form submit
   * @param newConsents
   */
  const handleFormSubmit = (newConsents: Partial<Consents>) => {
    emitter.emit('formsubmit', newConsents);
    close();
  };

  /**
   * Shows/hides the component.
   * @param display Action to be performed. `true` to show, `false` to hide.
   */
  const show = async (display = true) => {
    if (!displayController) return;

    const { isElementVisible } = displayController;

    if (!element || !displayController || isElementVisible() === display) return;

    displayController[display ? 'show' : 'hide']();

    if (disableScrollOnOpenSetting) {
      if (display) disableBodyScroll(scrollableElementSetting || element, { reserveScrollBarGap: true });
      else clearAllBodyScrollLocks();
    }

    emitter.emit(display ? 'open' : 'close');
  };

  /**
   * Opens the component.
   */
  const open = (): void => {
    show();
  };

  /**
   * Closes the component.
   */
  const close = (): void => {
    show(false);
  };

  init();

  return {
    init,
    open,
    close,
    on: emitter.on.bind(emitter),
    element,
    form: formSetting,
    displayController,
    store,
    handleAccessibility,
    handleFormSubmit,
    handleMouseAndKeyboard,
    initElements,
    listenEvents,
    show,
    selector: `[fs-consent-element="${selector}"]`,
    type: selector,
  };
};

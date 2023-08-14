import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import Emittery from 'emittery';

import { DisplayController } from '../components';
import Store from '../Store';
import {
  type Consents,
  findFirstScrollableElement,
  getAttribute,
  getElementSelector,
  queryAllElements,
  queryElement,
} from '../utils';
import ConsentsForm from './ConsentsForm';

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

export default class Component extends Emittery<ComponentEvents> {
  public form?: ConsentsForm;
  private displayController?: DisplayController;
  private scrollableElement?: Element;
  private disableScrollOnOpen = false;

  constructor(public readonly element: HTMLElement, protected store: Store) {
    super();

    this.init();
  }

  /**
   * Inits the component.
   */
  protected init(): void {
    // Get DOM Elements
    this.initElements();

    // Handle Accessibility
    this.handleAccessibility();

    // Listen events
    this.listenEvents();
  }

  /**
   * Gets DOM elements and their properties.
   * @returns `true` if elements are correctly setup.
   */
  private initElements(): boolean {
    // Main element
    const { element, store } = this;

    // Preferences form
    const form = queryElement<HTMLFormElement>('form', { scope: element });

    if (form) this.form = new ConsentsForm(form, store);

    this.disableScrollOnOpen = getAttribute(element, 'scroll', true) === 'disable';
    if (this.disableScrollOnOpen) this.scrollableElement = findFirstScrollableElement(element);

    // Create the display controller
    const interactionTrigger = queryElement<HTMLElement>('interaction', { scope: element });

    this.displayController = new DisplayController({
      element,
      interaction: interactionTrigger ? { element: interactionTrigger } : undefined,
      displayProperty: getAttribute(element, 'display', true),
      startsHidden: true,
      animation: getAttribute(element, 'animation', true),
    });

    return true;
  }

  /**
   * Makes sure all buttons are accessible.
   */
  private handleAccessibility() {
    const { element } = this;

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
  }

  /**
   * Listen for mouse and keyboard events
   */
  private listenEvents(): void {
    const { element, form } = this;

    if (!element) return;

    element.addEventListener('click', (e) => this.handleMouseAndKeyboard(e));
    element.addEventListener('keydown', (e) => this.handleMouseAndKeyboard(e));
    form?.on('submit', (newConsents) => this.handleFormSubmit(newConsents));
  }

  /**
   * Handles mouse and keyboard events.
   * @param e The event object.
   */
  private handleMouseAndKeyboard(e: MouseEvent | KeyboardEvent): void {
    const { target } = e;

    const [allow, deny, close, submit] = [
      getElementSelector('allow'),
      getElementSelector('deny'),
      getElementSelector('close'),
      getElementSelector('submit'),
    ];

    if (!(target instanceof Element)) return;
    if ('key' in e && e.key !== 'Enter') return;

    if (target.closest(allow)) {
      this.emit('allow');
      this.close();
    } else if (target.closest(deny)) {
      this.emit('deny');
      this.close();
    } else if (target.closest(close)) this.close();
    else if (target.closest(submit)) this.form?.submit();
  }

  /**
   * Handle form submit
   * @param newConsents
   */
  private handleFormSubmit(newConsents: Partial<Consents>) {
    this.emit('formsubmit', newConsents);
    this.close();
  }

  /**
   * Shows/hides the component.
   * @param display Action to be performed. `true` to show, `false` to hide.
   */
  private show(display = true) {
    const { element, displayController, disableScrollOnOpen, scrollableElement } = this;

    if (!element || !displayController || displayController.isVisible() === display) return;

    displayController[display ? 'show' : 'hide']();

    if (disableScrollOnOpen) {
      if (display) disableBodyScroll(scrollableElement || element, { reserveScrollBarGap: true });
      else clearAllBodyScrollLocks();
    }

    this.emit(display ? 'open' : 'close');
  }

  /**
   * Opens the component.
   */
  public open(): void {
    this.show();
  }

  /**
   * Closes the component.
   */
  public close(): void {
    this.show(false);
  }
}

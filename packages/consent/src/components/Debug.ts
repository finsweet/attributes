import { animations } from '@finsweet/attributes-utils';

import { getElementSelector, MAIN_KEY } from '../utils';

// Constants
const colors = {
  info: 'green',
  warning: 'yellow',
  error: 'red',
} as const;

export default class Debug {
  private static active = false;
  private static element: HTMLDivElement;

  /**
   * Activates the Debug mode.
   */
  public static activate(): void {
    this.init();
    this.active = true;
  }

  /**
   * Inits the Debug mode.
   */
  private static init() {
    this.element = document.createElement('div');
    Object.assign(this.element.style, {
      position: 'fixed',
      left: 'auto',
      top: 'auto',
      right: '16px',
      bottom: '0px',
      'z-index': '999999',
      'max-width': '320px',
      'font-size': '14px',
      'line-height': '1.25',
    });
    document.body.appendChild(this.element);
  }

  /**
   * Adds a new card that displays the message.
   * @param message The message to be displayed.
   * @param type The type of message. It will affect the color of the card.
   */
  public static alert(message: string, type: keyof typeof colors): void {
    if (!this.active) return;

    // Create the new card
    const card = document.createElement('div');
    Object.assign(card.style, {
      position: 'relative',
      padding: '16px',
      opacity: '0',
      'margin-bottom': '16px',
      'border-left': `4px solid ${colors[type]}`,
      'background-color': '#fff',
      'box-shadow': '1px 1px 3px 0 rgba(0, 0, 0, 0.1)',
      'word-break': 'break-all',
    });

    // Add the message as plain text
    const messageText = document.createElement('div');
    messageText.innerText = message;
    card.appendChild(messageText);

    // Add the close button
    card.insertAdjacentHTML(
      'beforeend',
      `<div ${MAIN_KEY}-element="close" style="position: absolute; left: auto; top: 4px; right: 8px; bottom: auto; cursor: pointer">✖</div>`
    );

    // Handle the card
    this.handleCard(card);
  }

  /**
   * Listens for events in the card.
   * @param card The card element.
   */
  private static async handleCard(card: HTMLDivElement) {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest(getElementSelector('close'))) {
        card.removeEventListener('click', handleClick);
        card.remove();
      }
    };

    card.addEventListener('click', handleClick);
    this.element.insertAdjacentElement('afterbegin', card);

    animations['fade'].prepareIn(card, { display: 'block' });
    await animations['fade'].animateIn(card, { display: 'block' });
  }
}

import { animations } from '@finsweet/attributes-utils';

import { getElementSelector, MAIN_KEY } from '../utils';

// Constants
const colors = {
  info: 'green',
  warning: 'yellow',
  error: 'red',
} as const;

let active = false;
let element: HTMLDivElement;

/**
 * Activates the Debug mode.
 */
export const activateDebug = (): void => {
  initDebug();
  active = true;
};

/**
 * Initializes the Debug mode.
 */
const initDebug = () => {
  element = document.createElement('div');
  Object.assign(element.style, {
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
  document.body.appendChild(element);
};

/**
 * Adds a new card that displays the message.
 * @param message The message to be displayed.
 * @param type The type of message. It will affect the color of the card.
 */
export const alert = (message: string, type: keyof typeof colors): void => {
  if (!active) return;

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
  handleCardDebug(card);
};

/**
 * Listens for events in the card.
 * @param card The card element.
 */
const handleCardDebug = async (card: HTMLDivElement) => {
  const handleClick = (e: MouseEvent) => {
    if (e.target instanceof Element && e.target.closest(getElementSelector('close'))) {
      card.removeEventListener('click', handleClick);
      card.remove();
    }
  };

  card.addEventListener('click', handleClick);
  element.insertAdjacentElement('afterbegin', card);

  animations['fade'].prepareIn(card, { display: 'block' });
  await animations['fade'].animateIn(card, { display: 'block' });
};

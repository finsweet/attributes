import { normalizeNumber } from '@finsweet/attributes-utils';

import { handleVisibility } from './handleVisibility';

/**
 * Handles complex key press events to toggle elements' visibility.
 * @param {string} keyCombinationStr - A string of keycodes or key values separated by '+' to listen for.
 * @param {string} toggle - CSS selector for elements to toggle.
 * @param {string} delay - Delay in milliseconds before toggling the elements.
 * @returns A function to remove the event listeners.
 */
export const handleKeyPress = (
  keyCombinationStr: string,
  instances: NodeListOf<HTMLElement>,
  toggle?: string,
  delay?: string
): (() => void) => {
  if (!toggle) {
    return () => {
      return;
    };
  }

  const keyCodes = keyCombinationStr.split('+').map((key) => key.trim());
  const keysPressed: Record<string, boolean> = {};

  keyCodes.forEach((key) => {
    keysPressed[key] = false;
  });

  const checkKeysPressed = (event: KeyboardEvent): boolean =>
    keyCodes.every((key) => key === event.key || key === (event.keyCode || event.which).toString() || keysPressed[key]);

  const keyDownHandler = (event: KeyboardEvent) => {
    if (keyCodes.includes(event.key) || keyCodes.includes(event.keyCode.toString())) {
      keysPressed[event.key] = true;
      keysPressed[(event.keyCode || event.code).toString()] = true;

      if (checkKeysPressed(event)) {
        const toggleDisplay = () => {
          Array.from(instances).forEach((element) => {
            handleVisibility(element, toggle);
          });
        };

        if (!delay) {
          toggleDisplay();

          return;
        }

        const delayValue = normalizeNumber(delay);

        if (!delayValue) {
          toggleDisplay();

          return;
        }

        window.setTimeout(toggleDisplay, delayValue);
      }
    }
  };

  const keyUpHandler = (event: KeyboardEvent) => {
    keysPressed[event.key] = false;
    keysPressed[(event.keyCode || event.which).toString()] = false;
  };

  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('keyup', keyUpHandler);

  return () => {
    document.removeEventListener('keydown', keyDownHandler);
    document.removeEventListener('keyup', keyUpHandler);
  };
};

import { addListener, isNotEmpty, setFormFieldValue } from '@finsweet/ts-utils';

import { setButtonA11Y } from './a11y';

/**
 * Handles the increment/buttons accessibility and functionality.
 * @param inputElement
 * @param incrementButton
 * @param decrementButton
 * @returns A clanup callback.
 */
export const handleButtons = (
  inputElement: HTMLInputElement,
  incrementButton?: Element | null,
  decrementButton?: Element | null
) => {
  // Set up aria
  for (const button of [incrementButton, decrementButton].filter(isNotEmpty)) {
    const action = button === incrementButton ? 'Increment' : 'Decrement';
    const label = `${action} the input value`;

    setButtonA11Y(inputElement, button, label);
  }

  // Set up listeners
  const cleanupIncrement = addListener(incrementButton, 'click', (e) => {
    e.preventDefault();
    inputElement.stepUp();
  });
  const cleanupDecrement = addListener(decrementButton, 'click', (e) => {
    e.preventDefault();
    inputElement.stepDown();
  });

  return () => {
    cleanupIncrement();
    cleanupDecrement();
  };
};

/**
 * Handles a reset button's accessibility and functionality.
 * @param inputElement
 * @param resetButton
 * @param initialValue
 * @returns A cleanup callback.
 */
export const handleResetButton = (
  inputElement: HTMLInputElement,
  resetButton: Element,
  initialValue: number | null
) => {
  // Set up aria
  const label = `Reset the input value`;

  setButtonA11Y(inputElement, resetButton, label);

  // Set up listeners
  const cleanupReset = addListener(resetButton, 'click', (e) => {
    e.preventDefault();
    setFormFieldValue(inputElement, initialValue?.toString() || '');
  });

  return cleanupReset;
};

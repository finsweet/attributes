import { isNumber, parseNumericAttribute, setFormFieldValue } from '@finsweet/attributes-utils';

import { handleButtons, handleResetButton } from './actions/buttons';
import { handleInput } from './actions/input';
import { addHideArrowsStylesheet } from './actions/style';
import { getAttribute, getInstance, queryElement } from './utils/selectors';

/**
 * Inits an input counter component.
 * @param inputElement
 * @returns A cleanup callback.
 */
export const initInputCounter = (inputElement: HTMLInputElement) => {
  const instance = getInstance(inputElement);

  const showArrows = getAttribute(inputElement, 'showarrows');

  const rawInitialValue = getAttribute(inputElement, 'initial');
  const initialValue = parseNumericAttribute(rawInitialValue);

  const incrementButton = queryElement('increment', { instance });
  const decrementButton = queryElement('decrement', { instance });

  const resetButton = queryElement('clear', { instance });

  if (!incrementButton && !decrementButton) return;

  // Hide number input arrows (spinners)
  if (!showArrows) addHideArrowsStylesheet();

  // Handle input
  const cleanupInput = handleInput(inputElement);

  // Handle buttons
  const cleanupButtons = handleButtons(inputElement, incrementButton, decrementButton);
  const cleanupResetButton = resetButton ? handleResetButton(inputElement, resetButton, initialValue) : undefined;

  // Enforce number type
  inputElement.type = 'number';

  // Set initial value
  if (isNumber(initialValue)) {
    setFormFieldValue(inputElement, initialValue.toString());
  }

  // Return cleanup
  return () => {
    cleanupInput?.();
    cleanupButtons();
    cleanupResetButton?.();
  };
};

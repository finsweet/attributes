import { addListener, adjustValueToStep, isNumber, parseNumericAttribute } from '@finsweet/attributes-utils';

/**
 * Enforces the input's step, min and max, if defined.
 * @param inputElement
 * @returns A cleanup callback.
 */
export const handleInput = (inputElement: HTMLInputElement) => {
  const { step: rawStep, min: rawMin, max: rawMax } = inputElement;
  if (!rawStep && !rawMin && !rawMax) return;

  const step = parseNumericAttribute(rawStep);
  const min = parseNumericAttribute(rawMin);
  const max = parseNumericAttribute(rawMax);

  const cleanupInput = addListener(inputElement, 'change', () => {
    const value = Number(inputElement.value);
    if (isNaN(value)) return;

    const adjustedValue = step ? adjustValueToStep(value, step) : value;

    inputElement.value =
      isNumber(min) && adjustedValue < min
        ? min.toString()
        : isNumber(max) && adjustedValue > max
          ? max.toString()
          : adjustedValue.toString();
  });

  return cleanupInput;
};

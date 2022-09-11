import { isNotEmpty } from '@finsweet/ts-utils';

import type { HandleInstances } from '../utils/types';

/**
 * Calculates the amount of decimals that a float number has.
 * @param value A number.
 */
export const getDecimalPrecision = (value: number) => {
  if (!isFinite(value)) return 0;

  let exponential = 1;
  let precision = 0;

  while (Math.round(value * exponential) / exponential !== value) {
    exponential *= 10;
    precision += 1;
  }
  return precision;
};

/**
 * Ensures a decimal precision on a number.
 * @param value The number to handle.
 * @param precision The amount of decimals.
 */
const setDecimalPrecision = (value: number, precision: number) => {
  const pow = Math.pow(10, precision);

  return Math.round(value * pow) / pow;
};

/**
 * Adjusts a numeric value to a step factor.
 * @param value The numeric value to adjust.
 * @param step The increment step.
 * @returns The adjusted value.
 */
export const adjustValueToStep = (value: number, step: number, precision: number, minRange: number) => {
  const offset = minRange > 1 ? minRange % step : 0;

  const remainder = value % step;
  const floor = offset + value - remainder;

  if (remainder > step / 2) return setDecimalPrecision(floor + step, precision);

  return setDecimalPrecision(floor, precision);
};

/**
 * Returns the closest handle to an adjusted value.
 * @param adjustedValue The adjusted value through {@link adjustValueToStep}.
 * @param handles The {@link HandleInstances}.
 * @returns The closest valid `Handle`, if existing.
 */
export const getClosestValidHandle = (adjustedValue: number, [handle1, handle2]: HandleInstances) => {
  const handle1Value = handle1.getValue();
  const handle2Value = handle2?.getValue();

  const closestValue = getClosestValue(adjustedValue, [handle1Value, handle2Value]);

  if (typeof closestValue !== 'number') return;

  const [handle1MinValue, handle1MaxValue] = handle1.getConstraints();

  if (closestValue === handle1Value && adjustedValue >= handle1MinValue && adjustedValue <= handle1MaxValue) {
    return handle1;
  }

  if (!handle2 || closestValue !== handle2Value) return;

  const [handle2MinValue, handle2MaxValue] = handle2.getConstraints();

  if (adjustedValue >= handle2MinValue && adjustedValue <= handle2MaxValue) return handle2;
};

/**
 * @returns The closest value from an array based on a reference value.
 * @param reference The reference value.
 * @param values The array of values to compare.
 */
const getClosestValue = (reference: number, values: (number | undefined)[]) => {
  const filteredValues = values.filter(isNotEmpty);

  if (!filteredValues.length) return;

  const closestValue = filteredValues.reduce((previous, current) =>
    Math.abs(current - reference) < Math.abs(previous - reference) ? current : previous
  );

  return closestValue;
};

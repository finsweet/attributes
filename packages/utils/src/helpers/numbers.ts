/**
 * Converts a string to a number, removing any invalid symbols like `$` or `,`.
 * @param value A string number.
 * @returns The valid number value.
 */
export const normalizeNumber = (value: string) => {
  if (!value) return;

  return parseFloat(value.replace(/[^0-9.-]+/g, ''));
};

/**
 * Parses a numeric Attribute string.
 * @param rawValue The raw string. Example: "20", "-25.3"...
 * @param fallback A value to fall back to when the parsed value is not valid.
 */
export function parseNumericAttribute(rawValue: string | number | null | undefined, fallback: number): number;
export function parseNumericAttribute(
  rawValue: string | number | null | undefined,
  fallback?: number | null
): number | null;
export function parseNumericAttribute(
  rawValue: string | number | null | undefined,
  fallback?: number | null
): number | null {
  if (!rawValue) return fallback ?? null;

  const value = Number(rawValue);

  if (!isNaN(value)) return value;
  if (fallback) return fallback;
  return null;
}

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
 * @param precision The step's decimal precision. If not provided, it will be calculated.
 * @param minRange A minimum range value, used for offsetting.
 * @returns The adjusted value.
 */
export const adjustValueToStep = (value: number, step: number, precision?: number, minRange = 0) => {
  precision ??= getDecimalPrecision(step);

  const offset = minRange > 1 ? minRange % step : 0;

  const remainder = value % step;
  const floor = offset + value - remainder;

  if (remainder > step / 2) return setDecimalPrecision(floor + step, precision);

  return setDecimalPrecision(floor, precision);
};

/**
 * Format number to international locale string or fallback to default browser locale.
 * @param {number} number - Number to format.
 * @param {string} [locale] - Locale to format number to.
 * @param {number} [decimals] - Number of decimal places.
 * @param {boolean} [isTimeInMinutes] - Whether the number represents time in minutes.
 * @returns {string} Formatted number as a string.
 */
export const formatNumberToLocale = (
  number: number,
  locale: string,
  decimals?: number,
  isTimeInMinutes?: boolean
): string => {
  let language: string = locale;

  if (locale === 'auto') {
    language = navigator.language;
  }

  const options: Intl.NumberFormatOptions = {};
  if (decimals !== undefined) {
    options.minimumFractionDigits = decimals;
    options.maximumFractionDigits = decimals;
  }

  const formatter = new Intl.NumberFormat(language, options);

  if (isTimeInMinutes) {
    // format the number as a time duration in minutes

    return number.toLocaleString(language, {
      ...options,
      style: 'unit',
      unit: 'minute', // TODO: support other units
      unitDisplay: 'long',
    });
  }

  return formatter.format(number);
};

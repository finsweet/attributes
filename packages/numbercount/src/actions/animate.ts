import { valueToString } from '../utils/helpers';

/**
 * Animates a number element.
 * @param {Element} numberElement - The element where the number will be displayed.
 * @param {number} start - The starting number.
 * @param {number} end - The ending number.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @param {string | true | null} locale - The locale for formatting the number.
 */
export const animateNumberCount = (
  numberElement: Element,
  start: number,
  end: number,
  duration: number,
  locale?: string | true | null
): void => {
  let startTime: number | null = null;
  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;

    const progress = Math.min(elapsed / duration, 1);
    const value = start + (end - start) * progress;

    numberElement.textContent = valueToString(Math.floor(value), locale);

    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }

    numberElement.textContent = valueToString(end, locale);
  };

  requestAnimationFrame(step);
};

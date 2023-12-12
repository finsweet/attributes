import { valueToString } from '../utils/helpers';

/**
 * Animates a number element.
 * @param numberElement
 * @param start
 * @param end
 * @param duration
 * @param locale
 */
export const animateNumberCount = (
  numberElement: Element,
  start: number,
  end: number,
  duration: number,
  locale?: string | true | null
) => {
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;

    // Calculate the elapsed time since the animation started.
    const elapsed = timestamp - startTime;

    const progress = Math.min(elapsed / duration, 1);
    const value = start + (end - start) * progress;

    numberElement.textContent = valueToString(Math.floor(value), locale);

    // If the animation is not yet complete, request the next frame.
    if (progress < 1) {
      requestAnimationFrame(step);

      return;
    }

    // If the progress is 1 (animation complete), set the final value.
    numberElement.textContent = valueToString(end, locale);
  };

  requestAnimationFrame(step);
};

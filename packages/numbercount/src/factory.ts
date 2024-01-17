import { isNumber, parseNumericAttribute } from '@finsweet/attributes-utils';

import { setNumberCountA11Y } from './actions/a11y';
import { animateNumberCount } from './actions/animate';
import { observeIntersection } from './actions/observe';
import { DEFAULT_DURATION, DEFAULT_START_NUMBER, DEFAULT_THRESHOLD } from './utils/constants';
import { extractNumberFromElement } from './utils/helpers';
import { getAttribute, hasAttributeValue } from './utils/selectors';

/**
 * Inits a number count animation.
 * @param numberElement
 */
export const initNumberCount = (numberElement: HTMLElement) => {
  const rawStart = getAttribute(numberElement, 'start');
  const rawEnd = getAttribute(numberElement, 'end');
  const rawDuration = getAttribute(numberElement, 'duration');
  const rawThreshold = getAttribute(numberElement, 'threshold');
  const rawLocale = getAttribute(numberElement, 'locale');
  const autoLocale = hasAttributeValue(numberElement, 'locale', 'auto');

  const end = parseNumericAttribute(rawEnd, extractNumberFromElement(numberElement));
  if (!isNumber(end)) return;

  const start = parseNumericAttribute(rawStart, DEFAULT_START_NUMBER);
  const duration = parseNumericAttribute(rawDuration, DEFAULT_DURATION);
  const threshold = parseNumericAttribute(rawThreshold, DEFAULT_THRESHOLD);

  const locale = autoLocale || rawLocale;

  setNumberCountA11Y(numberElement, start, end);

  return observeIntersection(numberElement, threshold, () => {
    animateNumberCount(numberElement, start, end, duration, locale);
  });
};

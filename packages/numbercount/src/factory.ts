import { isNumber } from '@finsweet/ts-utils';

import { parseNumericAttribute } from '$global/helpers';

import { setNumberCountA11Y } from './actions/a11y';
import { animateNumberCount } from './actions/animate';
import { observeIntersection } from './actions/observe';
import { DEFAULT_DURATION, DEFAULT_START_NUMBER, DEFAULT_THRESHOLD, getAttribute } from './utils/constants';
import { extractNumberFromElement } from './utils/helpers';

/**
 * Inits a number count animation.
 * @param numberElement
 */
export const initNumberCount = (numberElement: Element) => {
  const rawStart = getAttribute(numberElement, 'start');
  const rawEnd = getAttribute(numberElement, 'end');
  const rawDuration = getAttribute(numberElement, 'duration');
  const rawThreshold = getAttribute(numberElement, 'threshold');

  const end = parseNumericAttribute(rawEnd, extractNumberFromElement(numberElement));
  if (!isNumber(end)) return;

  const start = parseNumericAttribute(rawStart, DEFAULT_START_NUMBER);
  const duration = parseNumericAttribute(rawDuration, DEFAULT_DURATION);
  const threshold = parseNumericAttribute(rawThreshold, DEFAULT_THRESHOLD);

  setNumberCountA11Y(numberElement, start, end);

  return observeIntersection(numberElement, threshold, () => {
    animateNumberCount(numberElement, start, end, duration);
  });
};

import { formatNumberToLocale, parseNumericAttribute } from '@finsweet/attributes-utils';

import { DEFAULT_DECIMALS, DEFAULT_LOCALE, DEFAULT_WPM } from './utils/constants';
import { getAttribute, getInstanceIndex, queryElement } from './utils/selectors';

/**
 * Inits the read time for an instance.
 * @param timeElement
 */
export const initReadTime = (timeElement: Element) => {
  const instanceIndex = getInstanceIndex(timeElement);

  const contentsElement = queryElement('contents', { instanceIndex });
  if (!contentsElement) return;

  const wpm = parseNumericAttribute(getAttribute(timeElement, 'wpm'), DEFAULT_WPM);
  const decimals = parseNumericAttribute(getAttribute(timeElement, 'decimals'), DEFAULT_DECIMALS);
  const locale = getAttribute(timeElement, 'locale') || DEFAULT_LOCALE;

  const wordsCount = contentsElement.innerText.match(/[\w\d\’\'-]+/gi)?.length ?? 0;

  const readTime = wordsCount / wpm;

  // default to 1 if read time is less than 0.5
  const approximatedValue = readTime < 0.5 ? 1 : readTime;

  timeElement.textContent = formatNumberToLocale(approximatedValue, locale, decimals, true);
};

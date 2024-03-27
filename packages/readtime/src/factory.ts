import { parseNumericAttribute } from '@finsweet/attributes-utils';

import { DEFAULT_DECIMALS, DEFAULT_WPM } from './utils/constants';
import { getAttribute, getInstance, queryElement } from './utils/selectors';

/**
 * Inits the read time for an instance.
 * @param timeElement
 */
export const initReadTime = (timeElement: Element) => {
  const instance = getInstance(timeElement);

  const contentsElement = queryElement('contents', { instance });
  if (!contentsElement) return;

  const wpm = parseNumericAttribute(getAttribute(timeElement, 'wpm'), DEFAULT_WPM);
  const decimals = parseNumericAttribute(getAttribute(timeElement, 'decimals'), DEFAULT_DECIMALS);

  const wordsCount = contentsElement.innerText.match(/[\w\d\’\'-]+/gi)?.length ?? 0;

  const readTime = wordsCount / wpm;

  timeElement.textContent = !decimals && readTime < 0.5 ? '1' : readTime.toFixed(decimals);
};

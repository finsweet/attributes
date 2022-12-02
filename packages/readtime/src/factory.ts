import { getInstanceIndex } from '$global/helpers';

import { ATTRIBUTES, DEFAULT_DECIMALS, DEFAULT_WPM, queryElement } from './utils/constants';

/**
 * Inits the read time for an instance.
 * @param timeElement
 */
export const initReadTime = (timeElement: Element) => {
  const instanceIndex = getInstanceIndex(timeElement, ATTRIBUTES.wpm.key);
  const contentsElement = queryElement<HTMLElement>('contents', { instanceIndex, operator: 'prefixed' });
  if (!contentsElement) return;

  const wpm = Number(timeElement.getAttribute(ATTRIBUTES.wpm.key)) || DEFAULT_WPM;
  const decimals = Number(timeElement.getAttribute(ATTRIBUTES.decimals.key)) || DEFAULT_DECIMALS;

  const wordsCount = contentsElement.innerText.match(/[\w\d\’\'-]+/gi)?.length ?? 0;

  const readTime = wordsCount / wpm;

  timeElement.textContent = readTime.toFixed(decimals);
};

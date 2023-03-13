import { formatNumber, getInstanceIndex } from '$global/helpers';

import { ATTRIBUTES, DEFAULT_WPM, queryElement } from './utils/constants';

/**
 * Inits the read time for an instance.
 * @param timeElement
 */
export const initReadTime = (timeElement: Element) => {
  const instanceIndex = getInstanceIndex(timeElement, ATTRIBUTES.element.key);

  const contentsElement = queryElement<HTMLElement>('contents', { instanceIndex, operator: 'prefixed' });

  if (!contentsElement) return;

  const wpm = Number(timeElement.getAttribute(ATTRIBUTES.wpm.key)) || DEFAULT_WPM;
  const decimals = Number(timeElement.getAttribute(ATTRIBUTES.decimals.key));

  const wordsCount = contentsElement.innerText.match(/[\w\d\’\'-]+/gi)?.length ?? 0;

  const readTime = wordsCount / wpm;

  timeElement.textContent = readTime < 0.5 ? '1' : formatNumber(readTime).toFixed(decimals);
};

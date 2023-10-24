import {
  type FinsweetAttributeInit,
  restartWebflow,
  RICH_TEXT_BLOCK_CSS_CLASS,
  type RichTextBlockElement,
  waitWebflowReady,
} from '@finsweet/attributes-utils';

import { getValidTextElements } from './actions/collect';
import { parseTextElement } from './actions/parse';
import { getElementSelector, hasAttributeValue } from './utils/selectors';

/**
 * Inits the attribute.
 */
export const init: FinsweetAttributeInit = async () => {
  await waitWebflowReady();

  const rtbElements = [
    ...document.querySelectorAll<RichTextBlockElement>(
      `.${RICH_TEXT_BLOCK_CSS_CLASS}${getElementSelector('rich-text')}`
    ),
  ];

  await Promise.all(rtbElements.map(initRtbElement));

  return {
    result: rtbElements,
  };
};

/**
 * Inits a Rich Text Block element, replacing HTML strings for their parsed version, and component templates for the component nodes.
 * @param element
 */
const initRtbElement = async (element: RichTextBlockElement) => {
  const sanitize = hasAttributeValue(element, 'sanitize', 'true');
  const resetIx = hasAttributeValue(element, 'resetix', 'true');
  const textElements = getValidTextElements(element);

  await Promise.all(textElements.map((textElement) => parseTextElement(textElement, sanitize)));

  if (resetIx) await restartWebflow(['ix2']);
};

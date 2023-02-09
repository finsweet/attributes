import type { RichTextBlockElement } from '@finsweet/ts-utils';
import { restartWebflow, RICH_TEXT_BLOCK_CSS_CLASS } from '@finsweet/ts-utils';

import { CMS_ATTRIBUTE_ATTRIBUTE, RICH_TEXT_ATTRIBUTE } from '$global/constants/attributes';
import { awaitAttributesLoad, finalizeAttribute } from '$global/factory';

import { getValidTextElements } from './actions/collect';
import { parseTextElement } from './actions/parse';
import { ATTRIBUTES, getSelector } from './utils/constants';

// Constants
const {
  sanitize: { key: sanitizeKey, values: sanitizeValues },
  resetIx: { key: resetIxKey, values: resetIxValues },
} = ATTRIBUTES;

/**
 * Inits the attribute.
 */
export const init = async (): Promise<HTMLDivElement[]> => {
  await awaitAttributesLoad(CMS_ATTRIBUTE_ATTRIBUTE);

  const rtbElements = [
    ...document.querySelectorAll<RichTextBlockElement>(
      `.${RICH_TEXT_BLOCK_CSS_CLASS}${getSelector('element', 'richText', { operator: 'prefixed' })}`
    ),
  ];

  await Promise.all(rtbElements.map(initRtbElement));

  return finalizeAttribute(RICH_TEXT_ATTRIBUTE, rtbElements);
};

/**
 * Inits a Rich Text Block element, replacing HTML strings for their parsed version, and component templates for the component nodes.
 * @param element
 */
const initRtbElement = async (element: RichTextBlockElement) => {
  const sanitize = element.getAttribute(sanitizeKey) === sanitizeValues.true;
  const resetIx = element.getAttribute(resetIxKey) === resetIxValues.true;
  const textElements = getValidTextElements(element);

  await Promise.all(textElements.map((textElement) => parseTextElement(textElement, sanitize)));

  if (resetIx) await restartWebflow(['ix2']);
};

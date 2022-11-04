import { unescapeHTML } from '$global/helpers';

import { HAS_COMPONENT_TEMPLATE_REGEX, IS_HTML_OPENING_TAG_REGEX } from '../utils/regex';
import type { TextElement } from '../utils/types';
import { getComponentHTML } from './components';
import { sanitizeHTML } from './sanitize';

/**
 * Parses the content of a text element and converts it to valid HTML.
 * @param textElement The {@link TextElement}.
 * @param sanitize Defines if the text content should be sanitized before parsing the HTML.
 */
export const parseTextElement = async (textElement: TextElement, sanitize: boolean) => {
  const { innerHTML } = textElement;
  const isComponent = HAS_COMPONENT_TEMPLATE_REGEX.test(innerHTML);

  if (isComponent) {
    const componentHTML = await getComponentHTML(innerHTML);
    if (componentHTML) textElement.outerHTML = componentHTML;

    return;
  }

  const isTag = textElement.tagName === 'P' && IS_HTML_OPENING_TAG_REGEX.test(innerHTML.trim());
  const unescapedHTML = unescapeHTML(innerHTML);

  textElement[isTag ? 'outerHTML' : 'innerHTML'] = sanitize ? await sanitizeHTML(unescapedHTML) : unescapedHTML;
};

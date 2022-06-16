import { HTML_EMBED_CSS_CLASS } from '@finsweet/ts-utils';

import { IGNORE_LINE_PREFIX } from '../utils/constants';
import { HAS_COMPONENT_TEMPLATE_REGEX, HAS_HTML_OPENING_TAG_REGEX } from '../utils/regex';
import type { TextElement } from '../utils/types';

/**
 * Queries all the valid paragraphs.
 * Removes the {@link IGNORE_LINE_PREFIX} from the matched paragraphs.
 * @returns All the valid paragraphs.
 * @param element The Rich Text Block element.
 */
export const getValidTextElements = (element: Element): TextElement[] => {
  const textElements = [...element.querySelectorAll<TextElement>('h1, h2, h3, h4, h5, h6, p, blockquote, li')];

  const filteredParagraphs = textElements.filter((paragraph) => {
    const { innerHTML } = paragraph;
    if (!innerHTML) return false;

    const mustIgnore = innerHTML.includes(IGNORE_LINE_PREFIX);
    const hasComponent = HAS_COMPONENT_TEMPLATE_REGEX.test(innerHTML);
    const hasTag = HAS_HTML_OPENING_TAG_REGEX.test(innerHTML);
    const isEmbed = paragraph.closest(`.${HTML_EMBED_CSS_CLASS}`);

    if (mustIgnore) {
      paragraph.innerHTML = innerHTML.replace(IGNORE_LINE_PREFIX, '');
      return false;
    }

    return (hasTag || hasComponent) && !isEmbed;
  });

  return filteredParagraphs;
};

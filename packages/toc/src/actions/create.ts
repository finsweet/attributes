import { nanoid } from 'nanoid';
import slugify from 'slugify';

import { ZERO_WIDTH_CHARS_REGEXP } from '../utils/constants';

/**
 * Creates a wrapper element for a heading and identifies it.
 * @param headingElement
 * @returns The new wrapper element.
 */
export const createHeadingWrapper = (headingElement: HTMLHeadingElement) => {
  const headingWrapper = document.createElement('div');

  const { id, textContent } = headingElement;
  const trimmedTextContent = textContent?.trim().replace(ZERO_WIDTH_CHARS_REGEXP, '');

  if (id) {
    headingElement.removeAttribute('id');
    headingWrapper.id = ensureUniqueId(id);
  } else if (trimmedTextContent) {
    const slugified = slugify(trimmedTextContent, { lower: true, strict: true });
    headingWrapper.id = ensureUniqueId(slugified);
  }

  headingWrapper.id ||= ensureUniqueId(nanoid(8));

  return headingWrapper;
};

/**
 * Ensures that an element ID is unique on the page by adding an index suffix if necessary.
 * @param requestedId
 * @returns The unique ID.
 */
const ensureUniqueId = (requestedId: string) => {
  let proposedId = requestedId;
  let index = 2;

  while (document.getElementById(proposedId)) {
    proposedId = `${requestedId}-${index}`;
    index += 1;
  }

  return proposedId;
};

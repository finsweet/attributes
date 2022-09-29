import { cloneNode } from '@finsweet/ts-utils';
import { marked } from 'marked';

import type { AttributeChangesets } from '$global/types/changesets';

import { queryElement } from '../utils/constants';
import type { AttributesData } from '../utils/types';

/**
 * Creates a new `Collection Item` element from a changeset's data.
 * @param attributeData The data from the current attribute.
 * @param changeset The changeset data.
 * @param templateElement The `Collection Item` template element.
 *
 * @returns A new node populated with the changeset data.
 */
export const createChangesetElement = (
  { title, key, href }: AttributesData[number],
  { date, version, markdown }: AttributeChangesets[number],
  templateElement: HTMLDivElement
) => {
  const newElement = cloneNode(templateElement);

  const cardElement = queryElement('attributeCard', { scope: newElement }) as HTMLElement;
  const titleElement = queryElement('attributeTitle', { scope: newElement }) as HTMLElement;
  const keyElement = queryElement('attributeKey', { scope: newElement }) as HTMLElement;
  const versionElement = queryElement('attributeVersion', { scope: newElement }) as HTMLElement;
  const changesetElement = queryElement('attributeChangeset', { scope: newElement }) as HTMLElement;
  const dateElement = queryElement('attributeDate', { scope: newElement }) as HTMLElement;

  titleElement.textContent = title;
  keyElement.textContent = key;
  versionElement.textContent = version;
  changesetElement.innerHTML = marked.parse(markdown);
  dateElement.textContent = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Change the card element to be a `<a>`
  const linkCardElement = document.createElement('a');
  linkCardElement.href = href;
  linkCardElement.target = '_blank';
  linkCardElement.innerHTML = cardElement.innerHTML;

  for (let index = cardElement.attributes.length - 1; index >= 0; index--) {
    linkCardElement.attributes.setNamedItem(cloneNode(cardElement.attributes[index]));
  }

  newElement.replaceChild(linkCardElement, cardElement);

  return newElement;
};

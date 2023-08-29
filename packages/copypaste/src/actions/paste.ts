import { cloneNode, isHTMLElement } from '@finsweet/attributes-utils';

import { getInstanceIndex, queryElement } from '../utils';

/**
 * Appends a copy/ paste element as the last child inside the paste element of the current instance
 * @param target The node element to be inserted
 * @param globalSettings The global settings
 */
export const insertCopiedNode = async (target: HTMLElement) => {
  if (!isHTMLElement(target)) return;

  const instanceIndex = getInstanceIndex(target);
  const pasteTarget = queryElement('paste', { instanceIndex });

  const copiedElement = cloneNode(target, true);
  pasteTarget?.appendChild(copiedElement);

  // Remove the element if designated as 'cut'
  if (target.getAttribute('fs-copypaste-element') === 'cut') {
    target.remove();
  }
};

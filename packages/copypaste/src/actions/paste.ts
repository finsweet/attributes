import { cloneNode, isHTMLElement } from '@finsweet/attributes-utils';

import { getInstanceIndex, queryElement } from '../utils';

/**
 * Appends a copied element as the last child inside the paste element of the current instance
 * @param target The node element to be inserted
 */
export const copyPasteNode = async (target: HTMLElement) => {
  if (!isHTMLElement(target)) return;

  const instanceIndex = getInstanceIndex(target);
  const pasteTarget = queryElement('paste', { instanceIndex });

  const copiedElement = cloneNode(target, true);
  pasteTarget?.appendChild(copiedElement);
};

/**
 * Moves an element to the paste element of the current instance.
 * @param target The node element to be inserted
 */
export const cutPasteNode = async (target: HTMLElement) => {
  if (!isHTMLElement(target)) return;

  const instanceIndex = getInstanceIndex(target);
  const pasteTarget = queryElement('paste', { instanceIndex });

  pasteTarget?.appendChild(target);
};

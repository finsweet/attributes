import { nanoid } from 'nanoid';

import { isHTMLElement } from './guards';

/**
 * Ensures that an element has a unique ID.
 * If the element already has a unique ID, that one is preserved.
 * @param element
 * @returns Returns the unique ID assigned to the element.
 */
export const ensureUniqueId = (element: Element) => {
  if (!element.id || document.getElementById(element.id) !== element) {
    const id = nanoid();
    element.id = id;
    return id;
  }

  return element.id;
};

/**
 * Checks if an element is visible
 * @param element
 */
export const isVisible = (element: HTMLElement): boolean =>
  !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);

/**
 * Clone a node that has the same type as the original one
 * @param node
 */
export const cloneNode = <T extends Node>(node: T, deep = true): T => <T>node.cloneNode(deep);

/**
 * Finds the first child text node of an element
 * @param element The element to search into.
 */
export const findTextNode = (element: HTMLElement): ChildNode | undefined => {
  let textNode: ChildNode | undefined;

  for (const node of element.childNodes) {
    if (isHTMLElement(node) && node.childNodes.length) textNode = findTextNode(node);
    else if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) textNode = node;

    if (textNode) break;
  }

  return textNode;
};

/**
 * @returns The first hidden parent element, or the element itself (if hidden).
 * If the element is already visible, the function returns `undefined`.
 *
 * @param element The reference element.
 */
export const getHiddenParent = (element: HTMLElement): HTMLElement | undefined => {
  if (isVisible(element)) return;

  let previousElement = element;

  const checkParent = ({ parentElement }: HTMLElement) => {
    if (!parentElement) return;

    if (isVisible(parentElement)) return;

    previousElement = parentElement;
    checkParent(parentElement);
  };

  checkParent(element);

  return previousElement;
};

/**
 * Check if an element is scrollable
 * @param element
 * @returns True or false
 */
export const isScrollable = (element: Element): boolean => {
  const { overflow } = getComputedStyle(element);
  return overflow === 'auto' || overflow === 'scroll';
};

/**
 * Creates a render controller for an element.
 * @param element The element to control.
 * @param options.rendered Whether the element is currently rendered or not. Defaults to `true`.
 * @returns The render controller.
 */
export const createRenderController = (element: Element, { rendered = true }: { rendered?: boolean } = {}) => {
  const anchor = new Comment();

  /**
   * Renders the element using the anchor as a reference.
   */
  const render = () => {
    if (rendered) return;

    anchor.after(element);
    anchor.remove();

    rendered = true;
  };

  /**
   * Removes the element from the DOM and replaces it with the anchor.
   */
  const remove = () => {
    if (!rendered) return;

    element.after(anchor);
    element.remove();

    rendered = false;
  };

  /**
   * Updates the element's rendering state.
   * @param shouldRender Whether the element should be rendered or not.
   */
  const update = (shouldRender: boolean) => {
    if (shouldRender) render();
    else remove();
  };

  /**
   * Destroys the render controller.
   * @param forceRender Whether to force the element to be rendered after destroying the controller.
   */
  const destroy = (forceRender = true) => {
    if (forceRender) {
      render();
    }

    anchor.remove();
  };

  return {
    update,
    render,
    remove,
    destroy,
  };
};

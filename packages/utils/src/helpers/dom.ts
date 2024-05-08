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

export class RenderController {
  #rendered = true;
  #anchor = new Comment();

  /**
   * Creates a render controller instance for an element.
   * @param element The element to control.
   */
  constructor(public readonly element: Element) {}

  /**
   * Renders the element using the anchor as a reference.
   */
  render() {
    if (this.#rendered) return;

    this.#anchor.after(this.element);
    this.#anchor.remove();

    this.#rendered = true;
  }

  /**
   * Removes the element from the DOM and replaces it with the anchor.
   */
  remove() {
    if (!this.#rendered) return;

    this.element.after(this.#anchor);
    this.element.remove();

    this.#rendered = false;
  }

  /**
   * Updates the element's rendering state.
   * @param shouldRender Whether the element should be rendered or not.
   */
  update(shouldRender: boolean) {
    if (shouldRender) this.render();
    else this.remove();
  }

  /**
   * Destroys the render controller.
   * @param forceRender Whether to force the element to be rendered after destroying the controller.
   */
  destroy(forceRender = true) {
    if (forceRender) {
      this.render();
    }

    this.#anchor.remove();
  }
}

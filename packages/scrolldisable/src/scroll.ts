import { isHTMLElement, isScrollable } from '@finsweet/attributes-utils';
import { clearBodyLocks, lock } from 'tua-body-scroll-lock';

import { getAttribute } from './utils/selectors';

let scrollingDisabled = false;

/**
 * @returns The current scrolling state
 */
export const isScrollingDisabled = (): boolean => scrollingDisabled;

/**
 * Disables the scrolling.
 * @param target The target that will preserve scrolling.
 */
export const disableScrolling = (target: HTMLElement): void => {
  scrollingDisabled = true;

  const withPaddingRight = getAttribute(target, 'gap', { filterInvalid: true }) !== 'false';

  lock(target, { overflowType: 'clip', withPaddingRight });
};

/**
 * Enables scrolling.
 */
export const enableScrolling = (): void => {
  scrollingDisabled = false;

  clearBodyLocks();
};

/**
 * Finds the first scrollable child of an element.
 * @param element
 * @returns The child if found.
 */
export const findFirstScrollableElement = (element: HTMLElement): HTMLElement | undefined => {
  if (isScrollable(element)) return element;

  const children = element.querySelectorAll('*');
  for (const child of children) {
    if (!isHTMLElement(child)) continue;
    if (isScrollable(child)) return child;
  }
};

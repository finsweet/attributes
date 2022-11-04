import { isHTMLElement, isScrollable } from '@finsweet/ts-utils';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const { body } = document;

let reserveScrollBarGap = true;
let scrollingDisabled = false;

// TODO: This is a temporary fix, should be removed after `body-scroll-lock` releases an official update.
let storedScrollY: number | undefined;

/**
 * @returns The current scrolling state
 */
export const isScrollingDisabled = (): boolean => scrollingDisabled;

/**
 * Updates the `reserveScrollBarGap` param, which is `true` by default.
 * @param value The new value.
 */
export const setReserveScrollBarGap = (value: boolean): void => {
  reserveScrollBarGap = value;
};

/**
 * Disables the scrolling.
 * @param target The target that will preserve scrolling.
 */
export const disableScrolling = (target: Element): void => {
  storedScrollY = window.scrollY;
  scrollingDisabled = true;

  disableBodyScroll(target, { reserveScrollBarGap });

  body.style.setProperty('top', `${storedScrollY * -1}px`);
};

/**
 * Enables scrolling.
 */
export const enableScrolling = (): void => {
  scrollingDisabled = false;

  clearAllBodyScrollLocks();

  body.style.setProperty('top', '');
  if (storedScrollY) body.scrollTo(0, storedScrollY);
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

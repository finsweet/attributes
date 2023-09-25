import { queryElement } from './selectors';

const loaderElement: HTMLElement | null = queryElement('loader');

export const loader = {
  element: queryElement('loader'),

  show() {
    if (!this.element) return;

    // set display to block
    this.element.style.display = 'block';
  },

  hide() {
    if (!this.element) return;

    // set display to none
    this.element.style.display = 'none';
  },
};

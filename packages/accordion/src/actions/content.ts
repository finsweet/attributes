import { addListener } from '@finsweet/ts-utils';

import { getElementHeight } from '../utils/helpers';

/**
 * Opens an accordion's content.
 * @param content
 */
export const openContent = (content: HTMLElement) => {
  content.style.display = 'block';
  content.style.maxHeight = '';
  const contentHeight = getElementHeight(content);
  content.style.maxHeight = '0px';

  requestAnimationFrame(() => {
    content.style.maxHeight = contentHeight;
  });
};

/**
 * Closes an accordion's content.
 * @param content
 *
 * @returns A cancel function.
 */
export const closeContent = (content: HTMLElement) => {
  const cancel = addListener(content, 'transitionend', ({ propertyName }) => {
    if (propertyName !== 'max-height') return;

    content.style.display = 'none';
    cancel();
  });

  const contentHeight = getElementHeight(content);
  content.style.maxHeight = contentHeight;

  requestAnimationFrame(() => {
    content.style.maxHeight = '0px';
  });

  return cancel;
};
